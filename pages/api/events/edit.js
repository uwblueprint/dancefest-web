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
      // Check that event exists
      const event = await prisma.event.findUnique({
        where: {
          id: id,
        },
        include: {
          performances: true,
          awards: true,
        },
      });

      // If event does not exist
      if (!event) {
        return res.status(400).json({
          error: 'Event does not exist',
        });
      }

      // Check if the event has a performance or an award
      if (
        (event.performances && event.performances.length !== 0) ||
        (event.awards && event.awards.length !== 0)
      ) {
        return res.status(400).json({
          error: 'Event cannot be edited as there is at least one performance or award',
        });
      }

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
        return res.json(updatedEvent);
      }
      // Else, return server error
      else {
        return res.status(500).end();
      }
    }
  }

  // Else, throw unauthenticated for all
  return res.status(401).send('Unauthorized');
};
