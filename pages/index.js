import axios from 'axios'; // Axios requests
import Layout from '@components/Layout'; // Layout wrapper
import Loader from 'react-loader-spinner'; // Spinning loader
import DatePicker from 'react-datepicker'; // Date picker
import { useState, useEffect } from 'react'; // State management
import { ModalView } from '@components/Modal'; // Modal component
import { getSession } from 'next-auth/client'; // Session handling
import { EventCard } from '@components/Cards'; // Event card component
import { TextInput } from '@components/Inputs'; // Text input component
import styles from '@styles/pages/Events.module.scss'; // Page styling
import { FilledButton, UnfilledButton } from '@components/Buttons'; // Button components

// Modal content states enum
const modalStates = Object.freeze({
  newEvent: 0,
  editEvent: 1,
});

// Page: Events
export default function Events({ session }) {
  const [events, setEvents] = useState([]); // Available events
  const [loading, setLoading] = useState(false); // Loading state
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [eventToEdit, setEventToEdit] = useState(null); // Event to edit index
  const [modalContent, setModalContent] = useState(null); // Model content state

  /**
   * Renders model content based on modalContent
   */
  const renderModalContent = () => {
    switch (modalContent) {
      // If modal is opened to create a new event
      case modalStates.newEvent:
        // Return:
        return (
          // NewEvent component
          <NewEvent setModalOpen={setModalOpen} reloadEvents={getAllEvents} />
        );
      // Else, if modal is opened to edit an event
      case modalStates.editEvent:
        // Return:
        return (
          // EditEvent component
          <EditEvent
            event={events[eventToEdit]}
            setModalOpen={setModalOpen}
            reloadEvents={getAllEvents}
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

  // On page load, get all events
  useEffect(getAllEvents, []);

  return (
    <Layout>
      <div className={styles.page__events}>
        {/* Events page header */}
        <div className={styles.page__events_header}>
          <h1>Events</h1>

          {/* If user is admin, enable event creation */}
          {session.isAdmin ? <FilledButton onClick={modalNewEvent}>Add Event</FilledButton> : null}
        </div>

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
                      isAdmin={session.isAdmin}
                      openEditModal={() => modalEditEvent(i)}
                    />
                  );
                })}
              </div>
            ) : (
              // Else, if length of events array !> 0, return empty
              <div className={styles.page__events_list_empty}>
                <h2>No Events Listed</h2>

                {session.isAdmin ? (
                  // Enable creation of new event if admin
                  <>
                    <h3>Create your first event</h3>
                    <FilledButton onClick={modalNewEvent}>Add Event</FilledButton>
                  </>
                ) : null}
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
      <ModalView isOpen={modalOpen} setIsOpen={setModalOpen}>
        {renderModalContent()}
      </ModalView>
    </Layout>
  );
}

/**
 * New Event modal content
 * @param {Function} setModalOpen to toggle modal state
 * @param {Function} reloadEvents to reload all events
 * @returns {HTMLElement} of modal content
 */
function NewEvent({ setModalOpen, reloadEvents }) {
  const [title, setTitle] = useState(''); // Event title
  const [date, setDate] = useState(new Date()); // Event date
  const [judges, setJudges] = useState(['', '', '']); // Event judges

  /**
   * Submits new event creation
   */
  const submitEvent = async () => {
    // Post /api/events/create
    await axios.post('/api/events/create', {
      // With required data
      title,
      date,
      judges,
    });

    reloadEvents(); // Begin reloading all events in background
    setModalOpen(false); // Close modal
  };

  /**
   * Updates judge email at index
   * @param {Number} index of judge to update
   * @param {String} email new email to update
   */
  const updateJudge = (index, email) => {
    const tempJudges = judges; // Collect judges
    tempJudges[index] = email; // Edit email of judge at index
    setJudges([...tempJudges]); // Update judges
  };

  /**
   * Adds empty judge to judges array to render input
   */
  const addJudge = () => {
    // Judges + ""
    setJudges([...judges, '']);
  };

  return (
    <div>
      <h1>Create Event</h1>

      {/* Event title */}
      <TextInput
        type="text"
        placeholder="Event title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />

      {/* Event date */}
      <DatePicker selected={date} onChange={date => setDate(date)} />

      {/* Event judges */}
      {judges.map((judge, i) => {
        // For each judge in array of judges
        return (
          // Return text input to edit judge
          <TextInput
            type="text"
            placeholder="email placeholder"
            value={judge}
            onChange={e => updateJudge(i, e.target.value)}
            fullWidth
            key={i}
          />
        );
      })}

      {/* Add judge button (increment array) */}
      <FilledButton onClick={addJudge} fullWidth>
        Add Judge
      </FilledButton>

      {/* Create event button */}
      <FilledButton onClick={submitEvent} fullWidth>
        Create event
      </FilledButton>
    </div>
  );
}

/**
 * Edit Event modal content
 * @param {Object} event containing details about event being edited
 * @param {Function} setModalOpen to toggle modal state
 * @param {Function} reloadEvents to reload all events
 * @returns {HTMLElement} of modal content
 */
function EditEvent({ event, setModalOpen, reloadEvents }) {
  const [title, setTitle] = useState(event.name); // Event title
  const [judges, setJudges] = useState(event.judges); // Event judges
  const [date, setDate] = useState(new Date(event.event_date)); // Event date

  /**
   * Edits event
   */
  const editEvent = async () => {
    // Post /api/events/edit
    await axios.post('/api/events/edit', {
      // With id of event to edit
      id: event.id,
      // And data to patch
      title,
      date,
      judges,
    });

    reloadEvents(); // Begin reloading events in background
    setModalOpen(false); // Close modal
  };

  /**
   * Deletes event
   */
  const removeEvent = async () => {
    // Post /api/events/delete endpoint
    await axios.post('/api/events/delete', {
      // With id of event to delete
      id: event.id,
    });

    reloadEvents(); // Begin reloading events in background
    setModalOpen(false); // Close modal
  };

  /**
   * Updates judge email at index
   * @param {Number} index of judge to update
   * @param {String} email new email to update
   */
  const updateJudge = (index, email) => {
    const tempJudges = judges; // Collect judges
    tempJudges[index] = email; // Edit email of judge at index
    setJudges([...tempJudges]); // Update judges
  };

  /**
   * Adds empty judge to judges array to render input
   */
  const addJudge = () => {
    // Judges + ""
    setJudges([...judges, '']);
  };

  return (
    <div>
      <h1>Edit Event</h1>

      {/* Remove event button */}
      <UnfilledButton onClick={removeEvent} fullWidth>
        Remove Event
      </UnfilledButton>

      {/* Event title input */}
      <TextInput
        type="text"
        placeholder="Event title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />

      {/* Event date input */}
      <DatePicker selected={date} onChange={date => setDate(date)} />

      {judges.map((judge, i) => {
        // For all judges in judges array
        return (
          // Render input field to edit judge email
          <TextInput
            type="text"
            placeholder="email placeholder"
            value={judge}
            onChange={e => updateJudge(i, e.target.value)}
            fullWidth
            key={i}
          />
        );
      })}

      {/* Add judge button */}
      <FilledButton onClick={addJudge} fullWidth>
        Add Judge
      </FilledButton>

      {/* Save button */}
      <FilledButton onClick={editEvent} fullWidth>
        Save Edits
      </FilledButton>
    </div>
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
