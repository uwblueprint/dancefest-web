import { json2csvParser } from '@utils/csvParser'; // CSV parser

/**
 * Generates the CSV content containing feedback for performances submitted by a school
 * @param {Performance[]} performances - Performances to include in the feedback
 * @returns {CSV} - CSV string
 */
export function generateFeedbackCSV(performances) {
  return json2csvParser.parse(performances);
}
