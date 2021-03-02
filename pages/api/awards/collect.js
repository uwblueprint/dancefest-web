import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Get awards
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  //TODO: add functionality of getting awards by performance id

  // If session exists (thus, user is authenticated)
  if (session && session.role === 'ADMIN') {
    // Collect all awards from database
    const awards = await getAwards();

    res.status(200).send(awards);
  } else {
    //  Else, return 401 for all failures
    res.status(401).send({
      error: 'Unauthorized',
    });
  }
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

  // Remove the relation table data
  return awards.map(award => {
    return {
      ...award,
      performances: award.performances.map(performance => performance.performances),
    };
  });
};
