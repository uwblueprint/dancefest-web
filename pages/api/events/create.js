import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // Collect title, date, and judges array for new event
    const { title, date, judges } = req.body;

    // If all exist
    if (title && date && judges) {
      // Create new event
      const event = await prisma.event.create({
        data: {
          name: title,
          event_date: new Date(date),
          judges: JSON.stringify(judges),
        },
      });

      // If event creation is successful, return event
      if (event) {
        return res.json(event);
      }
      // Else, return server error
      else {
        return res.status(500).end();
      }
    }
  }

  // Return unauthorized for all other requests
  return res.status(401).send('Unauthorized');
};
