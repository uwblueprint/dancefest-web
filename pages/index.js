import axios from 'axios'; // Axios requests
import Layout from '@components/Layout'; // Layout wrapper
import Loader from 'react-loader-spinner'; // Spinning loader
import { useState, useEffect } from 'react'; // State management

import DancefestModal from '@components/Modal'; // Modal component
import { getSession } from 'next-auth/client'; // Session handling
import { EventCard } from '@components/Card'; // Event card component
import TextInput from '@components/Input'; // Text input component
import styles from '@styles/pages/Events.module.scss'; // Page styling
import Button from '@components/Button'; // Button components
import Title from '@components/Title'; // Title
import Dropdown from '@components/Dropdown'; // Dropdown
import DancerRedJump from '@assets/dancer-red-jump.svg'; // Jumping Dancer SVG
import DancerRedTall from '@assets/dancer-red-tall.svg'; // Jumping Dancer SVG
import DatePicker from '@components/DatePicker';

// Modal content states enum
const modalStates = Object.freeze({
  newEvent: 0,
  editEvent: 1,
});

// Page: Events
export default function Events({ session }) {
  const [events, setEvents] = useState([]); // Available events
  const [loading, setLoading] = useState(true); // Loading state
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [eventToEdit, setEventToEdit] = useState(null); // Event to edit index
  const [modalContent, setModalContent] = useState(null); // Model content state
  const [modalTitle, setModalTitle] = useState('');
  const [judgeOptions, setJudgeOptions] = useState([]);

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
          <NewEvent
            judgeOptions={judgeOptions}
            setModalOpen={setModalOpen}
            reloadEvents={getAllEvents}
          />
        );
      // Else, if modal is opened to edit an event
      case modalStates.editEvent:
        // Return:
        return (
          // EditEvent component
          <EditEvent
            judgeOptions={judgeOptions}
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
    setModalTitle('New Event');
    setModalContent(modalStates.newEvent); // Set modal content
    setModalOpen(true); // Open modal
  };

  /**
   * Opens edit event modal
   * @param {Number} i index for event to edit
   */
  const modalEditEvent = i => {
    setModalTitle('Edit Event');
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
    getAllEvents();
    getJudges();
  }, []);

  return (
    <Layout>
      <div className={styles.page__events}>
        {/* Events page header */}
        <div className={styles.page__events_header}>
          <Title>Events</Title>
          {/* If user is admin, enable event creation */}
          {session.role === 'ADMIN' ? <Button onClick={modalNewEvent}>Add Event</Button> : null}
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
      <DancefestModal
        containerClassName={styles.modal__container}
        title={modalTitle}
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        {renderModalContent()}
      </DancefestModal>
    </Layout>
  );
}

/**
 * New Event modal content
 * @param {Object[]} judgeOptions - List of judge options to render in each judge dropdown
 * @param {Function} setModalOpen to toggle modal state
 * @param {Function} reloadEvents to reload all events
 * @returns {HTMLElement} of modal content
 */
function NewEvent({ judgeOptions, setModalOpen, reloadEvents }) {
  const [title, setTitle] = useState(''); // Event title
  const [date, setDate] = useState(new Date()); // Event date
  const [judges, setJudges] = useState([null, null, null]); // Event judges

  /**
   * Submits new event creation
   */
  const submitEvent = async () => {
    // Post /api/events/create
    await axios.post('/api/events/create', {
      // With required data
      title,
      date,
      judges: [...new Set(judges.filter(judge => !!judge).map(judge => judge.value))],
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
      <div className={styles.modal__children}>
        {/* Event title */}
        <div>
          <h3>EVENT TITLE</h3>
          <TextInput
            type="text"
            placeholder="Event title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
          />
        </div>

        {/* Event date */}
        <div>
          <h3>START DATE</h3>
          <DatePicker date={date} setDate={setDate} fullWidth />
        </div>

        {/* Event judges */}
        {judges.map((judge, i) => {
          // For each judge in array of judges
          return (
            // Return text input to edit judge
            <div key={i}>
              <h4>Judge {i + 1}</h4>
              <Dropdown
                key={i}
                wrapperClassName={styles.modal__judgeDropdown}
                placeholder={`Judge ${i + 1}`}
                options={judgeOptions}
                selected={judge}
                onChange={judge => updateJudge(i, judge)}
              />
            </div>
          );
        })}
        <Button variant="outlined" onClick={addJudge}>
          + Add Judge
        </Button>
      </div>
      <div className={styles.modal__footer}>
        {/* Add judge button (increment array) */}
        <Button variant="outlined" onClick={() => setModalOpen(false)}>
          Discard
        </Button>

        {/* Create event button */}
        <Button variant="contained" style={{ marginLeft: '32px' }} onClick={submitEvent}>
          Add Event
        </Button>
      </div>
    </div>
  );
}

/**
 * Edit Event modal content
 * @param {Object} event containing details about event being edited
 * @param {Object[]} judgeOptions - List of judge options to render in each judge dropdown
 * @param {Function} setModalOpen to toggle modal state
 * @param {Function} reloadEvents to reload all events
 * @returns {HTMLElement} of modal content
 */
function EditEvent({ event, judgeOptions, setModalOpen, reloadEvents }) {
  const [title, setTitle] = useState(event.name); // Event title
  const [judges, setJudges] = useState(event.judges.map(email => ({ label: email, value: email }))); // Event judges
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
      judges: [...new Set(judges.map(judge => judge.value).filter(judge => !!judge))],
    });

    reloadEvents(); // Begin reloading events in background
    setModalOpen(false); // Close modal
  };

  /**
   * Deletes event
   */
  // TODO: Add remove event button
  // const removeEvent = async () => {
  //   // Post /api/events/delete endpoint
  //   await axios.post('/api/events/delete', {
  //     // With id of event to delete
  //     id: event.id,
  //   });

  //   reloadEvents(); // Begin reloading events in background
  //   setModalOpen(false); // Close modal
  // };

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
    <div className={styles.modal__childrenWrapper}>
      <div className={styles.modal__children}>
        {/* Event title */}
        <div>
          <h3>EVENT TITLE</h3>
          <TextInput
            type="text"
            placeholder="Event title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
          />
        </div>

        {/* Event date */}
        <div>
          <h3>START DATE</h3>
          <DatePicker date={date} setDate={setDate} fullWidth />
        </div>

        {/* Event judges */}
        {judges.map((judge, i) => {
          // For each judge in array of judges
          return (
            // Return text input to edit judge
            <div key={i}>
              <h4>Judge {i + 1}</h4>
              <Dropdown
                key={i}
                wrapperClassName={styles.modal__judgeDropdown}
                placeholder={`Judge ${i + 1}`}
                options={judgeOptions}
                selected={judge}
                onChange={judge => updateJudge(i, judge)}
              />
            </div>
          );
        })}
        <Button variant="outlined" onClick={addJudge}>
          + Add Judge
        </Button>
      </div>
      <div className={styles.modal__footer}>
        {/* Add judge button (increment array) */}
        <Button variant="outlined" onClick={() => setModalOpen(false)}>
          Cancel
        </Button>

        {/* Create event button */}
        <Button variant="contained" style={{ marginLeft: '32px' }} onClick={editEvent}>
          Save Edits
        </Button>
      </div>
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
