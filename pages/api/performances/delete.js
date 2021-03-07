import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  if (!session || session.role !== 'ADMIN') {
    return res.status(401).end();
  }

  // Collect id of performance to delete
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: 'Performance id was not provided',
    });
  }

  const deletedAwardPerformance = prisma.awardPerformance.deleteMany({
    where: {
      performance_id: id,
    },
  });

  const deletedAdjudications = prisma.adjudication.deleteMany({
    where: {
      performance_id: id,
    },
  });

  const deletedPerformance = prisma.performance.delete({
    where: {
      id: id,
    },
  });

  try {
    await prisma.$transaction([deletedAwardPerformance, deletedAdjudications, deletedPerformance]);
  } catch {
    return res.status(400).json({
      error: 'Error deleting performance',
    });
  }

  // Return deleted performance
  return res.status(200).json({ message: 'Deleted performance successfully' });
};
