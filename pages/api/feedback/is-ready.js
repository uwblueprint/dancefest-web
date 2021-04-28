import { getSession } from 'next-auth/client'; // Session handling
import { getPerformances } from '@pages/api/performances/collect'; // Get performances

/**
 * Get a JSON mapping school ids to whether the school is ready to receive feedback
 * (all performances submitted by the school have been fully adjudicated)
 */
export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  //TODO: if it is required, I think it should be request body?
  const { eventID } = req.query;

  // If not authenticated
  if (!session) {
    return res.status(401).send('Unauthorized');
  }

  if (!eventID) {
    return res.status(400).json({
      error: 'eventID not provided',
    });
  }

  const performances = await getPerformances({
    event_id: parseInt(eventID),
  });

  if (!performances) {
    return res
      .status(400)
      .json({ error: `Could not retrieve performances for event with id ${eventID}` });
  }

  const schoolsToFeedbackReady = {};
  for (const performance of performances) {
    const { school_id: schoolId, totalAdjudications, completedAdjudications } = performance;
    const adjudicationComplete = totalAdjudications === completedAdjudications;
    if (schoolId in schoolsToFeedbackReady) {
      schoolsToFeedbackReady[schoolId] = schoolsToFeedbackReady[schoolId] && adjudicationComplete;
    } else {
      schoolsToFeedbackReady[schoolId] = adjudicationComplete;
    }
  }

  return res.status(200).json(schoolsToFeedbackReady);
};
