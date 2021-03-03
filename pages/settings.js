import React, { useState, useEffect } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import Layout from '@components/Layout'; // Layout wrapper
import { getSession } from 'next-auth/client'; // Session handling

// Test components
import Title from '@components/Title'; // Title
import Dropdown from '@components/Dropdown'; // Dropdown
import Button from '@components/Button'; // Button
import Input from '@components/Input'; // Input
import Modal from '@components/Modal'; // Modal
import Delete from '@assets/delete.svg'; // Delete icon
import styles from '@styles/pages/Settings.module.scss';

import CATEGORY_VALUES from '../data/mockSettings'; // Mock category values
const SETTINGS_OPTIONS = [
  { label: 'Dance Size', value: 'size' },
  { label: 'Dance Style', value: 'style' },
  { label: 'Performance Level', value: 'level' },
];

// Page: Settings
export default function Settings() {
  const [category, setCategory] = useState(null);
  const [values, setValues] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [valueToDelete, setValueToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // TODO: Call APIs in the following endpoints
  const handleAddValue = () => {
    if (newValue === '') {
      return;
    }
    setValues([...values, newValue]);
    setNewValue('');
  };

  const handleDeleteButtonClick = valueToDelete => {
    setValueToDelete(valueToDelete);
    setModalOpen(true);
  };

  const handleDeleteValue = () => {
    const newValues = values.filter(value => value !== valueToDelete);
    setValues(newValues);
    setValueToDelete(null);
    setModalOpen(false);
  };

  const handleInputKeyDown = event => {
    if (event.key === 'Enter') {
      handleAddValue(event);
    }
    return;
  };

  useEffect(() => {
    setValues(CATEGORY_VALUES[category] || []);
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
              {values && values.length > 0
                ? values.map((value, i) => (
                    <CategoryValue
                      key={i}
                      value={value}
                      onDelete={() => handleDeleteButtonClick(value)}
                    />
                  ))
                : 'No values yet'}
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
              />
              <Button variant="contained" onClick={handleAddValue} disabled={newValue === ''}>
                Add
              </Button>
            </div>
          </div>
          <div className={styles.settings__buttons}>
            <Button variant="outlined" onClick={() => setValues(CATEGORY_VALUES[category])}>
              Discard
            </Button>
            <Button variant="contained">Save Changes</Button>
          </div>
        </div>
      </div>
      <Modal
        containerClassName={styles.settings__modal}
        title={`Delete ${valueToDelete}?`}
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
