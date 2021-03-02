import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Delete award
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If authenticated and admin
  if (session && session.role === 'ADMIN') {
    // Collect id of award to delete
    const { id } = req.body;
    // If id exists
    if (id) {
      const deletedAwardPerformance = prisma.awardPerformance.deleteMany({
        where: {
          award_id: id,
        },
      });

      const deletedAward = prisma.award.delete({
        where: {
          id: id,
        },
      });

      try {
        await prisma.$transaction([deletedAwardPerformance, deletedAward]);
        res.status(200).send({ message: 'Deleted award successfully.' });
      } catch {
        res.status(400).send({
          error: 'Error deleting award',
        });
      }
    } else {
      res.status(404).send({
        error: 'Award id was not provided',
      });
    }
  } else {
    // Else, throw unauthenticated
    res.status(401).send({
      error: 'Unauthorized',
    });
  }
};
