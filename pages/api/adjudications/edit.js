import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session does not exist
  if (!session) {
    return res.status(401).end();
  }

  const userID = session.id;

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

  // If required fields do not exist
  if (!id || !artisticMark || !technicalMark || !cumulativeMark || !performanceID || !userID) {
    return res.status(400).json({
      error: 'Required fields to update adjudication were not provided',
    });
  }

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
      user_id: userID,
    },
  });

  if (updatedAdjudication) {
    return res.status(200).json(updatedAdjudication);
  } else {
    return res.status(400).json({
      error: 'Error updating ajudication',
    });
  }
};
