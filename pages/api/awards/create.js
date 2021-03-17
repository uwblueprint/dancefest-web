import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Create award
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is not authenticated
  if (!session || session.role !== 'ADMIN') {
    return res.status(401).end();
  }

  const userID = session.id;

  // Collect award information from request body
  console.log(req.body);
  const { title } = req.body;
  // If required fields do not exist
  if (!title || !userID) {
    return res.status(400).json({
      error: 'Required fields not provided',
    });
  }

  const award = await prisma.award.create({
    data: {
      title: title,
      user_id: userID,
    },
  });

  // If award creation is successful, return award
  // Else, return error
  if (award) {
    return res.status(200).json(award);
  } else {
    return res.status(400).json({
      error: 'Error creating new award',
    });
  }
};
