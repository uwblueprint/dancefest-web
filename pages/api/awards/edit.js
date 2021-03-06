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
  const { id, title } = req.body;

  if (!id || !title) {
    return res.status(400).send({
      error: 'Required award id not provided',
    });
  }

  const updatedAward = await prisma.award.update({
    where: {
      id: id,
    },
    data: {
      title: title,
    },
  });

  // If updating award is successful, return updated event
  if (updatedAward) {
    res.status(200).send(updatedAward);
  } else {
    res.status(400).send({
      error: 'Error updating award with provided id',
    });
  }
};
