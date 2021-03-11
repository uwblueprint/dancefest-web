import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session does not exist
  if (!session) {
    return res.status(401).end();
  }

  // Collect adjudication id
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      error: 'Id was not provided',
    });
  }

  try {
    // Collect adjudication with adjudicationID
    const adjudication = await getAdjudicationByID(id);
    return res.status(200).json(adjudication);
  } catch (error) {
    return res.status(400).json({
      error: 'Error retrieving adjudication',
    });
  }
};

// Select all fields but created/updated_at
const adjudicationFieldSelection = {
  id: true,
  artistic_mark: true,
  technical_mark: true,
  cumulative_mark: true,
  audio_url: true,
  notes: true,
  performance_id: true,
};

export const getAdjudicationByID = async id => {
  // Collect adjudication with adjudicationID
  return await prisma.adjudication.findUnique({
    where: {
      id: parseInt(id),
    },
    select: adjudicationFieldSelection,
  });
};
