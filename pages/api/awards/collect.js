import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  const { performanceID } = req.query;

  // If session exists (thus, user is authenticated)
  if (session) {
    const filter = { performance_id: parseInt(performanceID) };
    // Collect all awards from database
    const awards = await getAwards(filter);

    res.send(awards);
  }

  // Else, return 401 for all failures
  res.status(401).end();
};

export const getAwards = async filter => {
  // Collect awards with performanceID
  return await prisma.awards_performances.findMany({
    where: filter,
    include: { awards: true },
  });
};
