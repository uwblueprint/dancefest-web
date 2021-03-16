import React, { useState, useEffect } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import axios from 'axios'; // axios

import Modal from '@components/Modal'; // Modal
import Input from '@components/Input'; // Input
import Dropdown from '@components/Dropdown'; // Dropdown
import styles from '@styles/components/settings/AdminModal.module.scss'; // Component styles

const ADMIN_ROLE_OPTIONS = [
  {
    label: 'ADMIN',
    value: 'ADMIN',
  },
  {
    label: 'JUDGE',
    value: 'JUDGE',
  },
  {
    label: 'USER',
    value: 'USER',
  },
];
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
  const [adminRole, setAdminRole] = useState(null);

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
          role: adminRole.value,
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
          role: adminRole.value,
        },
      });

      await getAdmins();
    } catch {
      // Empty catch block
    }

    setLoading(false);
    setOpen(false);
    clearFields();
  };

  useEffect(() => {
    if (adminToEdit) {
      const { name, email, role } = adminToEdit;
      setAdminName(name);
      setAdminEmail(email);
      setAdminRole({ label: role, value: role });
    } else {
      clearFields();
    }
  }, [adminToEdit]);

  return (
    <Modal
      containerClassName={styles.adminModal__container}
      title={adminToEdit ? 'Edit User' : 'Add User'}
      open={open}
      cancelText="Discard"
      submitText={adminToEdit ? 'Edit User' : 'Add User'}
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
          <h2>Name</h2>
          <Input
            placeholder="Admin Name"
            value={adminName}
            onChange={event => setAdminName(event.target.value)}
          />
        </div>
        <div>
          <h2>Email</h2>
          <Input
            placeholder="Admin Email"
            value={adminEmail}
            onChange={event => setAdminEmail(event.target.value)}
          />
        </div>
        <div>
          <h2>Role</h2>
          <Dropdown
            className={styles.adminModal__dropdown}
            placeholder="Role"
            selected={adminRole}
            options={ADMIN_ROLE_OPTIONS}
            onChange={role => setAdminRole(role)}
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
