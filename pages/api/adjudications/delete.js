import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If authenticated and admin
  if (session && session.isAdmin) {
    // Collect id of adjudication to delete
    const { id } = req.body;

    // If id exists
    if (id) {
      // Delete adjudication
      const deletedAdjudication = await prisma.adjudication.delete({
        // With
        where: {
          // Specified id
          id: id,
        },
      });

      // Return deleted adjudication
      res.send(deletedAdjudication);
    }
  }

  // Else, throw unauthenticated
  res.status(401).end();
};
