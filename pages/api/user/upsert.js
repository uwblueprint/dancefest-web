import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // Collect name, email and role
    const { name, email, role } = req.body;

    // If email exists
    if (email) {
      // User update or create if not exists
      const user = await prisma.user.upsert({
        where: {
          email: email,
        },
        update: {
          name: name,
          email: email,
          role: role || 'USER',
        },
        create: {
          name: name,
          email: email,
          role: role || 'USER',
        },
      });

      // If user created send it back
      // TODO we should filter the user data we send back
      if (user) {
        res.send(user);
      }
      // Else, return server error
      else {
        res.status(500).end();
      }
    }
  }
  // Return unauthorized for all other requests
  res.status(401).send('Unauthorized');
};
