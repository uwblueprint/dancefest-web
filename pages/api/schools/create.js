import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling
import validator from 'validator';

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // Collect name of school
    const { schoolName, contactName, email, phone } = req.body;

    // If phone number is passed and the phone number is not valid
    if (phone && !validator.isMobilePhone(phone, ['en-CA'])) {
      return res.status(400).json({
        error: 'Provided phone number is invalid.',
      });
    }

    // If name exist
    if (schoolName && email) {
      // If the email is invalid
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          error: 'Provided email is invalid.',
        });
      }

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
