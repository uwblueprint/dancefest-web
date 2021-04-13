import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session does not exist
  if (!session) {
    return res.status(401).send('Unauthorized');
  }

  const userID = session.id;

  // Collect data for new adjudication
  const { artisticMark, technicalMark, cumulativeMark, audioUrl, notes, performanceID } = req.body;

  if (!artisticMark || !technicalMark || !cumulativeMark || !performanceID || !userID) {
    return res.status(400).json({
      error: 'Required fields to create adjudication were not provided',
    });
  }

  // Create new adjudication
  const adjudication = await prisma.adjudication.create({
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

  // If adjudication creation is successful, return adjudication
  if (adjudication) {
    return res.status(200).json(adjudication);
  } else {
    return res.status(400).json({
      error: 'Error creating new adjudication',
    });
  }
};
