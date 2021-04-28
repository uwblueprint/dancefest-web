import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling
import { getPerformances } from '@pages/api/performances/collect'; // Get performances

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session exists (thus, user is authenticated)
  if (session && (session.role === 'ADMIN' || session.role === 'JUDGE')) {
    const { schoolIDs, eventID } = req.query;

    const filter = {};
    if (schoolIDs) {
      filter.id = { in: schoolIDs.split(',').map(i => +i) };
    } else if (eventID) {
      const eventPerformances = await getPerformances({
        event_id: parseInt(eventID),
      });

      filter.id = { in: [...new Set(eventPerformances.map(event => event.school.id))] };
    }

    // Collect schools
    const schools = await getSchools(filter);
    return res.json(schools);
  }

  // Else, return 401 for all failures
  return res.status(401).send('Unauthorized');
};

export const getSchools = async filter => {
  // Collect event with eventID
  return await prisma.school.findMany({
    where: filter,
  });
};
