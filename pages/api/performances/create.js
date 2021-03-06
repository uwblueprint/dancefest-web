import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated or is not an admin
  if (!session || session.role !== 'ADMIN') {
    return res.status(401).send('Unauthorized');
  }

  // Collect performance information from request body
  const {
    danceTitle,
    performers,
    choreographers,
    competitionLevel,
    danceSize,
    danceStyle,
    performanceLink,
    danceSizeID,
    danceStyleID,
    competitionLevelID,
    eventID,
    schoolID,
  } = req.body;

  // If required fields were not provided, return an error
  if (!eventID || !schoolID) {
    return res.status(400).json({
      error: 'Required fields eventId, or schoolID were not provided',
    });
  }

  // Check that the event exists
  const eventExists = await prisma.event.findUnique({
    where: {
      id: eventID,
    },
  });

  // If event does not exist
  if (!eventExists) {
    return res.status(400).json({
      error: 'Event does not exist',
    });
  }

  try {
    const performance = await prisma.performance.create({
      data: {
        dance_title: danceTitle,
        performers: performers,
        choreographers: choreographers,
        competition_level: competitionLevel,
        dance_size: danceSize,
        dance_style: danceStyle,
        performance_link: performanceLink,
        dance_size_id: danceSizeID,
        dance_style_id: danceStyleID,
        competition_level_id: competitionLevelID,
        event_id: eventID,
        school_id: schoolID,
      },
    });

    if (performance) {
      return res.status(200).json(performance);
    } else {
      return res.status(400).json({
        error: 'Performance was unable to be created',
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: 'Error creating new performance',
    });
  }
};
