import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated or is not an admin
  if (!session) {
    return res.status(401).send('Unauthorized');
  }

  // Collect performance information from request body
  const {
    id,
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

  // TODO: patch edit per data field?
  /** Optional FIELDS
    danceSizeID,
    danceStyleID,
    competitionLevelID,
  **/
  if (
    !id ||
    !danceTitle ||
    !performers ||
    !choreographers ||
    !competitionLevel ||
    !danceSize ||
    !danceStyle ||
    !eventID ||
    !schoolID
  ) {
    return res.status(400).json({
      error: 'Required fields to update performance were not provided',
    });
  }

  // Check that the event exists
  const eventExists = await prisma.event.findUnique({
    where: {
      id: eventID,
    },
  });

  // If the event does not exist
  if (!eventExists) {
    return res.status(400).json({
      error: 'Event does not exist',
    });
  }

  const performance = await prisma.performance.findUnique({
    where: {
      id: id,
    },
    include: {
      adjudications: true,
      awards_performances: true,
    },
  });

  // If the performance does not exist, throw error
  if (!performance) {
    return res.status(400).json({
      error: 'Performance does not exist',
    });
  }

  // If the performance has adjudications, we do not allow editing
  if (performance.adjudications && performance.adjudications.length !== 0) {
    return res.status(400).json({
      error: 'Performance cannot be edited as it has an adjudication',
    });
  }

  // If the performance is nominated for an award and it is a finalist, we do not allow editing
  if (performance.awards_performances && performance.awards_performances.length !== 0) {
    for (const nomination of performance.awards_performances) {
      if (nomination.status === 'FINALIST') {
        return res.status(400).json({
          error: 'Performance cannot be edited as it is a finalist for an award',
        });
      }
    }
  }

  const updatedPerformance = await prisma.performance.update({
    where: {
      id,
    },
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

  if (updatedPerformance) {
    return res.status(200).json(updatedPerformance);
  } else {
    return res.status(400).json({
      error: 'Performance was unable to be created',
    });
  }
};
