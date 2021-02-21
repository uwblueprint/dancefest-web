import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session exists (thus, user is authenticated)
  if (session) {
    // Collect all adjudications from database
    const adjudications = await prisma.adjudication.findMany();

    res.send(adjudications);
  }

  // Else, return 401 for all failures
  res.status(401).end();
};
