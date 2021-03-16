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

  const awardPerformance = await prisma.awardPerformance.findUnique({
    where: {
      awards_performances_unique: {
        award_id: awardID,
        performance_id: performanceID,
      },
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

  // Update the award to be finalized by setting the bit to 1
  const finalizedAward = await prisma.award.update({
    where: {
      id: awardID,
    },
    data: {
      is_finalized: true,
      awards_performances: {
        update: {
          where: {
            awards_performances_unique: {
              award_id: awardID,
              performance_id: performanceID,
            },
          },
          data: {
            status: 'FINALIST',
          },
        },
      },
    },
    include: {
      awards_performances: true,
    },
  });

  res.status(200).json(finalizedAward);
};
