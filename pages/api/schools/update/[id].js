import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // Collect name, email and role
    const { id } = req.query;
    const { schoolName, contactName, contactEmail, phoneNumber } = req.body;

    // If email exists
    if (id && schoolName && contactName && contactEmail && phoneNumber) {
      // School update
      const school = await prisma.school.update({
        where: {
          id: parseInt(id),
        },
        data: {
          school_name: schoolName,
          contact_name: contactName,
          email: contactEmail,
          phone: phoneNumber,
        },
      });

      // If school updated send it back
      if (school) {
        return res.json(school);
      }
      // Else, return server error
      else {
        return res.status(500).end();
      }
    }
  }
  // Return unauthorized for all other requests
  return res.status(401).send('Unauthorized');
};
