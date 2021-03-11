import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session does not exist
  if (!session) {
    return res.status(401).end();
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: 'Id was not provided',
    });
  }

  // Delete adjudication
  const deletedAdjudication = await prisma.adjudication.delete({
    // With
    where: {
      // Specified id
      id: id,
    },
  });

  // Return deleted adjudication
  return res.status(200).json(deletedAdjudication);
};
