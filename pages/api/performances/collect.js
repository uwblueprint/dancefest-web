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
  if (session && eventID) {
    // Collect all events from database
    let filter = { event_id: parseInt(eventID) };

    // If schoolIDs exist, we convert it into an array of integers to add to the filter
    if (schoolIDs) filter.school_id = { in: schoolIDs.split(',').map(i => +i) };

    let performances = await getPerformances(filter);
    res.send(performances);
  }

  // Else, return 401 for all failures
  res.status(401).end();
};

export const getPerformances = async filter => {
  // Collect event with eventID
  return await prisma.performance.findMany({
    where: filter,
  });
};
