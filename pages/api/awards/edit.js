import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Edit award to change title
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated
  if (!session) {
    return res.status(401).end();
  }

  // Collect award information from request body
  const { id, title, isFinalized } = req.body;

  if (!id) {
    return res.status(400).json({
      error: 'Required award id not provided',
    });
  }

  const editData = {};
  if (title) editData.title = title;
  if (isFinalized === false) editData.is_finalized = isFinalized;

  const updatedAward = await prisma.award.update({
    where: {
      id,
    },
    data: editData,
  });

  // If updating award is successful, return updated event
  if (updatedAward) {
    res.status(200).json(updatedAward);
  } else {
    res.status(400).json({
      error: 'Error updating award with provided id',
    });
  }
};
