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
    performers,
    choreographers,
    competitionLevel,
    danceSize,
    danceEntry,
    danceStyle,
    danceTitle,
    performanceLink,
    audioRecordingLink,
    danceSizeID,
    danceStyleID,
    competitionLevelID,
    eventID,
    schoolID,
  } = req.body;

  // TODO: patch edit per data field?
  /** Optional FIELDS
    danceSizeID,
    danceStyleID,
    competitionLevelID,
  **/
  if (
    !id ||
    !name ||
    !performers ||
    !choreographers ||
    !competitionLevel ||
    !danceSize ||
    !danceEntry ||
    !danceStyle ||
    !danceTitle ||
    !performanceLink ||
    !audioRecordingLink ||
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
      performers: performers,
      choreographers: choreographers,
      competition_level: competitionLevel,
      dance_size: danceSize,
      dance_style: danceStyle,
      dance_title: danceTitle,
      performance_link: performanceLink,
      audio_recording_link: audioRecordingLink,
      dance_size_id: danceSizeID,
      dance_style_id: danceStyleID,
      competition_level_id: competitionLevelID,
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
