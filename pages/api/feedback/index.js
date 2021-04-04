import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling
import { getPerformances } from '@pages/api/performances/collect';
import { transporter } from 'aws/index';
import { json2csvParser } from 'utils/csvParser';

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  let { eventID, schoolIDs } = req.query;

  if (!eventID) {
    return res.status(400).json({
      error: 'eventID was not provided',
    });
  }

  const event = await prisma.event.findUnique({
    where: {
      id: parseInt(eventID),
    },
  });

  // If schoolIDs are not provided, we want to get every school ID
  if (!schoolIDs || schoolIDs.length === 0) {
    const schoolsData = await prisma.school.findMany({
      select: {
        id: true,
      },
    });
    schoolIDs = schoolsData.map(school => school.id);
  }

  const schoolIdSet = new Set(schoolIDs);
  const performances = await getPerformances();

  // Create a map where key: schoolId, value: array of performances of that school
  const schoolToPerformancesMap = {};
  performances.forEach(performance => {
    if (schoolIdSet.has(performance.school_id)) {
      if (performances.school_id in schoolToPerformancesMap) {
        schoolToPerformancesMap[performance.school_id].push(performance);
      } else {
        schoolToPerformancesMap[performance.school_id] = [performance];
      }
    }
  });

  const mailerPromises = [];

  // Send email to each school
  for (const school in schoolToPerformancesMap) {
    const schoolPerformances = schoolToPerformancesMap[school];
    if (schoolPerformances && schoolPerformances.length > 0) {
      // TODO: Figure out which fields to remove before sending!
      const csv = json2csvParser.parse(schoolPerformances);
      const mailData = {
        from: process.env.FEEDBACK_EMAIL_FROM,
        //TODO: switch back
        to: 'ericfeng610@gmail.com',
        // to: schoolPerformances[0].school.email,
        subject: `Automated Feedback from Dancefest Event`,
        html: `<p>Hi ${
          schoolPerformances[0].school.contact_name
            ? schoolPerformances[0].school.contact_name
            : schoolPerformances[0].school.school_name
        },</p>
              <p>Thank you for your participation in ${event.name}!</p>
              <p>Attached you will find a summary of the scores and awards won by all performances from your school. Audio feedback from the judges is also included. Feel free to share this feedback with other contacts and/or performers from your school as you see fit.</p>
              <p>If you have any questions regarding the feedback, do not reply to this email as it is automatically generated and the inbox is not monitored. Instead, please contact Ontario Secondary School Dancefest directly.</p>
              <p>We hope you enjoyed ${
                event.name
              } and we look forward to seeing you again at future events!</p>`,
        attachments: [
          {
            filename: `${schoolPerformances[0].school.school_name}-feedback.csv`,
            content: csv,
          },
        ],
      };

        // Send all performance data for the school
        mailerPromises.push(transporter.sendMail(mailData));
      }
    }

    await Promise.all(mailerPromises).catch(() => {
      return res.status(400).json({ error: 'Could not send email.' });
    });

    // When all emails are sent successfully
    return res.status(200).json({ message: 'Successfully shared feedback with all schools.' });
  }

  // Else, return 401 for all failures
  return res.status(401).send('Unauthorized');
};
