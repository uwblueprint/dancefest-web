import React, { useState, useEffect, useRef } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import axios from 'axios'; // axios
import Layout from '@components/Layout'; // Layout wrapper
import { getSession } from 'next-auth/client'; // Session handling

import Loader from 'react-loader-spinner'; // Loading spinner
import Title from '@components/Title'; // Title
import Dropdown from '@components/Dropdown'; // Dropdown
import Button from '@components/Button'; // Button
import Input from '@components/Input'; // Input
import Modal from '@components/Modal'; // Modal
import Table from '@components/Table'; // Table
import Delete from '@assets/delete.svg'; // Delete icon
import Error from '@assets/error.svg'; // Error icon
import styles from '@styles/pages/Settings.module.scss';

const SETTINGS_OPTIONS = [
  { label: 'Dance Size', value: 'DANCE_SIZE' },
  { label: 'Dance Style', value: 'STYLE' },
  { label: 'Performance Level', value: 'COMPETITION_LEVEL' },
];

const SCHOOLS_COLUMNS = [
  {
    Header: 'Edit',
    accessor: 'edit',
    // eslint-disable-next-line react/display-name
    Cell: () => <Button variant="edit" />,
  },
  {
    Header: 'School Name',
    accessor: 'school_name',
  },
  {
    Header: 'Contact Name',
    accessor: 'contact_name',
  },
  {
    Header: 'Contact Email',
    accessor: 'email',
  },
  {
    Header: 'Phone Number',
    accessor: 'phone',
  },
];

const ADMINS_COLUMNS = [
  {
    Header: 'Edit',
    accessor: 'edit',
  },
  {
    Header: 'Admin Name',
    accessor: 'adminName',
  },
  {
    Header: 'Admin Email',
    accessor: 'adminEmail',
  },
];

// Page: Settings
export default function Setting() {
  const addCategoryValueInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Category state
  const [category, setCategory] = useState(null);
  const [values, setValues] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [valueToDelete, setValueToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteValueError, setDeleteValueError] = useState(false);

  // Add Schools state
  const [addSchoolModalOpen, setAddSchoolModalOpen] = useState(false);
  const [schools, setSchools] = useState([]);

  // Add Admins state
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);

  const getSettingValuesOfType = async type => {
    setLoading(true);

    try {
      const response = await axios({
        url: `/api/settings/collect?type=${type}`,
        method: 'GET',
      });
      const settings = response.data;

      setValues(settings);
    } catch {
      // Empty catch block
    }

    setLoading(false);
  };

  const addSettingValue = async (type, value) => {
    setLoading(true);

    try {
      await axios({
        url: '/api/settings/create',
        method: 'POST',
        data: {
          type,
          value,
        },
      });
      setNewValue('');
    } catch {
      // Empty catch block
    }

    setLoading(false);
    if (addCategoryValueInputRef && addCategoryValueInputRef.current) {
      addCategoryValueInputRef.current.focus();
    }
  };

  const deleteSettingValue = async id => {
    setLoading(true);

    try {
      await axios({
        url: '/api/settings/delete',
        method: 'DELETE',
        data: { id },
      });

      setValueToDelete(null);
    } catch (err) {
      console.log(err.error);
      setDeleteValueError(true);
    }

    setLoading(false);
  };

  const getSchools = async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: 'GET',
        url: '/api/schools/collect',
      });
      const schools = response.data;
      setSchools(schools);
    } catch {
      // Empty catch block
    }

    setLoading(false);
  };

  const handleAddValue = async () => {
    if (newValue === '') {
      return;
    }

    await addSettingValue(category, newValue);
    await getSettingValuesOfType(category);
  };

  const handleDeleteButtonClick = valueToDelete => {
    setValueToDelete(valueToDelete);
    setModalOpen(true);
  };

  const handleDeleteValue = async () => {
    setModalOpen(false);

    await deleteSettingValue(valueToDelete.id);
    await getSettingValuesOfType(category);
  };

  const handleInputKeyDown = event => {
    if (event.key === 'Enter') {
      handleAddValue(event);
    }
    return;
  };

  useEffect(() => {
    getSchools();
  }, []);

  useEffect(() => {
    if (category) {
      getSettingValuesOfType(category);
    }
  }, [category]);

  // Hide red outline and error text after 3 seconds of failed delete
  useEffect(() => {
    if (deleteValueError) {
      setTimeout(() => setDeleteValueError(false), 3000);
    }
  }, [deleteValueError]);

  return (
    <Layout>
      <div className={styles.settings}>
        <Title className={styles.settings__title}>Settings</Title>
        <div className={styles.settings__categorySelection}>
          <h2>Edit Category</h2>
          <h3>Category</h3>
          <Dropdown
            wrapperClassName={styles.settings__categoryDropdown}
            placeholder="Category"
            options={SETTINGS_OPTIONS}
            selected={category}
            onChange={category => setCategory(category.value)}
          />
          <div className={styles.settings__categoryValues__wrapper}>
            <div className={styles.settings__categoryValues}>
              {loading ? (
                <div className={styles.settings__loadingSpinner}>
                  <Loader type="Oval" color="#c90c0f" height={32} width={32} />
                </div>
              ) : values && values.length > 0 ? (
                values.map((value, i) => (
                  <CategoryValue
                    key={i}
                    value={value.value}
                    onDelete={() => handleDeleteButtonClick(value)}
                    hasError={deleteValueError && valueToDelete.id === value.id}
                  />
                ))
              ) : (
                'No values yet'
              )}
            </div>
            <div className={styles.settings__error}>
              {deleteValueError && !loading && (
                <>
                  <img src={Error} />
                  <p>Options in use cannot be deleted</p>
                </>
              )}
            </div>
          </div>
          <div className={styles.settings__addCategoryValue}>
            <h3>Add new option to selected category</h3>
            <div className={styles.settings__addCategoryValue__input}>
              <Input
                wrapperClassName={styles.settings__addCategoryValue__input__textBox__wrapper}
                placeholder="Add New Option"
                value={newValue}
                onKeyDown={handleInputKeyDown}
                onChange={event => setNewValue(event.target.value)}
                disabled={!category || loading}
                inputRef={addCategoryValueInputRef}
              />
              <Button
                className={styles.settings__addCategoryValue__button}
                variant="contained"
                onClick={handleAddValue}
                disabled={newValue === '' || !category || loading}
              >
                Add
              </Button>
            </div>
          </div>
          <div className={styles.settings__editSchools}>
            <div className={styles.settings__editSchools__header}>
              <h2>Edit Schools</h2>
              <Button
                className={styles.settings__editSchools__button}
                variant="contained"
                disabled={loading}
                onClick={() => setAddSchoolModalOpen(true)}
              >
                Add School
              </Button>
            </div>
            <div className={styles.settings__editSchools__tableWrapper}>
              <Table columns={SCHOOLS_COLUMNS} data={schools} />
            </div>
          </div>
          <div className={styles.settings__editAdmins}>
            <div className={styles.settings__editAdmins__header}>
              <h2>Edit Admins</h2>
              <Button
                className={styles.settings__editAdmins__button}
                variant="contained"
                disabled={loading}
                onClick={() => setAddAdminModalOpen(true)}
              >
                Add Admin
              </Button>
            </div>
            <div className={styles.settings__editAdmins__tableWrapper}>
              <Table columns={ADMINS_COLUMNS} data={[]} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        containerClassName={styles.settings__modal}
        title={`Delete ${valueToDelete ? valueToDelete.value : ''}?`}
        open={modalOpen}
        cancelText="Cancel"
        submitText="Confirm"
        setModalOpen={setModalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleDeleteValue}
      >
        <p>Deleted category values cannot be restored.</p>
      </Modal>
      <AddSchoolModal
        setLoading={setLoading}
        open={addSchoolModalOpen}
        setOpen={setAddSchoolModalOpen}
        getSchools={getSchools}
      />
      <AddAdminModal
        setLoading={setLoading}
        open={addAdminModalOpen}
        setOpen={setAddAdminModalOpen}
      />
    </Layout>
  );
}

// Category Value
const CategoryValue = ({ value, onDelete, hasError }) => {
  return (
    <div
      className={`${styles.settings__categoryValues__categoryValue} ${
        hasError && styles.settings__categoryValues__categoryValue__error
      }`}
    >
      {value}
      <img src={Delete} onClick={onDelete} />
    </div>
  );
};

CategoryValue.propTypes = {
  hasError: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

// Add School Modal
const AddSchoolModal = ({ setLoading, open, setOpen, getSchools }) => {
  const [schoolName, setSchoolName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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

      getSchools();
    } catch {
      // Empty catch block
    }

    setLoading(false);
  };

  return (
    <Modal
      containerClassName={styles.settings__addSchoolModal__container}
      title="Add School"
      open={open}
      cancelText="Discard"
      submitText="Add School"
      setModalOpen={setOpen}
      onCancel={() => setOpen(false)}
      onSubmit={addSchool}
      disableSubmitButton={!schoolName || !contactName || !contactEmail || !phoneNumber}
    >
      <div className={styles.settings__addSchoolModal}>
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
};

AddSchoolModal.propTypes = {
  getSchools: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

// Add Admin Modal
const AddAdminModal = ({ setLoading, open, setOpen }) => {
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  const addAdmin = async () => {
    setLoading(true);

    // TODO: Integrate with admin API

    setLoading(false);
  };

  return (
    <Modal
      containerClassName={styles.settings__addAdminModal__container}
      title="Add Admin"
      open={open}
      cancelText="Discard"
      submitText="Add Admin"
      setModalOpen={setOpen}
      onCancel={() => setOpen(false)}
      onSubmit={addAdmin}
      disableSubmitButton={!adminName || !adminEmail}
    >
      <div className={styles.settings__addAdminModal}>
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
};

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
