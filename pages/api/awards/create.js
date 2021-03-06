import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Create award
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is not authenticated
  if (!session || session.role !== 'ADMIN') {
    return res.status(401).send('Unauthorized');
  }

  // Collect award information from request body
  // type must be string in all capitals matching corresponding enum AwardType
  const { title, type, eventID, settingIDs } = req.body;

  // If required fields do not exist
  if (!title || !type || !eventID) {
    return res.status(400).json({
      error: 'Required fields not provided',
    });
  }

  // Check that the event exists
  const eventExists = await prisma.event.findUnique({
    where: {
      id: eventID,
    },
  });

  // If the event does not exist
  if (!eventExists) {
    return res.status(400).json({
      error: 'Event does not exist',
    });
  }

  try {
    // Create award
    const award = await prisma.award.create({
      data: {
        title: title,
        type: type,
        event_id: eventID,
      },
    });

    // Create award category references if it is a category award
    if (
      (award.type === 'DANCE_ARTISTRY' || award.type === 'SCORE_BASED') &&
      settingIDs &&
      settingIDs.length > 0
    ) {
      await prisma.$transaction(
        settingIDs.map(settingID =>
          prisma.awardCategory.upsert({
            where: {
              awards_categories_unique: {
                award_id: award.id,
                category_id: settingID,
              },
            },
            create: {
              award_id: award.id,
              category_id: settingID,
            },
            update: {},
          })
        )
      );
    }

    // If award creation is successful, return award
    // Else, return error
    if (award) {
      return res.status(200).json(award);
    } else {
      return res.status(400).json({
        error: 'Error creating new award',
      });
    }
  } catch {
    return res.status(400).json({
      error: 'Error creating new award',
    });
  }
};
