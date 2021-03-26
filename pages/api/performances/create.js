import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated or is not an admin
  if (!session || session.role !== 'ADMIN') {
    return res.status(401).end();
  }

  // Collect performance information from request body
  const {
    name,
    academicLevel,
    performers,
    choreographers,
    competitionLevel,
    danceSize,
    danceEntry,
    danceStyle,
    danceTitle,
    eventID,
    schoolID,
  } = req.body;

  // If required fields were not provided, return an error
  if (!danceEntry || !eventID || !schoolID) {
    return res.status(400).json({
      error: 'Required fields danceEntry, eventId, or schoolID were not provided',
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
        name: name,
        academic_level: academicLevel,
        performers: performers,
        choreographers: choreographers,
        competition_level: competitionLevel,
        dance_size: danceSize,
        dance_entry: danceEntry,
        dance_style: danceStyle,
        dance_title: danceTitle,
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
  } catch {
    return res.status(400).json({
      error: 'Error creating new performance',
    });
  }
};
