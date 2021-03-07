import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Get awards
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  //TODO: add functionality of getting awards by performance id

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
  // TODO: perhaps add flag to include the performances
  const awards = await prisma.award.findMany({
    include: {
      performances: {
        include: {
          performances: true,
        },
      },
    },
  });

  if (!awards) return;

  // Remove the relation table data
  return awards.map(award => {
    return {
      ...award,
      performances: award.performances.map(performance => {
        return {
          ...performance.performances,
          nominee_count: performance.nominee_count,
        };
      }),
    };
  });
};
