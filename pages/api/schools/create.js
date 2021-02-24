import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.isAdmin) {
    // Collect name of school
    const { name } = req.body;

    // If name exist
    if (name) {
      // Create new setting
      const school = await prisma.school.create({
        data: {
          name: name,
        },
      });

      // If school creation is successful, return school
      if (school) {
        res.send(school);
      }
      // Else, return server error
      else {
        res.status(500).end();
      }
    }
  }

  // Return unauthorized for all other requests
  res.status(401).end();
};
