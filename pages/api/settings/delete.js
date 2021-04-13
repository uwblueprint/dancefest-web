import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If authenticated and admin
  if (session && session.role === 'ADMIN') {
    // Collect id of setting to delete
    const { id } = req.body;

    // Check that id exists
    if (!id) {
      return res.status(400).json({
        error: 'ID was not provided',
      });
    }

    // Get setting entry
    const setting = await prisma.setting.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!setting) {
      return res.status(400).json({
        error: 'The specified setting ID does not exist',
      });
    }

    // Ensure no entries depend on the setting
    const performancesFilter = {};
    switch (setting.type) {
      case 'COMPETITION_LEVEL':
        performancesFilter.competition_level = setting.value;
        break;
      case 'DANCE_SIZE':
        performancesFilter.dance_size = setting.value;
        break;
      case 'STYLE':
        performancesFilter.dance_style = setting.value;
        break;
      default:
        res.status(500).end();
    }
    const performancesUsingSetting = await prisma.performance.findMany({
      where: performancesFilter,
    });
    if (performancesUsingSetting.length > 0) {
      return res.status(400).json({
        error: 'Options in use cannot be deleted',
      });
    }

    // Delete event
    const deletedSetting = await prisma.setting.delete({
      // With
      where: {
        // Specified id
        id: parseInt(id),
      },
    });

    // Return deleted setting
    res.send(deletedSetting);
  }

  // Else, throw unauthenticated
  res.status(401).send('Unauthorized');
};
