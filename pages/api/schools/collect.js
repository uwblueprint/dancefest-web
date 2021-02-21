import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session exists (thus, user is authenticated)
  if (session && session.isAdmin) {
    // Collect all schools
    let schools = await prisma.school.findMany({
      include: {
        contacts: true,
      },
    });
    res.send(schools);
  }

  // Else, return 401 for all failures
  res.status(401).end();
};
