import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling
import { calculateAverageScore } from '@utils/performances'; // Calculate average score util

// get performances by specifying the corresponding performance id
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated
  if (!session) {
    return res.status(401).send('Unauthorized');
  }

  const { id } = req.query;

  // If performance id was not provided
  if (!id) {
    return res.status(400).json({
      error: 'Performance id was not provided',
    });
  }

  const filter = { id: parseInt(id) };
  const performance = await getPerformance(filter);

  if (performance) {
    return res.status(200).json(performance);
  } else {
    return res.status(400).json({
      error: 'Could not retrieve performance',
    });
  }
};

export const getPerformance = async filter => {
  // Get award with the provided id
  const performance = await prisma.performance.findUnique({
    where: filter,
    include: {
      event: true,
      awards_performances: {
        include: {
          awards: true,
        },
      },
      school: {
        select: {
          school_name: true,
        },
      },
      adjudications: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!performance) return;

  const {
    awards_performances: awards,
    event,
    event: { judges: judgesString },
    adjudications,
    ...rest
  } = performance;

  const totalAdjudications = (JSON.parse(judgesString) || []).filter(judge => judge !== '').length;
  const completedAdjudications = adjudications.length;

  return {
    ...rest,
    awards: awards.map(({ awards, status, user_id }) => {
      return {
        ...awards,
        status,
        user_id,
      };
    }),
    adjudications,
    totalAdjudications,
    completedAdjudications,
    feedbackComplete: completedAdjudications >= totalAdjudications,
    artisticScore: calculateAverageScore(adjudications.map(a => parseFloat(a.artistic_mark))),
    technicalScore: calculateAverageScore(adjudications.map(a => parseFloat(a.technical_mark))),
    cumulativeScore: calculateAverageScore(adjudications.map(a => parseFloat(a.cumulative_mark))),
    event,
  };
};
