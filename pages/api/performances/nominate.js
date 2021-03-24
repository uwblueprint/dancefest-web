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

  const userID = session.id;

  // Collect performance id and award ids from request body
  const { performanceID, awardIDs } = req.body;

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
    const awardPerformances = await prisma.$transaction(
      awardIDs.map(awardID =>
        prisma.awardPerformance.upsert({
          where: {
            unique_nomination: {
              award_id: awardID,
              performance_id: performanceID,
              user_id: userID,
            },
          },
          create: {
            award_id: awardID,
            performance_id: performanceID,
            user_id: userID,
          },
          update: {},
        })
      )
    );

    return res.status(200).json(awardPerformances);
  } catch {
    return res.status(400).json({
      error: 'Error nominating performance for awards',
    });
  }
};
