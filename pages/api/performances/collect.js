import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// get performances by specifying the corresponding eventID
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  //TODO: if it is required, I think it should be request body?
  const { eventID, schoolIDs } = req.query;

  // If not authenticated
  if (!session) {
    return res.status(401).end();
  }

  if (!eventID) {
    return res.status(400).json({
      error: 'eventID not provided',
    });
  }

  // Collect all events from database
  const filter = { event_id: parseInt(eventID) };

  // If schoolIDs exist, we convert it into an array of integers to add to the filter
  if (schoolIDs) filter.school_id = { in: schoolIDs.split(',').map(i => +i) };

  const performances = await getPerformances(filter);
  return res.status(200).json(performances);
};

export const getPerformances = async filter => {
  // Collect event with eventID
  const performances = await prisma.performance.findMany({
    where: filter,
    include: {
      school: {
        select: {
          school_name: true,
        },
      },
      adjudications: true,
    },
  });

  if (!performances) return;

  // Remove the relation table data
  return performances.map(performance => {
    return {
      ...performance,
      // awards: performance.awards.map(award => {
      //   return {
      //     ...award.awards,
      //     nominee_count: award.nominee_count,
      //     status: award.status,
      //   };
      // }),
    };
  });
};
