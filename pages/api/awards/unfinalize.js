import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Unfinalizes the award
// Sets all the award performances with the provided performance id and award id to NOMINEE
// Sets is_finalized of award to false
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated
  if (!session || session.role !== 'ADMIN') {
    return res.status(401).send('Unauthorized');
  }

  // Collect award information from request body
  const { awardID, performanceID } = req.body;

  if (!awardID || !performanceID) {
    return res.status(400).json({
      error: 'Required fields not provided',
    });
  }

  // It doesn't matter which user made the nomination we find as we just want to find the first record that exists
  // as it allows us to know that the particular performance is nominated for the award
  const awardPerformance = await prisma.awardPerformance.findFirst({
    where: {
      award_id: awardID,
      performance_id: performanceID,
    },
    include: {
      awards: true,
    },
  });

  // If it does not exist
  if (!awardPerformance) {
    return res.status(400).json({
      error: 'Performance is not nominated for the provided award',
    });
  }

  // If the award is not finalized
  const isFinalized = awardPerformance.awards ? awardPerformance.awards.is_finalized : true;
  if (!isFinalized) {
    return res.status(400).json({
      error: 'Award is not finalized',
    });
  }

  // revert all awardPerformance record status to be 'NOMINEE'
  const finalizedNominations = prisma.awardPerformance.updateMany({
    where: {
      award_id: awardID,
      performance_id: performanceID,
    },
    data: {
      status: 'NOMINEE',
    },
  });

  // Revert the award is_finalized to be false
  const finalizedAward = prisma.award.update({
    where: {
      id: awardID,
    },
    data: {
      is_finalized: false,
    },
    include: {
      awards_performances: true,
    },
  });

  const awardTransaction = await prisma.$transaction([finalizedNominations, finalizedAward]);
  const awardResult = awardTransaction[awardTransaction.length - 1];

  res.status(200).json(awardResult);
};
