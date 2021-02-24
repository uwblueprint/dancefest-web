import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If authenticated and admin
  if (session && session.role === 'ADMIN') {
    // Collect id of performance to delete
    const { id } = req.body;

    // If id exists
    if (id) {
      // Delete performance
      // TODO DELETE associated adjudications in a transaction
      // const deletedAdjudications = prisma.adjudication.deleteMany()
      const deletedPerformance = await prisma.performance.delete({
        // With
        where: {
          // Specified id
          id: id,
        },
      });

      // Return deleted performance
      res.send(deletedPerformance);
    } else {
      res.status(404).end();
    }
  }

  // Else, throw unauthenticated
  res.status(401).end();
};
