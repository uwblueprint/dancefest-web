import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// Edit award
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated
  if (!session) {
    return res.status(401).send('Unauthorized');
  }

  // Collect award information from request body
  // type must be string in all capitals matching corresponding enum AwardType
  const { id, title, type, eventID, settingIDs } = req.body;

  if (!id) {
    return res.status(400).json({
      error: 'Required award id not provided',
    });
  }

  const editData = {};
  if (title) editData.title = title;
  if (type) editData.type = type;
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

  const award = await prisma.award.findUnique({
    where: {
      id: id,
    },
  });

  // If the award does not exist, throw error
  if (!award) {
    return res.status(400).json({
      error: 'Award does not exist',
    });
  }

  // If the award is finalized, do not allow editing
  if (award.is_finalized) {
    return res.status(400).json({
      error: 'Award cannot be edited as it is finalized',
    });
  }

  // If the award has nominations, we do not allow editing
  if (award.awardPerformance && award.awardPerformance.length !== 0) {
    return res.status(400).json({
      error: 'Award cannot be edited as a performance is nominated for the award',
    });
  }

  // If all validations pass, we update the award.
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
