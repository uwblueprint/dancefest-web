import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.isAdmin) {
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

    // If required fields exist
    if (danceEntry && eventID && schoolID) {
      // Create new performance
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

      // If performance creation is successful, return performance
      // Else, return server error
      if (performance) {
        res.send(performance);
      } else {
        res.status(500).end();
      }
    } else {
      res.status(400).end();
    }
  }

  // Return unauthorized for all other requests
  res.status(401).end();
};
