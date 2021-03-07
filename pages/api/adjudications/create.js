import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  if (!session || session.role !== 'ADMIN') {
    return res.status(401).end();
  }

  // Collect data for new adjudication
  const { artisticMark, technicalMark, cumulativeMark, audioUrl, notes, performanceID } = req.body;

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // If all exist
    if (artisticMark && technicalMark && cumulativeMark && performanceID) {
      // Create new cumulativeMark
      // TODO: set user_id from session???
      const adjudication = await prisma.adjudication.create({
        data: {
          artistic_mark: parseInt(artisticMark),
          technical_mark: parseInt(technicalMark),
          cumulative_mark: parseInt(cumulativeMark),
          audio_url: audioUrl,
          notes: notes,
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
