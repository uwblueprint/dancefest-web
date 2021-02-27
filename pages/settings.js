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
import styles from '@styles/pages/Settings.module.scss';

const SETTINGS_OPTIONS = [
  { label: 'Dance Size', value: 'DANCE_SIZE' },
  { label: 'Dance Style', value: 'STYLE' },
  { label: 'Performance Level', value: 'COMPETITION_LEVEL' },
];

// Page: Settings
export default function Setting() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [values, setValues] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [valueToDelete, setValueToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    }
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

  return (
    <Layout>
      <div className={styles.settings}>
        <Title className={styles.settings__title}>Settings</Title>
        <div className={styles.settings__categorySelection}>
          <h2>Select the category you would like to edit:</h2>
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
                  />
                ))
              ) : (
                'No values yet'
              )}
            </div>
          </div>
          <div className={styles.settings__addCategoryValue}>
            <h2>Add a new option to the selected category here:</h2>
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
                variant="contained"
                onClick={handleAddValue}
                disabled={newValue === '' || !category || loading}
              >
                Add
              </Button>
            </div>
          </div>
          <div className={styles.settings__buttons}>
            <Button variant="outlined" onClick={() => {}}>
              {' '}
              {/* TODO: Handle discard functionality */}
              Discard
            </Button>
            <Button variant="contained">Save Changes</Button>
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
const CategoryValue = ({ value, onDelete }) => {
  return (
    <div className={styles.settings__categoryValues__categoryValue}>
      {value}
      <img src={Delete} onClick={onDelete} />
    </div>
  );
};

CategoryValue.propTypes = {
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
