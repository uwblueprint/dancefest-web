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

  // Collect award information from request body
  const { title, settingIDs } = req.body;

  // If required fields do not exist
  if (!title) {
    return res.status(400).json({
      error: 'Required fields not provided',
    });
  }

  try {
    const isCategory = settingIDs && settingIDs.length > 0;
    // create award
    const award = await prisma.award.create({
      data: {
        title: title,
        is_category: isCategory,
      },
    });

    // create award category references
    if (isCategory) {
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
