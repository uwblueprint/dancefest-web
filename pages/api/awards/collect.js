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

  const { eventID } = req.body;

  if (!eventID) {
    return res.status(400).json({
      error: 'eventID not provided',
    });
  }

  const filter = { event_id: parseInt(eventID) };

  // Collect all awards from database
  const awards = await getAwards(filter);
  return res.json(awards);
};

export const getAwards = async filter => {
  // Collect awards
  const awards = await prisma.award.findMany({
    where: filter,
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
