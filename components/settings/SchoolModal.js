import React, { useState, useEffect } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import axios from 'axios'; // axios

import Modal from '@components/Modal'; // Modal
import Input from '@components/Input'; // Input
import styles from '@styles/components/settings/SchoolModal.module.scss'; // Component styles

export default function SchoolModal({
  setLoading,
  open,
  setOpen,
  getSchools,
  schoolToEdit = null,
  setSchoolToEdit,
}) {
  const [schoolName, setSchoolName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (schoolToEdit) {
      const { school_name, contact_name, email, phone } = schoolToEdit;
      setSchoolName(school_name);
      setContactName(contact_name);
      setContactEmail(email);
      setPhoneNumber(phone);
    }
  }, [schoolToEdit]);

  const updateSchool = async () => {
    setLoading(true);

    try {
      await axios({
        method: 'PUT',
        url: `/api/schools/update/${schoolToEdit.id}`,
        data: {
          schoolName,
          contactName,
          contactEmail,
          phoneNumber,
        },
      });

      await getSchools();
    } catch {
      // Empty catch block
    }

    setLoading(false);
    setSchoolToEdit(null);
    setOpen(false);
  };

  const addSchool = async () => {
    setLoading(true);

    try {
      await axios({
        method: 'POST',
        url: '/api/schools/create',
        data: {
          schoolName,
          contactName,
          email: contactEmail,
          phone: phoneNumber,
        },
      });

      await getSchools();
    } catch {
      // Empty catch block
    }

    setLoading(false);
    setOpen(false);
  };

  return (
    <Modal
      containerClassName={styles.schoolModal__container}
      title={schoolToEdit ? 'Edit School' : 'Add School'}
      open={open}
      cancelText="Discard"
      submitText={schoolToEdit ? 'Edit School' : 'Add School'}
      setModalOpen={setOpen}
      onCancel={() => setOpen(false)}
      onSubmit={schoolToEdit ? updateSchool : addSchool}
      disableSubmitButton={!schoolName || !contactName || !contactEmail || !phoneNumber}
    >
      <div className={styles.schoolModal}>
        <div>
          <h2>School Name</h2>
          <Input
            placeholder="School Name"
            value={schoolName}
            onChange={event => setSchoolName(event.target.value)}
          />
        </div>
        <div>
          <h2>Contact Name</h2>
          <Input
            placeholder="Contact Name"
            value={contactName}
            onChange={event => setContactName(event.target.value)}
          />
        </div>
        <div>
          <h2>Contact Email</h2>
          <Input
            placeholder="Contact Email"
            value={contactEmail}
            onChange={event => setContactEmail(event.target.value)}
          />
        </div>
        <div>
          <h2>Phone Number</h2>
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={event => setPhoneNumber(event.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}

SchoolModal.propTypes = {
  getSchools: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};
