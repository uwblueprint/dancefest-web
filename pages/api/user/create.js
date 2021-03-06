import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // Collect user info
    const { name, role, email } = req.body;

    // If name and email are defined
    if (name && email) {
      // Create new user
      const user = await prisma.user.create({
        data: {
          name,
          role: role || 'USER',
          email,
        },
      });

      // If user creation is successful, return user
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
  res.status(401).end();
};
