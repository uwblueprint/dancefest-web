import { useState, useEffect } from 'react'; // React
import axios from 'axios'; // axios
import { CSVLink } from 'react-csv'; // Link for downloading feedback preview
import Layout from '@components/Layout'; // Layout
import Title from '@components/Title'; // Title
import Button from '@components/Button'; // Button
import Table from '@components/Table'; // Table
import Checkbox from '@components/Checkbox'; // Checkbox
import Modal from '@components/Modal'; // Modal
import Event from '@containers/Event'; // Event state
import { formatSchools } from '@utils/schools'; // School formatting
import useSnackbar from '@utils/useSnackbar'; // Snackbar
import styles from '@styles/pages/Feedback.module.scss'; // Component styles

export default function Feedback() {
  const { snackbarError } = useSnackbar();
  const [event] = Event.useContainer();
  const eventName = event ? event.name : '';

  const [modalOpen, setModalOpen] = useState(false);
  const [schools, setSchools] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]); // List of school IDs that are currently selected
  const [csvData, setCsvData] = useState(''); // CSV data for feedback to download

  const schoolsWithFeedbackReady = schools.filter(school => school.feedbackReady);
  const selectedSchoolsSet = new Set(selectedSchools);
  const allSchoolsSelected =
    selectedSchools.length > 0 &&
    schoolsWithFeedbackReady.every(school => selectedSchoolsSet.has(school.id));
  const canSendFeedback = schools.some(school => school.feedbackReady);

  // Get schools
  const getSchools = async () => {
    try {
      const schoolsResponse = await axios({
        method: 'get',
        url: `/api/schools/collect?eventID=${event.id}`,
      });
      const schoolsData = [...schoolsResponse.data];

      const schoolsFeedbackReadyResponse = await axios({
        method: 'get',
        url: `/api/feedback/is-ready?eventID=${event.id}`,
      });

      const schoolsReadyForFeedbackMap = schoolsFeedbackReadyResponse.data;
      schoolsData.forEach(school => {
        school.feedbackReady = schoolsReadyForFeedbackMap[school.id] || false;
      });

      setSchools(formatSchools(schoolsData));
    } catch (err) {
      snackbarError(err);
    }
  };

  useEffect(() => {
    getSchools();
  }, []);

  // Render checkbox for each school
  const renderCheckbox = ({
    row: {
      original: { id, feedbackReady },
    },
  }) => {
    const handleSelectSchool = checked => {
      setSelectedSchools(
        checked ? selectedSchools.filter(schoolId => schoolId !== id) : [...selectedSchools, id]
      );
    };
    return (
      <Checkbox
        checked={selectedSchoolsSet.has(id)}
        disabled={!feedbackReady}
        onToggle={handleSelectSchool}
      />
    );
  };

  // Select all schools
  const selectAllSchools = checked => {
    setSelectedSchools(checked ? [] : schoolsWithFeedbackReady.map(school => school.id));
  };

  // Send feedback
  const sendFeedback = async () => {
    try {
      await axios({
        method: 'POST',
        url: '/api/feedback',
        data: {
          // TODO: Replace with dynamic values
          eventID: 1,
          schoolIDs: [1, 2, 3],
        },
      });
    } catch (err) {
      snackbarError(err);
    }
  };

  // Download feedback preview
  const downloadFeedbackPreview = async schoolId => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/api/feedback/download?eventID=${event.id}&schoolID=${schoolId}`,
      });

      setCsvData(response.data);
    } catch (err) {
      snackbarError(err);
    }
  };

  // Handle modal submit
  const handleModalSubmit = () => {
    sendFeedback();
    setModalOpen(false);
  };

  return (
    <Layout>
      <div className={styles.feedback}>
        <h2 className={styles.feedback__eventName}>{eventName}</h2>
        <div className={styles.feedback__title_wrapper}>
          <Title className={styles.feedback__title}>Share Feedback</Title>
          <Button variant="warning" disabled={!canSendFeedback} onClick={() => setModalOpen(true)}>
            Send Feedback
          </Button>
          <p>{canSendFeedback ? 'Feedback is available' : 'No available feedback to send'}</p>
        </div>
        <Table
          columns={[
            {
              Header: (
                <Checkbox
                  checked={allSchoolsSelected}
                  disabled={schoolsWithFeedbackReady.length === 0}
                  onToggle={selectAllSchools}
                />
              ),
              accessor: 'select',
              Cell: renderCheckbox,
              disableSortBy: true,
            },
            { Header: 'School', accessor: 'schoolName' },
            { Header: 'Contact email', accessor: 'email' },
            {
              Header: 'Feedback',
              accessor: 'preview',
              // eslint-disable-next-line react/display-name
              Cell: ({
                row: {
                  original: { id },
                },
              }) => (
                <CSVLink
                  className={styles.previewLink}
                  data={csvData}
                  asyncOnClick={true}
                  onClick={async (_, done) => {
                    await downloadFeedbackPreview(id);
                    done();
                  }}
                >
                  Preview
                </CSVLink>
              ),
            },
          ]}
          data={schools}
          filters={[]}
          paginate={false}
          clickable={false}
          initialSort={[{ id: 'schoolName' }, { id: 'feedbackReady' }]}
        />
      </div>
      <Modal
        containerClassName={styles.confirmationModal}
        open={modalOpen}
        title="Send Feedback?"
        submitText="Confirm"
        cancelText="Cancel"
        onSubmit={handleModalSubmit}
        onCancel={() => setModalOpen(false)}
      >
        <p>This action cannot be undone.</p>
      </Modal>
    </Layout>
  );
}
