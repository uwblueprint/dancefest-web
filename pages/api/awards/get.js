import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// get performances by specifying the corresponding award id
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  const { id } = req.query;

  // If session exists and id is provided (thus, user is authenticated)
  if (session && id) {
    const filter = { award_id: id };

    //TODO: remove association table data prior to returning
    const award = await getAward(filter);

    if (award) {
      res.send(award);
    } else {
      res.status(404).end();
    }
  }

  // Else, return 401 for all failures
  res.status(401).end();
};

export const getAward = async filter => {
  // Get award with the provided id
  return await prisma.awards_performances.findMany({
    where: filter,
    include: { awards: true },
  });
};
