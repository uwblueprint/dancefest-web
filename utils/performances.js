/**
 * Formats performances response from /api/performances to a format that is easy to use with Table component
 * Removes unnecessary fields and converts all field names to camelCase
 * @param {Object[]} performances - Performances returned in the response
 * @returns {Object[]} Formatted performances
 */
export const formatPerformances = performances => {
  return performances.map(
    ({
      academic_level: academicLevel,
      choreographers,
      competition_level: performanceLevel,
      dance_entry: danceEntry,
      dance_size: danceSize,
      dance_style: danceStyle,
      dance_title: danceTitle,
      event_id: eventId,
      id,
      name,
      performers,
      school: { school_name: schoolName },
      school_id: schoolId,
    }) => ({
      academicLevel,
      choreographers,
      performanceLevel,
      danceEntry,
      danceSize,
      danceStyle,
      danceTitle,
      eventId,
      id,
      name,
      performers,
      schoolName,
      schoolId,
    })
  );
};
