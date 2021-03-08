import React, { useState, useEffect } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import axios from 'axios'; // axios

import Modal from '@components/Modal'; // Modal
import Input from '@components/Input'; // Input
import styles from '@styles/components/settings/AdminModal.module.scss'; // Component styles

export default function AdminModal({
  setLoading,
  open,
  setOpen,
  getAdmins,
  adminToEdit = null,
  setAdminToEdit,
}) {
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  const clearFields = () => {
    setAdminName('');
    setAdminEmail('');
  };

  const updateAdmin = async () => {
    setLoading(true);

    try {
      await axios({
        method: 'PUT',
        url: `/api/user/update/${adminToEdit.id}`,
        data: {
          name: adminName,
          email: adminEmail,
        },
      });

      await getAdmins();
    } catch {
      // Empty catch block
    }

    setLoading(false);
    setAdminToEdit(null);
    setOpen(false);
  };

  const addAdmin = async () => {
    setLoading(true);

    try {
      await axios({
        method: 'POST',
        url: '/api/user/create',
        data: {
          name: adminName,
          email: adminEmail,
          role: 'ADMIN',
        },
      });

      await getAdmins();
    } catch {
      // Empty catch block
    }

    setLoading(false);
    setOpen(false);
  };

  useEffect(() => {
    if (adminToEdit) {
      const { name, email } = adminToEdit;
      setAdminName(name);
      setAdminEmail(email);
    } else {
      clearFields();
    }
  }, [adminToEdit]);

  return (
    <Modal
      containerClassName={styles.adminModal__container}
      title={adminToEdit ? 'Edit Admin' : 'Add Admin'}
      open={open}
      cancelText="Discard"
      submitText={adminToEdit ? 'Edit Admin' : 'Add Admin'}
      setModalOpen={setOpen}
      onCancel={() => {
        setOpen(false);
        setAdminToEdit(null);
        clearFields();
      }}
      onSubmit={adminToEdit ? updateAdmin : addAdmin}
      disableSubmitButton={!adminName || !adminEmail}
    >
      <div className={styles.adminModal}>
        <div>
          <h2>Admin Name</h2>
          <Input
            placeholder="Admin Name"
            value={adminName}
            onChange={event => setAdminName(event.target.value)}
          />
        </div>
        <div>
          <h2>Admin Email</h2>
          <Input
            placeholder="Admin Email"
            value={adminEmail}
            onChange={event => setAdminEmail(event.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}

AdminModal.propTypes = {
  getAdmins: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};
