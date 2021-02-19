import prisma from "@prisma/index"; // Prisma client
import { getSession } from "next-auth/client"; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session exists (thus, user is authenticated)
  if (session) {
    // Collect eventID from URL query
    const { id: eventID } = req.query;

    // If eventID is provided
    if (eventID) {
      try {
        // Collect event with eventID
        let event = await getEventByID(eventID);

        // Parse and filter event judges
        event.judges = JSON.parse(event.judges).filter((judge) => judge !== "");

        // If admin
        if (session.isAdmin) {
          // Send event immediately
          res.send(event);
        } else {
          // If array of judges includes current user
          if (event.judges.includes(session.user.email))
            // Send event
            res.send(event);
        }
      } catch (error) {
        res.status(401);
      }
    }
  }

  // Else, return 401 for all failures
  res.status(401).end();
};

// Select all fields but created/updated_at
const eventFieldSelection = {
  id: true,
  name: true,
  event_date: true,
  num_performances: true,
  judges: true,
};

export const getEventByID = async (id) => {
  // Collect event with eventID
  return await prisma.events.findUnique({
    where: {
      id: parseInt(id),
    },
    select: eventFieldSelection,
  });
};
