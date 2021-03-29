/**
 * Formats a adjudication response from /api/adjudications/collect to a format that is easy to use
 * on the frontend. Converts all field names to camelCase
 * @param {Object} adjudication - Adjudication returned in the response
 * @returns {Object} Formatted adjudication
 */
export const formatAdjudication = ({
  artistic_mark: artisticScore,
  audio_url: audioUrl,
  cumulative_mark: cumulativeScore,
  performance_id: performanceId,
  technical_mark: technicalScore,
  user_id: userId,
  ...rest
}) => ({
  artisticScore,
  audioUrl,
  cumulativeScore,
  performanceId,
  technicalScore,
  userId,
  ...rest,
});
