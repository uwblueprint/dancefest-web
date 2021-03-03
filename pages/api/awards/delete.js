import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Delete award
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated, return error
  if (!session) {
    return res.status(401).send({
      error: 'Unauthorized',
    });
  }

  // Collect id of award to delete
  const { id } = req.body;

  if (!id) {
    return res.status(400).send({
      error: 'Required award id not provided',
    });
  }

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
  } catch {
    return res.status(400).send({
      error: 'Error deleting award',
    });
  }

  return res.status(200).send({ message: 'Deleted award successfully.' });
};
