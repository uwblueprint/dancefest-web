import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // Collect data for new adjudication
    const {
      artisticMark,
      technicalMark,
      cumulativeMark,
      audioUrl,
      notes,
      specialAward,
      performanceID,
    } = req.body;

    // If all exist
    if (artisticMark && technicalMark && cumulativeMark && performanceID) {
      // Create new cumulativeMark
      const adjudication = await prisma.adjudication.create({
        data: {
          artistic_mark: parseInt(artisticMark),
          technical_mark: parseInt(technicalMark),
          cumulative_mark: parseInt(cumulativeMark),
          audio_url: audioUrl,
          notes: notes,
          special_award: specialAward,
          performance_id: parseInt(performanceID),
        },
      });

      // If adjudication creation is successful, return adjudication
      if (adjudication) res.send(adjudication);
      // Else, return server error
      else res.status(500).end();
    }
  }

  // Return unauthorized for all other requests
  res.status(401).end();
};
