import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session exists (thus, user is authenticated)
  if (session && session.role === 'ADMIN') {
    const { role } = req.query;

    const filter = {};
    if (role) {
      filter.role = role;
    }

    // Collect users
    const users = await getUsers(filter);
    res.send(users);
  }

  // Else, return 401 for all failures
  res.status(401).end();
};

export const getUsers = async filter => {
  return await prisma.user.findMany({
    where: filter,
  });
};
