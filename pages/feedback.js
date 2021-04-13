import { useState } from 'react'; // React
import Layout from '@components/Layout'; // Layout
import Title from '@components/Title'; // Title
import Button from '@components/Button'; // Button
import Table from '@components/Table'; // Table
import Checkbox from '@components/Checkbox'; // Checkbox
import Modal from '@components/Modal'; // Modal
import Event from '@containers/Event'; // Event state
import styles from '@styles/pages/Feedback.module.scss'; // Component styles

const SAMPLE_DATA = [
  {
    schoolName: 'CCI',
    email: 'asdfasdf',
  },
  {
    schoolName: 'CCP',
    email: 'asdfasdfasdf',
  },
  {
    schoolName: 'CCN',
    email: 'asdfasdfasdfasdfasdf',
  },
];

export default function Feedback() {
  const [event] = Event.useContainer();
  const { name: eventName } = event;

  const [modalOpen, setModalOpen] = useState(false);

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
            { Header: <Checkbox />, accessor: 'select', Cell: <Checkbox /> },
            { Header: 'School', accessor: 'schoolName' },
            { Header: 'Contact email', accessor: 'email' },
            {
              Header: '',
              accessor: 'preview',
              Cell: <a className={styles.previewLink}>Preview</a>,
            },
          ]}
          data={SAMPLE_DATA}
          filters={[]}
          paginate={false}
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
