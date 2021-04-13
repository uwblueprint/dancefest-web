import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// get settings by specifying the corresponding type
// GET with { id : id }
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  const { id } = req.query;

  // If session exists (user authenticated) and type provided
  if (session && id) {
    // Collect all events from database
    let setting = await prisma.setting.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (setting) {
      res.send(setting);
    } else {
      res.status(404).end();
    }
  }

  // Else, return 401 for all failures
  res.status(401).send('Unauthorized');
};
