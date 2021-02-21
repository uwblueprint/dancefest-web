import { getSession } from 'next-auth/client'; // Session handling
import { getPerformances } from '../performances/collect';
import { getSchools } from '../schools/collect';

//TODO should this be in a different file and exported in?
const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01',
  }),
});

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    let schools = await getSchools();
    if (!schools.length) return res.status(400).json({ error: 'No schools to email feedback.' });

    let filter = {
      school_id: {
        in: schools.map(school => school.id),
      },
    };

    let performances = await getPerformances(filter);

    // Build a map where we can access all the performances of a school using the school id
    let performancesMap = {};
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
      if (school.id in performancesMap && 'contacts' in school && !school.contacts.length) {
        // Obtain the first contact email for the school
        const toEmail = school.contacts[0].email;

        // Send all performance data for the school
        transporter.sendMail(
          {
            from: 'info@dancefest.dev',
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

    res.status(200).json({ message: 'Successfully shared feedback with all schools.' });
  }

  // Else, return 401 for all failures
  res.status(401).end();
};
