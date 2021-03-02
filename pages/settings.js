import React, { useState, useEffect } from 'react'; // React
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
import Delete from '@assets/delete.svg'; // Delete icon
import Error from '@assets/error.svg'; // Error icon
import styles from '@styles/pages/Settings.module.scss';

const SETTINGS_OPTIONS = [
  { label: 'Dance Size', value: 'DANCE_SIZE' },
  { label: 'Dance Style', value: 'STYLE' },
  { label: 'Performance Level', value: 'COMPETITION_LEVEL' },
];

// Page: Settings
export default function Setting() {
  const [loading, setLoading] = useState(false);

  // Category state
  const [category, setCategory] = useState(null);
  const [values, setValues] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [valueToDelete, setValueToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteValueError, setDeleteValueError] = useState(false);

  // Edit schools state
  const [newSchool, setNewSchool] = useState('');
  const [newSchoolContactEmail, setNewSchoolContactEmail] = useState('');

  // Edit admins state
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');

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
    } catch {
      // Empty catch block
      setDeleteValueError(true);
    }

    setLoading(false);
  };

  // TODO: Call APIs in the following endpoints
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
            <h2>Edit Schools</h2>
            <h3>Add new school</h3>
            <div className={styles.settings__editSchools__input}>
              <Input
                placeholder="Enter School Name"
                value={newSchool}
                onChange={event => setNewSchool(event.target.value)}
              />
              <Input
                placeholder="Enter School Contact Email"
                value={newSchoolContactEmail}
                onChange={event => setNewSchoolContactEmail(event.target.value)}
              />
              <Button
                className={styles.settings__editSchools__button}
                variant="contained"
                disabled={newSchool === '' || newSchoolContactEmail === '' || loading}
              >
                Add
              </Button>
            </div>
          </div>
          <div className={styles.settings__editAdmins}>
            <h2>Edit Admins</h2>
            <h3>Add new admin</h3>
            <div className={styles.settings__editAdmins__input}>
              <Input
                placeholder="Enter Admin Name"
                value={newAdminName}
                onChange={event => setNewAdminName(event.target.value)}
              />
              <Input
                placeholder="Enter Admin Email"
                value={newAdminEmail}
                onChange={event => setNewAdminEmail(event.target.value)}
              />
              <Button
                className={styles.settings__editAdmins__button}
                variant="contained"
                disabled={newAdminName === '' || newAdminEmail === '' || loading}
              >
                Add
              </Button>
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
