import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Edit award
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated
  if (!session) {
    return res.status(401).end();
  }

  // Collect award information from request body
  // type must be string in all capitals matching corresponding enum AwardType
  const { id, title, type, eventID, settingIDs, isFinalized } = req.body;

  if (!id) {
    return res.status(400).json({
      error: 'Required award id not provided',
    });
  }

  const editData = {};
  if (title) editData.title = title;
  if (type) editData.type = type;
  if (isFinalized === false) editData.is_finalized = isFinalized;
  if (eventID) {
    // Check that the event exists
    const eventExists = await prisma.event.findUnique({
      where: {
        id: eventID,
      },
    });
    if (eventExists) {
      editData.event_id = eventID;
    } else {
      return res.status(400).json({
        error: 'Event does not exist',
      });
    }
  }

  const updatedAward = await prisma.award.update({
    where: {
      id,
    },
    data: editData,
  });

  // Create new settingIDs, delete existing ones
  const deletedAwardCategories = prisma.awardCategory.deleteMany({
    where: {
      award_id: id,
    },
  });

  let awardCategories = [];

  if (
    (updatedAward.type === 'DANCE_ARTISTRY' || updatedAward.type === 'SCORE_BASED') &&
    settingIDs &&
    settingIDs.length > 0
  ) {
    awardCategories = settingIDs.map(settingID =>
      prisma.awardCategory.upsert({
        where: {
          awards_categories_unique: {
            award_id: id,
            category_id: settingID,
          },
        },
        create: {
          award_id: id,
          category_id: settingID,
        },
        update: {},
      })
    );
  }

  const awardTransaction = await prisma.$transaction([deletedAwardCategories, ...awardCategories]);

  // If updating award is successful, return updated event
  if (awardTransaction) {
    res.status(200).json(updatedAward);
  } else {
    res.status(400).json({
      error: 'Error updating award with provided id',
    });
  }
};
