import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.isAdmin) {
    // Collect name of school
    const { name: name, email: email, year: year, phone: phone, school_id: school_id } = req.body;

    // If name exist
    if (name && email && year && school_id) {
      // Create new school contact
      const contact = await prisma.contact.create({
        data: {
          school_id: parseInt(school_id),
          year: parseInt(year),
          name: name,
          email: email,
          phone: phone,
        },
      });

      // If school contact creation is successful, return conact
      if (contact) res.send(contact);
      // Else, return server error
      else res.status(500).end();
    }
  }

  // Return unauthorized for all other requests
  res.status(401).end();
};
