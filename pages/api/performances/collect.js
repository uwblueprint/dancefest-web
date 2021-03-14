import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

// get performances by specifying the corresponding eventID
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  //TODO: if it is required, I think it should be request body?
  const { eventID, schoolIDs } = req.query;

  // If not authenticated
  if (!session) {
    return res.status(401).end();
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

  const performances = await getPerformancesWithJudgingData(filter);
  return res.status(200).json(performances);
};

export const getPerformances = async filter => {
  // Collect event with eventID
  const performances = await prisma.performance.findMany({
    where: filter,
    include: {
      school: {
        select: {
          school_name: true,
        },
      },
      adjudications: true,
    },
  });

  if (!performances) return;

  // Remove the relation table data
  return performances.map(performance => {
    return {
      ...performance,
      // awards: performance.awards.map(award => {
      //   return {
      //     ...award.awards,
      //     nominee_count: award.nominee_count,
      //     status: award.status,
      //   };
      // }),
    };
  });
};

export const getPerformancesWithJudgingData = async filter => {
  const performances = await prisma.performance.findMany({
    where: filter,
    include: {
      event: {
        select: { judges: true },
      },
      school: {
        select: {
          school_name: true,
        },
      },
    },
  });

  const adjudications = await prisma.adjudication.findMany();

  const calculateNewAverage = (oldAverage, oldWeight, newValue) => {
    return (oldAverage * oldWeight + newValue) / (oldWeight + 1);
  };

  const performanceToAdjudication = {}; // Map of performance Id to adjudication data
  adjudications.forEach(
    ({ performance_id: performanceIdString, artistic_mark, technical_mark, cumulative_mark }) => {
      const performanceId = parseInt(performanceIdString);
      if (performanceId in performanceToAdjudication) {
        const {
          completedAdjudications,
          artisticMark,
          technicalMark,
          cumulativeMark,
        } = performanceToAdjudication[performanceId];
        performanceToAdjudication[performanceId] = {
          completedAdjudications: completedAdjudications + 1,
          artisticMark: calculateNewAverage(artisticMark, completedAdjudications, artistic_mark),
          technicalMark: calculateNewAverage(technicalMark, completedAdjudications, technical_mark),
          cumulativeMark: calculateNewAverage(
            cumulativeMark,
            completedAdjudications,
            cumulative_mark
          ),
        };
      } else {
        performanceToAdjudication[performanceId] = {
          completedAdjudications: 1,
          artisticMark: artistic_mark,
          technicalMark: technical_mark,
          cumulativeMark: cumulative_mark,
        };
      }
    }
  );

  return performances.map(({ id, dance_title, event: { judges: judgesString }, ...rest }) => {
    const judges = JSON.parse(judgesString);
    const { completedAdjudications, artisticMark, technicalMark, cumulativeMark } =
      performanceToAdjudication[id] || {};
    return {
      id,
      dance_title,
      score: cumulativeMark,
      artisticMark,
      technicalMark,
      cumulativeMark,
      completedAdjudications,
      totalAdjudications: judges.filter(judge => judge !== '').length,
      ...rest,
    };
  });
};
