import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If not authenticated or is not an admin
  if (!session) {
    return res.status(401).end();
  }

  // Collect performance information from request body
  const {
    id,
    name,
    academicLevel,
    performers,
    choreographers,
    competitionLevel,
    danceSize,
    danceEntry,
    danceStyle,
    danceTitle,
    eventID,
    schoolID,
  } = req.body;

  if (!id) {
    return res.status(400).json({
      error: 'Required performance id not provided',
    });
  }
  console.log(danceTitle);

  const editData = {};
  if (name) editData.name = name;
  if (academicLevel) editData.academic_level = academicLevel;
  if (performers) editData.performers = performers;
  if (choreographers) editData.choreographers = choreographers;
  if (competitionLevel) editData.competition_level = competitionLevel;
  if (danceSize) editData.dance_size = danceSize;
  if (danceEntry) editData.dance_entry = danceEntry;
  if (danceStyle) editData.dance_style = danceStyle;
  if (danceTitle) editData.dance_title = danceTitle;
  if (eventID) editData.event_id = eventID;
  if (schoolID) editData.school_id = schoolID;

  console.log(editData);

  const updatedPerformance = await prisma.performance.update({
    where: {
      id,
    },
    data: editData,
  });

  if (updatedPerformance) {
    return res.status(200).json(updatedPerformance);
  } else {
    return res.status(400).json({
      error: 'Performance was unable to be created',
    });
  }
};
