import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Create award
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // Collect award information from request body
    const { title, isFinalized, userID, performanceID } = req.body;
    // If required fields exist
    if (title && isFinalized && userID && performanceID) {
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
      // Else, return server error
      if (award) {
        res.status(200).send(award);
      } else {
        res.status(400).send({
          error: 'Error creating new award',
        });
      }
    } else {
      res.status(400).send({
        error: 'Required fields not provided',
      });
    }
  } else {
    // Return unauthorized for all other requests
    res.status(401).send({
      error: 'Unauthorized',
    });
  }
};
