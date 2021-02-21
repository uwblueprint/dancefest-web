import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session exists (thus, user is authenticated)
  if (session && session.isAdmin) {
    const { schoolIDs } = req.query;

    let filter = {};
    if (schoolIDs) filter.id = { in: schoolIDs.split(',').map(i => +i) };

    // Collect schools
    let schools = await getSchools(filter);
    res.send(schools);
  }

  // Else, return 401 for all failures
  res.status(401).end();
};

export const getSchools = async filter => {
  // Collect event with eventID
  return await prisma.school.findMany({
    where: filter,
    include: {
      contacts: true,
    },
  });
};
