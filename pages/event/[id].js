import Layout from '@components/Layout'; // Layout wrapper
import { getSession } from 'next-auth/client'; // Session handling
import { getEventByID } from 'pages/api/events/get'; // Back-end helper

// Page: Individual event
export default function Event({ event }) {
  return (
    <Layout>
      <h1>
        {event.id} - {event.name}
      </h1>
      <p>TODO</p>
    </Layout>
  );
}

// Run: server side
export async function getServerSideProps(context) {
  // Collect session
  const session = await getSession(context);

  // If session does not exist
  if (!session) {
    return {
      redirect: {
        // Redirect user to login page
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Collect eventID from URL params
  const { id: eventID } = context.params;

  // Check if event exists and user has access
  let event;

  // Collect event by ID
  event = await getEventByID(eventID);

  // If event does not exist
  if (!event) {
    return {
      redirect: {
        // Redirect user to events page
        destination: '/',
        permanent: false,
      },
    };
  }

  // Parse and filter event judges
  event.judges = JSON.parse(event.judges).filter(judge => judge !== '');

  // Check if user has access to event
  if (!session.isAdmin && !event.judges.includes(session.user.email)) {
    return {
      redirect: {
        // Redirect user to events page
        destination: '/',
        permanent: false,
      },
    };
  }

  // Serialize date
  event.event_date = event.event_date.toString();

  // Else:
  return {
    props: {
      // Return event data
      event,
    },
  };
}
