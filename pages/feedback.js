import { useState, useEffect } from 'react'; // React
import axios from 'axios'; // axios
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

  const selectedSchoolsSet = new Set(selectedSchools);
  const allSchoolsSelected = schools.every(school => selectedSchoolsSet.has(school.id));

  // Get schools
  const getSchools = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `/api/schools/collect?eventID=${event.id}`,
      });

      setSchools(formatSchools(response.data));
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
      original: { id },
    },
  }) => {
    const handleSelectSchool = checked => {
      setSelectedSchools(
        checked ? selectedSchools.filter(schoolId => schoolId !== id) : [...selectedSchools, id]
      );
    };
    return <Checkbox checked={selectedSchoolsSet.has(id)} onToggle={handleSelectSchool} />;
  };

  // Select all schools
  const selectAllSchools = checked => {
    setSelectedSchools(checked ? [] : schools.map(school => school.id));
  };

  return (
    <Layout>
      <div className={styles.feedback}>
        <h2 className={styles.feedback__eventName}>{eventName}</h2>
        <div className={styles.feedback__title_wrapper}>
          <Title className={styles.feedback__title}>Share Feedback</Title>
          <Button variant="warning" onClick={() => setModalOpen(true)}>
            Send Feedback
          </Button>
        </div>
        <Table
          columns={[
            {
              Header: <Checkbox checked={allSchoolsSelected} onToggle={selectAllSchools} />,
              accessor: 'select',
              Cell: renderCheckbox,
              disableSortBy: true,
            },
            { Header: 'School', accessor: 'schoolName' },
            { Header: 'Contact email', accessor: 'email' },
            {
              Header: '',
              accessor: 'preview',
              Cell: <a className={styles.previewLink}>Preview</a>,
            },
          ]}
          data={schools}
          filters={[]}
          paginate={false}
          clickable={false}
        />
      </div>
      <Modal
        containerClassName={styles.confirmationModal}
        open={modalOpen}
        title="Send Feedback?"
        submitText="Confirm"
        cancelText="Cancel"
        onSubmit={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <p>This action cannot be undone.</p>
      </Modal>
    </Layout>
  );
}
