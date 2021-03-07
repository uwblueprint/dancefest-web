import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session does not exist
  if (!session) {
    return res.status(401).end();
  }

  const adjudications = await prisma.adjudication.findMany();

  return res.status(200).json(adjudications);
};
