import { getSession } from 'next-auth/client'; // Session handling
import { getPerformances } from '@pages/api/performances/collect';
import { getSchools } from '@pages/api/schools/collect';
import { transporter } from 'aws/index';

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const { schoolIDs } = req.query;

    // Set filter to obtain schools with schoolIDs passed in. If schoolIDs is not passed in, we want to get all schools.
    const schoolFilter = schoolIDs ? { id: { in: schoolIDs.split(',').map(i => +i) } } : {};
    const schools = await getSchools(schoolFilter);

    // If no schools are returned from the filter
    if (schools.length === 0)
      return res.status(400).json({ error: 'No schools to email feedback to.' });

    // Filter for obtaining performances for the schools
    const performanceFilter = {
      school_id: {
        in: schools.map(school => school.id),
      },
    };

    // Obtain all performances matching the performanceFilter
    const performances = await getPerformances(performanceFilter);

    // Build a map where we can access all the performances of a school using the school id
    const performancesMap = {};
    performances.forEach(performance => {
      if (performance.school_id in performancesMap) {
        performancesMap[performance.school_id].push(performance);
      } else {
        performancesMap[performance.school_id] = [performance];
      }
    });

    // Send email for each school
    schools.forEach(school => {
      // if there are performances for the school and the school has a contact email
      if (school.id in performancesMap && 'contacts' in school && school.contacts.length > 0) {
        // Obtain the first contact email for the school
        const toEmail = school.contacts[0].email;
        // Send all performance data for the school
        transporter.sendMail(
          {
            from: process.env.FEEDBACK_EMAIL_FROM,
            to: toEmail,
            subject: `Feedback for ${school.name}`,
            //TODO: format the response with HTML
            text: JSON.stringify(performancesMap[school.id]),
          },
          err => {
            //TODO: Figure out what happens if one email fails when sending batch
            if (err) return res.status(400).json({ error: 'Could not send email.' });
          }
        );
      }
    });

    // When all emails are sent successfully
    res.status(200).json({ message: 'Successfully shared feedback with all schools.' });
  }

  // Else, return 401 for all failures
  res.status(401).end();
};
