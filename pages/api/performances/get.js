import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// get performances by specifying the corresponding performance id
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated
  if (!session) {
    return res.status(401).end();
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
      adjudications: true,
    },
  });

  if (!performance) return;

  // Remove the relation table data
  return {
    ...performance,
    awards_performances: performance.awards_performances.map(({ awards, status, user_id }) => {
      return {
        ...awards,
        status,
        user_id,
      };
    }),
  };
};
