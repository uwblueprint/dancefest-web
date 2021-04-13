import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Delete award
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated, return error
  if (!session || session.role !== 'ADMIN') {
    return res.status(401).end();
  }

  // Collect id of award to delete
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: 'Required award id not provided',
    });
  }

  const award = await prisma.award.findUnique({
    where: {
      id: id,
    },
  });

  // If the award does not exist, throw an error
  if (!award) {
    return res.status(400).json({
      error: 'Award does not exist',
    });
  }

  // If the award is finalized, do not allow editing
  if (award.is_finalized) {
    return res.status(400).json({
      error: 'Award cannot be edited as it is finalized',
    });
  }

  const deletedAwardPerformance = prisma.awardPerformance.deleteMany({
    where: {
      award_id: id,
    },
  });

  const deletedAwardCategory = prisma.awardCategory.deleteMany({
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
    await prisma.$transaction([deletedAwardPerformance, deletedAwardCategory, deletedAward]);
  } catch {
    return res.status(400).json({
      error: 'Error deleting award',
    });
  }

  return res.status(200).json({ message: 'Deleted award successfully.' });
};
