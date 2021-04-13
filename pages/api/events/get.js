import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session exists (thus, user is authenticated)
  if (session) {
    // Collect eventID from URL query
    const { eventID } = req.query;

    // If eventID is provided
    if (eventID) {
      try {
        // Collect event with eventID
        let event = await getEventByID(eventID);
        // Parse and filter event judges
        event.judges = (JSON.parse(event.judges) || []).filter(judge => judge !== '');
        event.performances = event.performances ? event.performances.length : 0;

        // If admin
        if (session.role === 'ADMIN') {
          // Send event immediately
          res.send(event);
        } else {
          // If array of judges includes current user
          if (event.judges.includes(session.user.email))
            // Send event
            res.send(event);
        }
      } catch (error) {
        res.status(401).send('Unauthorized');
      }
    }
  }

  // Else, return 401 for all failures
  res.status(401).send('Unauthorized');
};

export const getEventByID = async id => {
  // Collect event with eventID
  return await prisma.event.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      performances: true,
    },
  });
};
