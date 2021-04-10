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

  const performance = await prisma.performance.findUnique({
    where: {
      id: id,
    },
  });

  // If the performance does not exist, we throw an error
  if (!performance) {
    return res.status(400).json({
      error: 'Performance does not exist',
    });
  }

  // If the performance has adjudications, we do not allow editing
  if (performance.adjudications && performance.adjudications.length !== 0) {
    return res.status(400).json({
      error: 'Performance cannot be edited as it has an adjudication',
    });
  }

  // If the performance is finalized, we do not allow deletion
  if (performance.awards_performances && performance.awards_performances.length !== 0) {
    for (const nomination in performance.awards_performances) {
      if (nomination.status === 'FINALIST') {
        return res.status(400).json({
          error: 'Performance cannot be deleted as it is finalized',
        });
      }
    }
  }

  const deletedAwardPerformance = prisma.awardPerformance.deleteMany({
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
    await prisma.$transaction([deletedAwardPerformance, deletedPerformance]);
  } catch {
    return res.status(400).json({
      error: 'Error deleting performance',
    });
  }

  // Return deleted performance
  return res.status(200).json({ message: 'Deleted performance successfully' });
};
