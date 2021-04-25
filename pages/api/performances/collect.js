import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling
import { calculateAverageScore } from '@utils/performances'; // Utils

// get performances by specifying the corresponding eventID
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  //TODO: if it is required, I think it should be request body?
  const { eventID, schoolIDs, settingIDs } = req.query;

  // If not authenticated
  if (!session) {
    return res.status(401).send('Unauthorized');
  }

  if (!eventID) {
    return res.status(400).json({
      error: 'eventID not provided',
    });
  }

  // Collect all events from database
  const filter = { event_id: parseInt(eventID) };

  // If schoolIDs exist, we convert it into an array of integers to add to the filter
  if (schoolIDs) filter.school_id = { in: schoolIDs.split(',').map(i => +i) };
  if (settingIDs) {
    // If settingIDs array is passed in, we filter for performances with the matching settings
    // We get all the performances where the competition_level, dance_size, dance_style are in
    // the requested settingIDs that are passed in
    const settingIDArray = settingIDs.split(',').map(i => +i);

    for (const settingID of settingIDArray) {
      const setting = await getSetting(settingID);
      if (setting) {
        if (setting.type === 'COMPETITION_LEVEL') {
          filter.competition_level_id = settingID;
        } else if (setting.type === 'STYLE') {
          filter.dance_style_id = settingID;
        } else if (setting.type === 'DANCE_SIZE') {
          filter.dance_size_id = settingID;
        }
      }
    }
  }

  const performances = await getPerformances(filter);
  return res.status(200).json(performances);
};

export const getPerformances = async filter => {
  // Collect event with eventID
  const performances = await prisma.performance.findMany({
    where: filter,
    include: {
      event: {
        select: {
          judges: true,
        },
      },
      awards_performances: {
        include: {
          awards: true,
        },
      },
      school: {
        select: {
          id: true,
          school_name: true,
          email: true,
          contact_name: true,
        },
      },
      adjudications: true,
    },
  });

  if (!performances) return;

  // Remove the relation table data
  return performances.map(
    ({ awards_performances, event: { judges: judgesString }, adjudications, ...rest }) => {
      return {
        ...rest,
        awards: awards_performances.map(({ awards, status, user_id }) => {
          return {
            ...awards,
            status,
            user_id,
          };
        }),
        specialAwards: awards_performances
          .filter(award => award.awards.type === 'SPECIAL')
          .map(award => award.awards),
        adjudications,
        totalAdjudications: (JSON.parse(judgesString) || []).filter(judge => judge !== '').length,
        completedAdjudications: adjudications.length,
        artisticScore: calculateAverageScore(adjudications.map(a => a.artistic_mark)),
        technicalScore: calculateAverageScore(adjudications.map(a => a.technical_mark)),
        cumulativeScore: calculateAverageScore(adjudications.map(a => a.cumulative_mark)),
      };
    }
  );
};

const getSetting = async id => {
  const setting = await prisma.setting.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!setting) return;
  return setting;
};
