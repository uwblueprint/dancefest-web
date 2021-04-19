import axios from 'axios'; // Axios requests
import Layout from '@components/Layout'; // Layout wrapper
import Loader from 'react-loader-spinner'; // Spinning loader
import { useState, useEffect } from 'react';
import Event from '@containers/Event'; // State management

import NewEventModal from '@components/events/NewEventModal'; // New Event
import EditEventModal from '@components/events/EditEventModal'; // Edit Event
import { getSession } from 'next-auth/client'; // Session handling
import { EventCard } from '@components/Card'; // Event card component
import styles from '@styles/pages/Events.module.scss'; // Page styling
import Button from '@components/Button'; // Button components
import Title from '@components/Title'; // Title
import DancerRedJump from '@assets/dancer-red-jump.svg'; // Jumping Dancer SVG
import DancerRedTall from '@assets/dancer-red-tall.svg'; // Tall Dancer SVG

// Modal content states enum
const modalStates = Object.freeze({
  newEvent: 0,
  editEvent: 1,
});

// Page: Events
export default function Events({ session }) {
  const [, setEvent] = Event.useContainer();

  const [events, setEvents] = useState([]); // Available events
  const [loading, setLoading] = useState(true); // Loading state
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [eventToEdit, setEventToEdit] = useState(null); // Event to edit index
  const [modalContent, setModalContent] = useState(null); // Model content state
  const [judgeOptions, setJudgeOptions] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(false); // Disable submit button if inputs are invalid

  /**
   * Renders model content based on modalContent
   */
  const renderModalContent = () => {
    switch (modalContent) {
      // If modal is opened to create a new event
      case modalStates.newEvent:
        // Return:
        return (
          // NewEventModal component
          <NewEventModal
            judgeOptions={judgeOptions}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            reloadEvents={getAllEvents}
            disableSubmit={disableSubmit}
            setDisableSubmit={setDisableSubmit}
          />
        );
      // Else, if modal is opened to edit an event
      case modalStates.editEvent:
        // Return:
        return (
          // EditEventModal component
          <EditEventModal
            judgeOptions={judgeOptions}
            event={events[eventToEdit]}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            reloadEvents={getAllEvents}
            disableSubmit={disableSubmit}
            setDisableSubmit={setDisableSubmit}
          />
        );
    }
  };

  /**
   * Opens new event modal
   */
  const modalNewEvent = () => {
    setModalContent(modalStates.newEvent); // Set modal content
    setModalOpen(true); // Open modal
  };

  /**
   * Opens edit event modal
   * @param {Number} i index for event to edit
   */
  const modalEditEvent = i => {
    setModalContent(modalStates.editEvent); // Set modal content
    setModalOpen(true); // Open modal
    setEventToEdit(i); // Set index of event to edit
  };

  /**
   * Collect all events
   */
  const getAllEvents = async () => {
    setLoading(true); // Toggle loading

    // Collect and set events from endpoint
    const response = await axios.get('/api/events/collect');
    const events = response.data;
    setEvents(events);

    setLoading(false); // Toggle loading
  };

  const getJudges = async () => {
    setLoading(true);

    const response = await axios({
      method: 'GET',
      url: `/api/user/collect?role=JUDGE`,
    });
    const judgesData = response.data;
    setJudgeOptions([
      { label: 'None', value: null },
      ...judgesData.map(({ email }) => ({
        label: email,
        value: email,
      })),
    ]);

    setLoading(false);
  };

  // On page load, get all events
  useEffect(() => {
    setEvent(null);

    getAllEvents();
    getJudges();
  }, []);

  // TESTING: send feedback
  const sendFeedback = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/feedback',
        data: {
          eventID: 1,
          schoolIDs: [1, 2, 3],
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className={styles.page__events}>
        {/* Events page header */}
        <div className={styles.page__events_header}>
          <Title>Events</Title>
          {/* If user is admin, enable event creation */}
          {session.role === 'ADMIN' ? <Button onClick={modalNewEvent}>Add Event</Button> : null}
        </div>
        <button onClick={sendFeedback}>send feedback</button>

        {/* Events page events list */}
        <div className={styles.page__events_list}>
          {!loading ? (
            // If loading all events is completed
            events.length > 0 ? (
              // And length of events array > 0
              <div className={styles.page__events_list_grid}>
                {events.map((event, i) => {
                  // Loop through all events and return event card
                  return (
                    <EventCard
                      event={event}
                      key={i}
                      isAdmin={session.role === 'ADMIN'}
                      openEditModal={() => modalEditEvent(i)}
                    />
                  );
                })}
              </div>
            ) : (
              // Else, if length of events array !> 0, return empty
              <div className={styles.page__events_list_empty_parent}>
                {session.role === 'ADMIN' ? (
                  // Enable creation of new event if admin
                  <div className={styles.page__events_list_empty}>
                    <img src={DancerRedTall} />
                    <div>
                      <h2>No Events Listed</h2>
                      <h3>Create your first event</h3>
                      <Button onClick={modalNewEvent}>Add Event</Button>
                    </div>
                    <img src={DancerRedJump} />
                  </div>
                ) : (
                  <div className={styles.page__events_list_empty}>
                    <h2>No Events Listed</h2>
                  </div>
                )}
              </div>
            )
          ) : (
            // All else, if still loading, display loader
            <div className={styles.page__events_list_loading}>
              <Loader type="Oval" color="#c90c0f" height={80} width={80} />
            </div>
          )}
        </div>
      </div>

      {/* Events modal */}
      {renderModalContent()}
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

  // Else, return
  return {
    props: {
      session,
    },
  };
}
