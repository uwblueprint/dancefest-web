import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// get awards by category IDs
// return awards by category IDs
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });
  const { settingIDs } = req.body;

  // If session exists (user authenticated)
  if (session) {
    // get awards
    const awards = await getAwards(settingIDs);
    // filtering in the API, TODO move to filtering via query
    res.send(awards);
  }

  // Else, return 401 for all failures
  res.status(401).end();
};

export const getAwards = async settingIDs => {
  // Collect all awards from database
  const awards = await prisma.award.findMany({
    include: {
      awards_categories: {
        include: {
          settings: true,
        },
      },
    },
  });
  // return those awards with award categories that are subset of settingIDs
  return awards
    .map(award => {
      return {
        ...award,
        categories: award.awards_categories.map(setting => {
          return setting.id;
        }),
      };
    })
    .filter(
      award =>
        award.is_category === false ||
        award.categories.every(category => settingIDs.includes(category))
    );
};
