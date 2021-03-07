import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated or is not an admin
  if (!session) {
    return res.status(401).end();
  }

  // Collect performance information from request body
  const {
    id,
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

  if (
    !id ||
    !name ||
    !academicLevel ||
    !performers ||
    !choreographers ||
    !competitionLevel ||
    !danceSize ||
    !danceEntry ||
    !danceStyle ||
    !danceTitle ||
    !eventID ||
    !schoolID
  ) {
    return res.status(400).json({
      error: 'Required fields to update performance were not provided',
    });
  }

  const updatedPerformance = await prisma.performance.update({
    where: {
      id,
    },
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

  if (updatedPerformance) {
    return res.status(200).json(updatedPerformance);
  } else {
    return res.status(400).json({
      error: 'Performance was unable to be created',
    });
  }
};
