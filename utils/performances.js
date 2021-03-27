/**
 * Formats performances response from /api/performances/collect to a format that is easy to use with Table component
 * in the Entry View. Converts all field names to camelCase
 * @param {Object[]} performances - Performances returned in the response
 * @returns {Object[]} Formatted performances
 */
export const formatPerformances = performances => {
  return performances.map(
    ({
      competition_level: performanceLevel,
      dance_size: danceSize,
      dance_style: danceStyle,
      dance_title: danceTitle,
      event_id: eventId,
      school: { school_name: schoolName },
      school_id: schoolId,
      cumulativeScore,
      awards,
      ...rest
    }) => ({
      performanceLevel,
      danceSize,
      danceStyle,
      danceTitle,
      eventId,
      schoolName,
      schoolId,
      score: cumulativeScore,
      cumulativeScore,
      awardsString: awards.map(({ title }) => title).join(', '),
      ...rest,
    })
  );
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
