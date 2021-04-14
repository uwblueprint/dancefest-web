import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If authenticated and admin
  if (session && session.role === 'ADMIN') {
    // Collect from request body
    const { id, title, date, judges } = req.body;

    // If all fields exist
    if (id && title && date && judges) {
      // Update event
      const updatedEvent = await prisma.event.update({
        // Where
        where: {
          // Id is passed
          id: id,
        },
        // With
        data: {
          // New title, date, and judges (all overwrite)
          name: title,
          event_date: new Date(date),
          judges: JSON.stringify(judges),
        },
      });

      // If event updating is successful, return updated event
      if (updatedEvent) {
        res.send(updatedEvent);
      }
      // Else, return server error
      else {
        res.status(500).end();
      }
    }
  }

  // Else, throw unauthenticated for all
  res.status(401).send('Unauthorized');
};
