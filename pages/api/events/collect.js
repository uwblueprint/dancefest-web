import prisma from "@prisma/index"; // Prisma client
import { getSession } from "next-auth/client"; // Session handling

export default async (req, res) => {
  // Collect session from request
  const session = await getSession({ req });

  // If session exists (thus, user is authenticated)
  if (session) {
    // Collect all events from database
    let events = await prisma.events.findMany();

    // Map over all events
    events = events.map((event) => ({
      ...event,
      // And parse the JSON field for judges (filtering for empty strings)
      judges: JSON.parse(event.judges).filter((judge) => judge !== ""),
    }));

    // If the authenticated user is an admin
    if (session.isAdmin) {
      // Send all events
      res.send(events);
    } else {
      // Else, filter over all events
      const authorizedEvents = events.filter((event) => {
        // For events where current user email is a judge
        if (event.judges.includes(session.user.email)) {
          return true;
        }
        return false;
      });

      // Send filtered events
      res.send(authorizedEvents);
    }
  }

  // Else, return 401 for all failures
  res.status(401);
};
