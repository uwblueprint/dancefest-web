/**
 * Formats performances response from /api/performances/collect to a format that is easy to use with Table component
 * in the Entry View. Converts all field names to camelCase
 * @param {Object[]} performances - Performances returned in the response
 * @returns {Object[]} Formatted performances
 */
export const formatPerformances = performances => {
  return performances.map(
    ({
      academic_level: academicLevel,
      competition_level: performanceLevel,
      dance_entry: danceEntry,
      dance_size: danceSize,
      dance_style: danceStyle,
      dance_title: danceTitle,
      event_id: eventId,
      school: { school_name: schoolName },
      school_id: schoolId,
      artisticMark: artisticScore,
      technicalMark: technicalScore,
      cumulativeMark: cumulativeScore,
      ...rest
    }) => ({
      academicLevel,
      performanceLevel,
      danceEntry,
      danceSize,
      danceStyle,
      danceTitle,
      eventId,
      name,
      schoolName,
      schoolId,
      artisticScore,
      technicalScore,
      cumulativeScore,
      ...rest,
    })
  );
};
