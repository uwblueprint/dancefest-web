import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // Collect name, email and role
    const { id } = req.query;
    const { name, email, role } = req.body;

    // If email exists
    if (id && name && email) {
      // User update
      const user = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          email,
          role,
        },
      });

      // If user updated send it back
      if (user) {
        return res.json(user);
      }
      // Else, return server error
      else {
        return res.status(500).end();
      }
    }
  }
  // Return unauthorized for all other requests
  return res.status(401).send('Unauthorized');
};
