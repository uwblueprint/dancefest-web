import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// get performances by specifying the corresponding eventID
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  const { eventID, schoolIDs } = req.query;

  // If session exists and eventID provided (thus, user is authenticated)
  // only judges and admins
  // TODO check they have access to this event
  if (session && eventID && session.role === 'ADMIN') {
    // Collect all events from database
    const filter = { event_id: parseInt(eventID) };

    // If schoolIDs exist, we convert it into an array of integers to add to the filter
    if (schoolIDs) filter.school_id = { in: schoolIDs.split(',').map(i => +i) };

    const performances = await getPerformances(filter);
    res.send(performances);
  }

  // Else, return 401 for all failures
  res.status(401).end();
};

//TODO: add in getting performance by award id?????
export const getPerformances = async filter => {
  // Collect event with eventID
  const performances = await prisma.performance.findMany({
    where: filter,
    //TODO: Add flag to get award information with performance
    include: {
      awards: {
        include: {
          awards: true,
        },
      },
    },
  });

  if (!performances) return;

  // Remove the relation table data
  return performances.map(performance => {
    return {
      ...performance,
      awards: performance.awards.map(award => award.awards),
    };
  });
};
