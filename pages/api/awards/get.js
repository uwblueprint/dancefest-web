import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Get awards by specifying the corresponding award id
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // TODO: I think this should be path rather than query parameter
  const { id } = req.query;

  // If session exists and id is provided (thus, user is authenticated)
  if (session && id) {
    const filter = { id: parseInt(id) };
    const award = await getAward(filter);

    if (award && session.role === 'ADMIN') {
      res.status(200).send(award);
    } else {
      res.status(404).send({
        error: 'Award with provided id not found',
      });
    }
  } else {
    // Else, return 401 for all failures
    res.status(401).send({
      error: 'Unauthorized',
    });
  }
};

export const getAward = async filter => {
  // Get award with the provided id
  // TODO: add flag for including performance data
  const award = await prisma.award.findFirst({
    where: filter,
    include: {
      performances: {
        include: {
          performances: true,
        },
      },
    },
  });

  // Remove the relation table data
  return {
    ...award,
    performances: award.performances.map(performance => performance.performances),
  };
};
