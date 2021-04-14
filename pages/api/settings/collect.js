import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// get settings by specifying the corresponding type
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });
  const { type } = req.query;

  // If session exists (user authenticated) and type provided
  if (session) {
    // If type is not defined, return all
    const query = type ? { where: { type } } : {};

    // Collect all events from database
    const settings = await prisma.setting.findMany(query);
    return res.json(settings);
  }

  // Else, return 401 for all failures
  return res.status(401).send('Unauthorized');
};
