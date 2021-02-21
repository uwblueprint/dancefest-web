import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session exists (thus, user is authenticated)
  if (session) {
    // Collect adjudication id
    const { id } = req.query;

    // If adjudicationID is provided
    if (id) {
      try {
        // Collect adjudication with adjudicationID
        const adjudication = await getAdjudicationByID(id);
        res.send(adjudication);
      } catch (error) {
        res.status(401).end();
      }
    }
  }

  // Else, return 401 for all failures
  res.status(401).end();
};

// Select all fields but created/updated_at
const adjudicationFieldSelection = {
  id: true,
  artistic_mark: true,
  technical_mark: true,
  cumulative_mark: true,
  audio_url: true,
  notes: true,
  special_award: true,
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
