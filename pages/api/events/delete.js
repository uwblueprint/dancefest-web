import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If authenticated and admin
  if (session && session.role === 'ADMIN') {
    // Collect id of event to delete
    const { id } = req.body;

    // If id exists
    if (id) {
      // Delete event
      const deletedEvent = await prisma.event.delete({
        // With
        where: {
          // Specified id
          id: id,
        },
      });

      // Return deleted event
      res.send(deletedEvent);
    }
  }

  // Else, throw unauthenticated
  res.status(401).send('Unauthorized');
};
