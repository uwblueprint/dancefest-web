import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Edit award
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated
  if (!session) {
    return res.status(401).end();
  }

  // Collect award information from request body
  // TODO: should userID be stored in session or will it be passed in from frontend?
  const { id, title, isFinalized, userID, performanceID } = req.body;

  if (!id || !title || !isFinalized || !userID || !performanceID) {
    return res.status(400).send({
      error: 'Required fields not provided',
    });
  }

  const updatedAward = await prisma.award.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      is_finalized: isFinalized,
      user_id: userID,
      performances: {
        create: [
          {
            performance_id: performanceID,
          },
        ],
      },
    },
  });

  // If updating award is successful, return updated event
  if (updatedAward) {
    res.status(200).send(updatedAward);
  } else {
    res.status(400).send({
      error: 'Error updating award with provided id',
    });
  }
};
