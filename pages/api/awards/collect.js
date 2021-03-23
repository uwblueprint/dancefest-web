import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Get awards
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session does not exists
  if (!session) {
    return res.status(401).end();
  }

  // Collect all awards from database
  const awards = await getAwards();

  return res.json(awards);
};

export const getAwards = async () => {
  // Collect awards with performanceID
  const awards = await prisma.award.findMany({
    include: {
      awards_performances: {
        include: {
          performances: true,
        },
      },
    },
  });

  if (!awards) return;

  // Remove the relation table data
  return awards.map(({ awards_performances, ...rest }) => {
    return {
      ...rest,
      performances: awards_performances.map(({ performances, status, user_id }) => {
        return {
          ...performances,
          status,
          user_id,
        };
      }),
    };
  });
};
