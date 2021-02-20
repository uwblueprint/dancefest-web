import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If user is authenticated and is an admin
  if (session && session.isAdmin) {
    // Collect data for new adjudication
    const { 
        artistic_mark, 
        technical_mark, 
        cumulative_mark,
        audio_url,
        notes,
        special_award,
        performance_id
    } = req.body;

    // If all exist 
    if (artistic_mark && technical_mark && cumulative_mark && audio_url && notes && special_award && performance_id) {
      // Create new adjudication
      const adjudication = await prisma.adjudication.create({
        data: {
          artistic_mark: parseInt(artistic_mark), 
          technical_mark: parseInt(technical_mark), 
          cumulative_mark: parseInt(cumulative_mark),
          audio_url: audio_url,
          notes: notes,
          special_award: special_award,
          performance_id: parseInt(performance_id)
        },
      });

      // If adjudication creation is successful, return adjudication
      if (adjudication) res.send(adjudication);
      // Else, return server error
      else res.status(500).end();
    }
  }

  // Return unauthorized for all other requests
  res.status(401).end();
};
