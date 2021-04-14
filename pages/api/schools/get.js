import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// get settings by specifying the corresponding type
// json body parameter with { id : id }
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  const { id } = req.query;

  // If session exists (user authenticated) and id provided
  if (session && id) {
    // Collect all events from database
    let school = await prisma.school.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (school) {
      return res.json(school);
    } else {
      return res.status(404).end();
    }
  }

  // Else, return 401 for all failures
  return res.status(401).send('Unauthorized');
};
