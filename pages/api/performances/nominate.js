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
  const { eventID, performanceID, awardIDs, judgeID, specialAwardName } = req.body;

  if (!eventID) {
    return res.status(400).json({
      error: 'ID of event was not provided',
    });
  }

  // If performance id is not provided
  if (!performanceID) {
    return res.status(400).json({
      error: 'ID of performance was not provided',
    });
  }

  // If awardsIDs is null or empty
  if (!awardIDs) {
    return res.status(400).json({
      error: 'Award IDs were not provided',
    });
  }

  const awards = await prisma.award.findMany({
    where: {
      id: { in: awardIDs },
    },
  });

  // Even if one of the awards we are attempting to nominate the performance for is finalized, we prevent the nomination from occurring.
  if (awards && awards.length !== 0) {
    for (const id in awards) {
      if (awards[id].is_finalized) {
        return res.status(400).json({
          error: 'Performance cannot be nominated as one of the awards is finalized',
        });
      }
    }
  }

  // Check if performance is a finalist for one of the awards it's being nominated for, then return an error
  for (const awardID of awardIDs) {
    const isFinalized = await prisma.awardPerformance.findFirst({
      where: {
        performance_id: performanceID,
        status: 'FINALIST',
        award_id: awardID,
      },
    });

    // If it is finalized, we do not allow deleting adjudication
    if (isFinalized) {
      return res.status(400).json({
        error: 'Nominations cannot be changed as performance is finalized',
      });
    }
  }

  // TODO for now we assume frontend will filter correctly and only
  // eligible awards will show up for validation
  try {
    const awardPerformanceUpserts = [
      // First clear all the current nominations
      prisma.awardPerformance.deleteMany({
        where: {
          awards: {
            type: { not: 'SPECIAL' },
          },
          performance_id: { equals: parseInt(performanceID) },
          user_id: parseInt(judgeID) || currentUserID,
        },
      }),
    ];
    let specialAwardExists = false;

    for (const awardID of awardIDs) {
      const award = await prisma.award.findUnique({
        where: {
          id: awardID,
        },
      });

      if (award.type === 'SPECIAL') {
        // There should only be 1 nomination for a special award
        // If there is already a nomination for a special award, we do not want to nominate the performance for the award
        specialAwardExists = true;
        const nomination = await prisma.awardPerformance.findFirst({
          where: {
            performance_id: performanceID,
            award_id: award.id,
          },
        });

        if (nomination) {
          if (specialAwardName !== null) {
            await prisma.award.update({
              where: {
                id: award.id,
              },
              data: {
                title: specialAwardName,
              },
            });
          }

          continue;
        }
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

    // New special award creation
    if (specialAwardName && !specialAwardExists) {
      // Create special award, since special award name was provided but special award does not exist yet
      const specialAward = await prisma.award.create({
        data: {
          title: specialAwardName,
          type: 'SPECIAL',
          event_id: eventID,
        },
      });

      // Add award nomination transaction to upserts pipeline
      awardPerformanceUpserts.push(
        prisma.awardPerformance.create({
          data: {
            award_id: specialAward.id,
            performance_id: parseInt(performanceID),
            user_id: parseInt(judgeID) || currentUserID,
          },
        })
      );
    }

    const awardPerformances = await prisma.$transaction(awardPerformanceUpserts);

    return res.status(200).json(awardPerformances);
  } catch (err) {
    return res.status(400).json({
      error: 'Error nominating performance for awards',
    });
  }
};
