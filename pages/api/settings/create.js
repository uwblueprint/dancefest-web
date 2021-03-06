import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // Collect setting type and setting value (see Prisma SettingType enum)
    // type must be string in all capitals matching corresponding enum
    const { type, value } = req.body;

    // If all exist
    if (type && value) {
      // Create new setting
      const setting = await prisma.setting.create({
        data: {
          type: type,
          value: value,
        },
      });

      // If setting creation is successful, return setting
      if (setting) return res.json(setting);
      // Else, return server error
      else return res.status(500).end();
    }
  }

  // Return unauthorized for all other requests
  return res.status(401).send('Unauthorized');
};
