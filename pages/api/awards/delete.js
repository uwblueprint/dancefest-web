import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If authenticated and admin
  if (session && session.role === 'ADMIN') {
    // Collect id of award to delete
    const { id } = req.body;

    // If id exists
    if (id) {
      const deletedAwardPerformance = prisma.awards_performances.delete({
        where: {
          award_id: id,
        },
      });

      const deletedAward = prisma.awards.delete({
        where: {
          id: id,
        },
      });

      try {
        await prisma.$transaction([deletedAwardPerformance, deletedAward]);
      } catch {
        res.status(400).end();
      }

      res.status(200).json({ message: 'Deleted award successfully.' });
    } else {
      res.status(404).end();
    }
  }

  // Else, throw unauthenticated
  res.status(401).end();
};
