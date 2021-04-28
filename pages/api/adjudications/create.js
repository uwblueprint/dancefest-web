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

  // Check if the performance that adjudication is associated with is finalized
  const isFinalized = await prisma.awardPerformance.findFirst({
    where: {
      performance_id: performanceID,
      status: 'FINALIST',
    },
  });
  // If it is finalized, we do not allow creating adjudication
  if (isFinalized) {
    return res.status(400).json({
      error: 'Adjudication cannot be created as the performance is finalized',
    });
  }

  const existingAdjudications = await prisma.adjudication.findMany({
    where: { performance_id: parseInt(performanceID), user_id: userID },
  });

  if (existingAdjudications && existingAdjudications.length > 0) {
    return res.status(400).json({
      error: 'Adjudication already exists for the current user',
    });
  }

  // Create new adjudication
  const adjudication = await prisma.adjudication.create({
    data: {
      artistic_mark: parseFloat(artisticMark),
      technical_mark: parseFloat(technicalMark),
      cumulative_mark: parseFloat(cumulativeMark),
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
