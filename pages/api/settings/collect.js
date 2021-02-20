import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// get settings by specifying the corresponding type
// POST with { type : type }
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  const { type: type } = req.body;

  // If session exists (user authenticated) and type provided
  if (session && type) {
    // Collect all events from database
    let settings = await prisma.setting.findMany({
      where: {
        type: type,
      },
    });
    res.send(settings);
  }

  // Else, return 401 for all failures
  res.status(401).end();
};