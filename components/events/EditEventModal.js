import { useState, useEffect } from 'react'; // React
import axios from 'axios'; // axios

import Modal from '@components/Modal'; // Modal
import DatePicker from '@components/DatePicker'; // Date picker
import Button from '@components/Button'; // Button
import Input from '@components/Input'; // Input
import Dropdown from '@components/Dropdown'; // Dropdown
import useSnackbar from '@utils/useSnackbar'; // Snackbar

import styles from '@styles/components/events/EventModal.module.scss'; // Component styles

/**
 * Edit Event modal content
 * @param {Object} event containing details about event being edited
 * @param {Object[]} judgeOptions - List of judge options to render in each judge dropdown
 * @param {Boolean} modalOpen - Whether the modal is open
 * @param {Function} setModalOpen to toggle modal state
 * @param {Function} reloadEvents to reload all events
 * @param {Boolean} disableSubmit specifying whether the the submit button is disabled
 * @param {Function} setDisableSubmit to disable submit button
 * @returns {HTMLElement} of modal content
 */
export default function EditEventModal({
  event,
  judgeOptions,
  modalOpen,
  setModalOpen,
  reloadEvents,
  disableSubmit,
  setDisableSubmit,
}) {
  const { snackbarError } = useSnackbar();

  const [title, setTitle] = useState(event.name); // Event title
  const [judges, setJudges] = useState(event.judges.map(email => ({ label: email, value: email }))); // Event judges
  const [date, setDate] = useState(new Date(event.event_date)); // Event date
  const [loading, setLoading] = useState(false);

  /**
   * Edits event
   */
  const editEvent = async () => {
    setLoading(true);

    try {
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
    } catch (err) {
      snackbarError(err);
    }

    setLoading(false);
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
    setJudges([...judges, '']);
  };

  useEffect(() => {
    const canSubmit = title !== '' && !!date && judges.length > 0 && judges.some(judge => !!judge);

    setDisableSubmit(!canSubmit);
  }, [title, date, judges]);

  return (
    <Modal
      containerClassName={styles.modal__container}
      title="Edit Event"
      open={modalOpen}
      cancelText="Cancel"
      submit="Save Edits"
      onCancel={() => setModalOpen(false)}
      onSubmit={editEvent}
      setModalOpen={setModalOpen}
      disableSubmitButton={disableSubmit || loading}
    >
      <div className={styles.modal__children_wrapper}>
        <div className={styles.modal__children}>
          {/* Event title */}
          <div>
            <h3>EVENT TITLE</h3>
            <Input
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
      </div>
    </Modal>
  );
}
