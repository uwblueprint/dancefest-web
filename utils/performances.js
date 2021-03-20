import { formatAdjudication } from '@utils/adjudications'; // Format adjudication util

/**
 * Formats a performance response from /api/performances/collect to a format that is easy to use
 * on the frontend. Converts all field names to camelCase
 * @param {Object} performance - Performance returned in the response
 * @returns {Object} Formatted performance
 */
export const formatPerformance = ({
  academic_level: academicLevel,
  competition_level: performanceLevel,
  dance_entry: danceEntry,
  dance_size: danceSize,
  dance_style: danceStyle,
  dance_title: danceTitle,
  event_id: eventId,
  school: { school_name: schoolName },
  school_id: schoolId,
  cumulativeScore,
  awards,
  adjudications,
  ...rest
}) => {
  return {
    academicLevel,
    performanceLevel,
    danceEntry,
    danceSize,
    danceStyle,
    danceTitle,
    eventId,
    schoolName,
    schoolId,
    score: cumulativeScore,
    cumulativeScore,
    awards,
    awardsString: awards.map(({ title }) => title).join(', '),
    adjudications: adjudications.map(formatAdjudication),
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
 * @returns {number | null} - The average score, to 1 decimal point
 */
export const calculateAverageScore = scores => {
  if (!Array.isArray(scores)) {
    throw new Error('`scores` parameter must be an array');
  }

  if (scores.length === 0) {
    return null;
  }

  const average = scores.reduce((a, v) => a + v, 0) / scores.length;
  return Math.round(average * 10) / 10;
};
