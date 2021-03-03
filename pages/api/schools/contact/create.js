import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.role === 'ADMIN') {
    // Collect name, email, year, school_id and phone of school contact
    const { name, email, year, phone, schoolID } = req.body;

    // If name, email and schoolID exist
    if (name && email && schoolID) {
      // Create new school contact
      const contact = await prisma.contact.create({
        data: {
          school_id: schoolID,
          year: year,
          name: name,
          email: email,
          phone: phone,
        },
      });

      // If school contact creation is successful, return conact
      if (contact) {
        res.send(contact);
      }
      // Else, return server error
      else {
        res.status(500).end();
      }
    }
  }

  // Return unauthorized for all other requests
  res.status(401).end();
};
