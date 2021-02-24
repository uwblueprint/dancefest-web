import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If authenticated and admin
  if (session && session.isAdmin) {
    // Collect id of setting to delete
    const { id } = req.body;

    // If id exists
    if (id) {
      // Delete event and its associated contacts with school id
      const deletedContacts = prisma.contact.deleteMany({
        where: {
          school_id: id,
        },
      });
      const deletedSchool = prisma.school.delete({
        // With
        where: {
          // Specified id
          id: id,
        },
      });
      const [deletedContactsResult, deletedSchoolResult] = await prisma.$transaction([
        deletedContacts,
        deletedSchool,
      ]);
      if (deletedContactsResult && deletedSchoolResult) {
        // Return deleted school
        res.send(deletedSchoolResult);
      } else {
        // internal server error
        res.status(500).end();
      }
    }
  }
  // Else, throw unauthenticated
  res.status(401).end();
};
