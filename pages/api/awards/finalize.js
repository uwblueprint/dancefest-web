import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Finalize award
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated
  if (!session || session.role !== 'ADMIN') {
    return res.status(401).end();
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

  const isFinalized = awardPerformance.awards ? awardPerformance.awards.is_finalized : false;
  if (isFinalized) {
    return res.status(400).json({
      error: 'Award is already finalized',
    });
  }

  // update the awardPerformance record status to be 'FINALIST'
  const finalizedNominations = prisma.awardPerformance.updateMany({
    where: {
      award_id: awardID,
      performance_id: performanceID,
    },
    data: {
      status: 'FINALIST',
    },
  });

  // Update the award to be finalized
  const finalizedAward = prisma.award.update({
    where: {
      id: awardID,
    },
    data: {
      is_finalized: true,
    },
    include: {
      awards_performances: true,
    },
  });

  const awardTransaction = await prisma.$transaction([finalizedNominations, finalizedAward]);
  const awardResult = awardTransaction[awardTransaction.length - 1];

  res.status(200).json(awardResult);
};
