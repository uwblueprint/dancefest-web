import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session does not exist
  if (!session) {
    return res.status(401).end();
  }

  // Collect params from request body
  const { id, artisticMark, technicalMark, cumulativeMark, audioUrl, notes } = req.body;

  // If required fields do not exist
  if (!id || !artisticMark || !technicalMark || !cumulativeMark) {
    return res.status(400).json({
      error: 'Required fields to update adjudication were not provided',
    });
  }

  // Check if the adjudication exists
  const adjudication = await prisma.adjudication.findUnique({
    where: {
      id: id,
    },
  });

  // If adjudication does not exist
  if (!adjudication) {
    return res.status(400).json({
      error: 'Adjudication does not exist',
    });
  }

  // Check if the performance that adjudication is associated with is finalized
  const isFinalized = await prisma.awardPerformance.findFirst({
    where: {
      performance_id: adjudication.performance_id,
      status: 'FINALIST',
    },
  });

  // If it is finalized, we do not allow deleting adjudication
  if (isFinalized) {
    return res.status(400).json({
      error: 'Adjudication cannot be edited as the performance is finalized',
    });
  }

  // Update adjudication
  const updatedAdjudication = await prisma.adjudication.update({
    where: {
      id: id,
    },
    data: {
      artistic_mark: parseInt(artisticMark),
      technical_mark: parseInt(technicalMark),
      cumulative_mark: parseInt(cumulativeMark),
      audio_url: audioUrl,
      notes: notes,
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
