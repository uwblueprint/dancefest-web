import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  if (!session || session.role !== 'ADMIN') {
    return res.status(401).send({
      error: 'Unauthorized',
    });
  }

  // Collect id of performance to delete
  const { id } = req.body;

  if (!id) {
    return res.status(400).send({
      error: 'Performance id was not provided',
    });
  }

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
  return res.status(200).send(deletedPerformance);
};
