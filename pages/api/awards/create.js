import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // Collect award information from request body
    const { title, isFinalized, userID, performanceID } = req.body;

    // If required fields exist
    if ((title && isFinalized && userID, performanceID)) {
      // Create new award
      const award = await prisma.awards_performances.create({
        data: {
          performance_id: performanceID,
          awards: {
            create: {
              title: title,
              is_finalized: isFinalized,
              user_id: userID,
            },
          },
        },
      });

      //TODO: Remove association table stuff prior to returning

      // If award creation is successful, return award
      // Else, return server error
      if (award) {
        res.send(award);
      } else {
        res.status(400).end();
      }
    } else {
      res.status(400).end();
    }
  }

  // Return unauthorized for all other requests
  res.status(401).end();
};
