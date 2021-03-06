import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling
import validator from 'validator';

const UNIQUE_CONSTRAINT_ERROR_CODE = 'P2002';

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // Collect user info
    const { name, role, email } = req.body;

    // If name and email are defined
    if (name && email) {
      // If the email is invalid
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          error: 'Provided email is invalid.',
        });
      }

      // Create new user
      let user;
      try {
        user = await prisma.user.create({
          data: {
            name,
            role: role || 'USER',
            email,
          },
        });
      } catch (err) {
        if (err.code === UNIQUE_CONSTRAINT_ERROR_CODE && err.meta.target.includes('email')) {
          // Fails unique email check
          return res.status(400).json({
            error: `A user already exists with email ${email}`,
          });
        }
      }

      // If user creation is successful, return user
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
