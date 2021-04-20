import { getSession } from 'next-auth/client'; // Session
import { getPerformances } from '@pages/api/performances/collect'; // Get performances
import { generateFeedbackCSV } from '@utils/feedback'; // Generate Feedback CSV

/**
 * Download Feedback CSV for a given school
 */
export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const { eventID, schoolID } = req.query;

  if (!eventID || !schoolID) {
    return res.status(400).json({
      error: 'eventID or schoolID was not provided',
    });
  }

  const performances = await getPerformances({
    school_id: parseInt(schoolID),
    event_id: parseInt(eventID),
  });

  if (!performances || performances.length === 0) {
    return res.status(400).json({ error: 'Could not find any performances' });
  }

  const csv = generateFeedbackCSV(performances);

  return res.status(200).send(csv);
};
