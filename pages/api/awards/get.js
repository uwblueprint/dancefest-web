import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling
import { calculateAverageScore } from '@utils/performances'; // Calculate average score util

// Get awards by specifying the corresponding award id
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated, return error
  if (!session) {
    return res.status(401).send('Unauthorized');
  }

  // TODO: I think this should be path rather than query parameter
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      error: 'Award id not provided',
    });
  }

  const filter = { id: parseInt(id) };
  const award = await getAward(filter);

  if (award) {
    return res.status(200).json(award);
  } else {
    return res.status(404).json({
      error: 'Award with provided id not found',
    });
  }
};

export const getAward = async filter => {
  // Get award with the provided id
  const award = await prisma.award.findFirst({
    where: filter,
    include: {
      awards_performances: {
        include: {
          performances: {
            include: {
              adjudications: {
                include: {
                  user: true,
                },
              },
            },
          },
          users: true,
        },
      },
      awards_categories: true,
    },
  });

  if (!award) return;

  // Remove the relation table data
  return {
    ...award,
    awards_performances: award.awards_performances.map(
      ({ performances, status, users: nominator }) => {
        const { adjudications, ...rest } = performances;
        return {
          ...rest,
          adjudications,
          artisticScore: calculateAverageScore(adjudications.map(a => a.artistic_mark)),
          technicalScore: calculateAverageScore(adjudications.map(a => a.technical_mark)),
          cumulativeScore: calculateAverageScore(adjudications.map(a => a.cumulative_mark)),
          status,
          nominator,
        };
      }
    ),
    awards_categories: award.awards_categories.map(({ category_id }) => category_id),
  };
};
