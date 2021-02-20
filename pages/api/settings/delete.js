import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If authenticated and admin
  if (session && session.isAdmin) {
    // Collect id of setting to delete
    const { id } = req.body;

    // If id exists
    if (id) {
      // Delete event
      const deletedSetting = await prisma.setting.delete({
        // With
        where: {
          // Specified id
          id: id,
        },
      });

      // Return deleted setting
      res.send(deletedSetting);
    }
  }

  // Else, throw unauthenticated
  res.status(401).end();
};
