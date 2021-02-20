import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// get performances by specifying the corresponding eventID
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  const { event_id } = req.query;

  // If session exists and eventID provided (thus, user is authenticated)
  // only judges and admins
  // TODO check they have access to this event
  if (session && event_id) {
    // Collect all events from database
    let performances = await prisma.performance.findMany({
      where: {
        event_id: parseInt(event_id),
      },
    });
    res.send(performances);
  }

  // Else, return 401 for all failures
  res.status(401).end();
};
