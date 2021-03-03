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
    const filter = { id: parseInt(id) };
    const performance = await getPerformance(filter);

    if (performance) {
      res.send(performance);
    } else {
      res.status(404).end();
    }
  }

  // Else, return 401 for all failures
  res.status(401).end();
};

export const getPerformance = async filter => {
  // Get award with the provided id
  // TODO: add flag for including performance data
  const performance = await prisma.performance.findUnique({
    where: filter,
    include: {
      awards: {
        include: {
          awards: true,
        },
      },
    },
  });

  if (!performance) return;

  // Remove the relation table data
  return {
    ...performance,
    awards: performance.awards.map(award => award.awards),
  };
};
