import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Create award
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is not authenticated
  if (!session) {
    return res.status(401).end();
  }

  const userID = session.id;

  // Collect award information from request body
  const { title, isFinalized, performanceID } = req.body;

  // If required fields do not exist
  if (!title || !isFinalized || !performanceID || !userID) {
    return res.status(400).send({
      error: 'Required fields not provided',
    });
  }

  const award = await prisma.award.create({
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

  // If award creation is successful, return award
  // Else, return error
  if (award) {
    return res.status(200).send(award);
  } else {
    return res.status(400).send({
      error: 'Error creating new award',
    });
  }
};
