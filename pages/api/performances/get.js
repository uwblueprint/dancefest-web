import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// get performances by specifying the corresponding event id
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  const { id } = req.query;

  // If session exists and eventID provided (thus, user is authenticated)
  // TODO check they have access to this event via roles
  if (session && id) {
    // Collect all events from database
    let performance = await prisma.performance.findUnique({
      where: {
        id: parseInt(id),
      },
      //TODO: add information about awards
    });
    if (performance) {
      res.send(performance);
    } else {
      res.status(404).end();
    }
  }

  // Else, return 401 for all failures
  res.status(401).end();
};
