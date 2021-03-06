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
    return res.status(400).send({
      error: 'Required fields not provided',
    });
  }

  const awardPerformance = await prisma.awardPerformance.findFirst({
    where: {
      award_id: awardID,
      performance_id: performanceID,
    },
  });

  // If it does not exist
  if (!awardPerformance) {
    return res.status(400).send({
      error: 'Performance is not nominated for the provided award',
    });
  }

  // Update the award to be finalized by setting the bit to 1
  const finalizedAward = await prisma.award.update({
    where: {
      id: awardID,
    },
    data: {
      is_finalized: '1',
    },
  });

  res.status(200).send(finalizedAward);
};
