import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If authenticated and admin
  if (session && session.role === 'ADMIN') {
    // Collect params from request body
    const {
      id,
      artisticMark,
      technicalMark,
      cumulativeMark,
      audioUrl,
      notes,
      performanceID,
    } = req.body;

    // If all params exist
    if (id && artisticMark && technicalMark && cumulativeMark && performanceID) {
      // Update adjudication
      // TODO: set user_id from session???
      const updatedAdjudication = await prisma.adjudication.update({
        // Where
        where: {
          // Id is passed
          id: id,
        },
        // With
        data: {
          artistic_mark: parseInt(artisticMark),
          technical_mark: parseInt(technicalMark),
          cumulative_mark: parseInt(cumulativeMark),
          audio_url: audioUrl,
          notes: notes,
          performance_id: parseInt(performanceID),
        },
      });

      // If adjudication updating is successful, return updated adjudication
      if (updatedAdjudication) res.send(updatedAdjudication);
      // Else, return server error
      else res.status(500).end();
    }
  }

  // Else, throw unauthenticated for all
  res.status(401).end();
};
