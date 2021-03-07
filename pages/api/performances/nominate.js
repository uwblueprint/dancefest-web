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

  // We update the nominee_count if the performance has been already been nominated for the award
  // If it does not exist, we create an entry into the association table
  try {
    const awardPerformances = await prisma.$transaction(
      awardIDs.map(awardID =>
        prisma.awardPerformance.upsert({
          where: {
            awards_performances_unique: {
              award_id: awardID,
              performance_id: performanceID,
            },
          },
          create: {
            award_id: awardID,
            performance_id: performanceID,
            nominee_count: 1,
          },
          update: {
            nominee_count: {
              increment: 1,
            },
          },
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
