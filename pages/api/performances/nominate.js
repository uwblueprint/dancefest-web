import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Nominate performances for awards
// Allows a performance to be nominated for a list of awards
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated
  if (!session) {
    return res.status(401).send({
      error: 'Unauthorized',
    });
  }

  const currentUserID = parseInt(session.id);

  // Collect performance id and award ids from request body
  const { performanceID, awardIDs, judgeID } = req.body;

  // If performance id is not provided
  if (!performanceID) {
    return res.status(400).json({
      error: 'ID of performance was not provided',
    });
  }

  // If awardsIDs is null or empty
  if (!awardIDs || awardIDs.length === 0) {
    return res.status(400).json({
      error: 'Award IDs were not provided',
    });
  }

  // TODO for now we assume frontend will filter correctly and only
  // eligible awards will show up for validation
  try {
    // First clear all the current nominations
    await prisma.awardPerformance.deleteMany({
      where: {
        performance_id: parseInt(performanceID),
        user_id: parseInt(judgeID) || currentUserID,
      },
    });

    const awardPerformanceUpserts = [];

    for (const awardID of awardIDs) {
      const award = await prisma.award.findUnique({
        where: {
          id: awardID,
        },
      });

      if (award.type === 'SPECIAL') {
        // There should only be 1 nomination for a special award
        // If there is already a nomination for a special award, we do not want to nominate the performance for the award
        const nomination = await prisma.awardPerformance.findFirst({
          where: {
            performance_id: performanceID,
            award_id: award.id,
          },
        });

        if (nomination) continue;
      } else if (award.type === 'SCORE_BASED') {
        // We should not be able to nominate performances for score based awards
        continue;
      }

      awardPerformanceUpserts.push(
        prisma.awardPerformance.upsert({
          where: {
            unique_nomination: {
              award_id: awardID,
              performance_id: parseInt(performanceID),
              user_id: parseInt(judgeID) || currentUserID, // Look for nominations matching the judge. If no judge user ID provided, use the current user
            },
          },
          create: {
            award_id: awardID,
            performance_id: parseInt(performanceID),
            user_id: parseInt(judgeID) || currentUserID,
          },
          update: {},
        })
      );
    }

    const awardPerformances = await prisma.$transaction(awardPerformanceUpserts);

    return res.status(200).json(awardPerformances);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'Error nominating performance for awards',
    });
  }
};
