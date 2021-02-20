import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.isAdmin) {
    // Collect performance information
    const {
      name,
      academic_level,
      performers,
      choreographers,
      competition_level,
      dance_size,
      dance_entry,
      dance_style,
      dance_title,
      event_id,
      school_id,
    } = req.body;

    // If all exist
    if (
      name &&
      academic_level &&
      performers &&
      choreographers &&
      competition_level &&
      dance_size &&
      dance_entry &&
      dance_style &&
      dance_title &&
      event_id &&
      school_id
    ) {
      // Create new event
      const event = await prisma.performance.create({
        data: {
          name: name,
          academic_level: academic_level,
          performers: performers,
          choreographers: choreographers,
          competition_level: competition_level,
          dance_size: dance_size,
          dance_entry: dance_entry,
          dance_style: dance_style,
          dance_title: dance_title,
          event_id: event_id,
          school_id: school_id,
        },
      });

      // If performance creation is successful, return performance
      if (event) res.send(performance);
      // Else, return server error
      else res.status(500).end();
    }
  }

  // Return unauthorized for all other requests
  res.status(401).end();
};
