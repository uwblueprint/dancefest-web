import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Edit award
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If authenticated and admin
  if (session && session.role === 'ADMIN') {
    // Collect award information from request body
    // TODO: should userID be stored in session or will it be passed in from frontend?
    const { id, title, isFinalized, userID, performanceID } = req.body;

    // If all fields exist
    if (id && title && isFinalized && userID && performanceID) {
      const updatedAward = await prisma.award.update({
        where: {
          award_id: id,
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

      // If event updating is successful, return updated event
      if (updatedAward) {
        res.status(200).send(updatedAward);
      } else {
        res.status(500).send({
          error: 'Error updating award with provided id',
        });
      }
    } else {
      // Else, throw unauthenticated for all
      res.status(401).send({
        error: 'Unauthorized',
      });
    }
  }
};
