import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session does not exist
  if (!session) {
    return res.status(401).send('Unauthorized');
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: 'Id was not provided',
    });
  }

  // Check if the adjudication exists
  const adjudication = await prisma.adjudication.findUnique({
    where: {
      id: id,
    },
  });

  // If adjudication does not exist
  if (!adjudication) {
    return res.status(400).json({
      error: 'Adjudication does not exist',
    });
  }

  // Check if the performance that adjudication is associated with is finalized
  const isFinalized = await prisma.awardPerformance.findFirst({
    where: {
      performance_id: adjudication.performance_id,
      status: 'FINALIST',
    },
  });

  // If it is finalized, we do not allow deleting adjudication
  if (isFinalized) {
    return res.status(400).json({
      error: 'Adjudication cannot be deleted as the performance is finalized',
    });
  }

  // Delete adjudication
  const deletedAdjudication = prisma.adjudication.delete({
    // With
    where: {
      // Specified id
      id: id,
    },
  });

  // Delete nominations
  const deleteNominations = prisma.awardPerformance.deleteMany({
    where: {
      user_id: adjudication.user_id,
      performance_id: adjudication.performance_id,
    },
  });

  // Delete the adjudication and nominations made by the same user as the adjudication for the performance
  try {
    await prisma.$transaction([deletedAdjudication, deleteNominations]);
  } catch {
    return res.status(400).json({
      error: 'Error deleting adjudication',
    });
  }

  // Return deleted performance
  return res.status(200).json({ message: 'Deleted adjudication successfully' });
};
