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
  const { id, title, settingIDs, isFinalized } = req.body;

  if (!id) {
    return res.status(400).json({
      error: 'Required award id not provided',
    });
  }

  // create new settingIDs, delete existing ones

  const editData = {};
  if (title) editData.title = title;
  if (isFinalized === false) editData.is_finalized = isFinalized;

  const deletedAwardCategories = prisma.awardCategory.deleteMany({
    where: {
      award_id: id,
    },
  });

  let awardCategories = [];

  if (settingIDs && settingIDs.length > 0) {
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

  const updatedAward = prisma.award.update({
    where: {
      id,
    },
    data: editData,
  });

  const awardTransaction = await prisma.$transaction([
    deletedAwardCategories,
    ...awardCategories,
    updatedAward,
  ]);
  const awardResult = awardTransaction[awardTransaction.length - 1];

  // If updating award is successful, return updated event
  if (awardTransaction) {
    res.status(200).json(awardResult);
  } else {
    res.status(400).json({
      error: 'Error updating award with provided id',
    });
  }
};
