import Layout from '@components/Layout'; // Layout wrapper
import { getSession } from 'next-auth/client'; // Session handling

// Test components
import Button from '@components/Button';
import DatePicker from '@components/DatePicker';
import FilterDropdown from '@components/FilterDropdown';
import Input from '@components/Input';
import Modal from '@components/Modal';
import { useState } from 'react';

// Page: Settings
export default function Settings() {
  const [open, setOpen] = useState(false);

  return (
    <Layout>
      <h1>Design blocker: Settings</h1>
      <Button onClick={() => setOpen(!open)}>button</Button>
      <Button variant="outlined"> outlined</Button>
      <Button variant="edit" />
      <DatePicker />
      <FilterDropdown buttonText="dropdown" />
      <Input placeholder="input" icon={() => <img src="/vectors/calendar.svg" />} />
      <Modal open={open} setModalOpen={setOpen} title="Modal">
        modal content
      </Modal>
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
    props: {},
  };
}
