import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If authenticated and admin
  if (session && session.role === 'ADMIN') {
    // Collect award information from request body
    const { id, title, isFinalized, userID, performanceID } = req.body;

    // If all fields exist
    if (id && title && isFinalized && userID && performanceID) {
      const updatedAward = await prisma.awards_performances.update({
        where: {
          award_id: id,
        },
        data: {
          performance_id: performanceID,
          awards: {
            update: {
              title: title,
              is_finalized: isFinalized,
              user_id: userID,
            },
          },
        },
      });

      // If event updating is successful, return updated event
      if (updatedAward) {
        res.send(updatedAward);
      } else {
        res.status(500).end();
      }
    }

    // Else, throw unauthenticated for all
    res.status(401).end();
  }
};
