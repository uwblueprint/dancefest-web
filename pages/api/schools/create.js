import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // Collect name of school
    const { schoolName, contactName, email, phone } = req.body;

    // If name exist
    if (schoolName && email) {
      // Create new school
      const school = await prisma.school.create({
        data: {
          school_name: schoolName,
          contact_name: contactName,
          email: email,
          phone: phone,
        },
      });

      // If school creation is successful, return school
      if (school) {
        res.send(school);
      }
      // Else, return server error
      else {
        res.status(500).end();
      }
    }
  }

  // Return unauthorized for all other requests
  res.status(401).send('Unauthorized');
};
