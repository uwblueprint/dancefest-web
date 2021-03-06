import { formatAdjudication } from '@utils/adjudications'; // Format adjudication util

/**
 * Formats a performance response from /api/performances/collect to a format that is easy to use
 * on the frontend. Converts all field names to camelCase
 * @param {Object} performance - Performance returned in the response
 * @returns {Object} Formatted performance
 */
export const formatPerformance = ({
  competition_level: performanceLevel,
  competition_level_id: performanceLevelID,
  dance_size: danceSize,
  dance_size_id: danceSizeID,
  dance_style: danceStyle,
  dance_style_id: danceStyleID,
  dance_title: danceTitle,
  event_id: eventId,
  performance_link: performanceLink,
  school: { school_name: schoolName },
  school_id: schoolId,
  cumulativeScore,
  awards,
  adjudications,
  ...rest
}) => {
  const nominations = {};
  awards.forEach(award => {
    if (award.user_id in nominations) {
      nominations[award.user_id].push({ isCategory: award.is_category, ...award });
    } else {
      nominations[award.user_id] = [{ isCategory: award.is_category, ...award }];
    }
  });

  return {
    performanceLevel,
    performanceLevelID,
    danceSize,
    danceSizeID,
    danceStyle,
    danceStyleID,
    danceTitle,
    eventId,
    performanceLink,
    schoolName,
    schoolId,
    score: cumulativeScore,
    cumulativeScore,
    awards,
    awardsString: awards
      .map(({ title }) => title)
      .filter(award => !!award)
      .join(', '),
    adjudications: adjudications.map(formatAdjudication),
    nominations,
    ...rest,
  };
};

/**
 * Formats performances response from /api/performances/collect to a format that is easy to use with Table component
 * in the Entry View. Converts all field names to camelCase
 * @param {Object[]} performances - Performances returned in the response
 * @returns {Object[]} Formatted performances
 */
export const formatPerformances = performances => {
  return performances.map(formatPerformance);
};

/**
 * Calculates the average of an array of scores
 * @param {number[]} scores - Array of scores
 * @returns {number | null} - The average score, to 2 decimal point
 */
export const calculateAverageScore = scores => {
  if (!Array.isArray(scores)) {
    throw new Error('`scores` parameter must be an array');
  }

  if (scores.length === 0) {
    return null;
  }

  const average = scores.reduce((a, v) => a + v, 0) / scores.length;

  return Math.round(average * 100) / 100;
};

export const filterPerformancesForJudge = (performances, judgeID) => {
  let adjudicated = [];
  let pending = [];
  performances.map(performance => {
    let judgeFound = false;
    performance.adjudications.map(adjudication => {
      if (adjudication.userId === judgeID) judgeFound = true;
    });

    if (judgeFound) {
      adjudicated.push(performance);
    } else {
      pending.push(performance);
    }
  });
  return [adjudicated, pending];
};
