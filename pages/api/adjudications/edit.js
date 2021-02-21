import prisma from '@prisma/index'; // Prisma client
import { getSession } from 'next-auth/client'; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If authenticated and admin
  if (session && session.isAdmin) {
    // Collect params from request body
    const {
      id,
      artistic_mark,
      technical_mark,
      cumulative_mark,
      audio_url,
      notes,
      special_award,
      performance_id,
    } = req.body;

    // If all params exist
    if (id && artistic_mark && technical_mark && cumulative_mark && performance_id) {
      // Update adjudication
      const updatedAdjudication = await prisma.adjudication.update({
        // Where
        where: {
          // Id is passed
          id: id,
        },
        // With
        data: {
          artistic_mark: parseInt(artistic_mark),
          technical_mark: parseInt(technical_mark),
          cumulative_mark: parseInt(cumulative_mark),
          audio_url: audio_url,
          notes: notes,
          special_award: special_award,
          performance_id: parseInt(performance_id),
        },
      });

      // If adjudication updating is successful, return updated adjudication
      if (updatedAdjudication) res.send(updatedAdjudication);
      // Else, return server error
      else res.status(500).end();
    }
  }

  // Else, throw unauthenticated for all
  res.status(401).end();
};
