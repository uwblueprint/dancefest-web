import React, { useState, useEffect } from 'react'; // React
import axios from 'axios'; // axios
import Layout from '@components/Layout'; // Layout wrapper

import Button from '@components/Button'; // Button
import Title from '@components/Title'; // Title
import Input from '@components/Input'; // Input
import Tabs from '@components/Tabs'; // Tabs
import Modal from '@components/Modal'; // Modal
import Dropdown from '@components/Dropdown'; // Dropdown
import FilterDropdown from '@components/FilterDropdown'; // Filter Dropdown
import Table from '@components/Table'; // Table
import BackArrow from '@assets/back-arrow.svg'; // Back arrow icon
import Search from '@assets/search.svg'; // Search icon
import ChevronDown from '@assets/chevron-down.svg'; // Chevron down icon
import ChevronDownGrey from '@assets/chevron-down-grey.svg'; // Chevron down grey icon
import styles from '@styles/pages/Performances.module.scss'; // Page styles

// Temp constants
import data, { columns } from '../../data/mockParticipants';

// Page: Performances
export default function Performances() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState('');
  const [academicLevelOptions, setAcademicLevelOptions] = useState({});
  const [performanceLevelOptions, setPerformanceLevelOptions] = useState({});
  const [danceStyleOptions, setDanceStyleOptions] = useState({});
  const [danceSizeOptions, setDanceSizeOptions] = useState({});

  useEffect(() => {
    const getSettings = async () => {
      // Get settings values
      const settingsResponse = await axios({
        method: 'GET',
        url: '/api/settings/collect',
      });
      const settings = settingsResponse.data;
      const academicLevelSettings = {};
      const performanceLevelSettings = {};
      const danceStyleSettings = {};
      const danceSizeSettings = {};
      for (const setting of settings) {
        switch (setting.type) {
          case 'COMPETITION_LEVEL':
            performanceLevelSettings[setting.value] = {
              label: setting.value,
              selected: false,
            };
            break;
          case 'STYLE':
            danceStyleSettings[setting.value] = {
              label: setting.value,
              selected: false,
            };
            break;
          case 'DANCE_SIZE':
            danceSizeSettings[setting.value] = {
              label: setting.value,
              selected: false,
            };
            break;
          default:
            throw new Error('Invalid setting type');
        }
      }

      setAcademicLevelOptions(academicLevelSettings);
      setPerformanceLevelOptions(performanceLevelSettings);
      setDanceStyleOptions(danceStyleSettings);
      setDanceSizeOptions(danceSizeSettings);
    };

    getSettings();
  }, []);

  return (
    <Layout>
      <div>
        <div className={styles.performances__navigation}>
          <Button className={styles.performances__navigation__button} variant="outlined">
            <img src={BackArrow} />
            Back to Events
          </Button>
          <h2 className={styles.performances__navigation__eventName}>
            {`OSSDF2021- Let's Dis-dance`}
          </h2>
        </div>
        <div className={styles.performances__header}>
          <Title className={styles.performances__header__pageTitle}>Performances</Title>
          <Input
            className={styles.performances__header__search}
            placeholder="Search"
            icon={() => <img src={Search} />}
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <Button
            className={`${styles.performances__header__filtersButton} ${
              showFilters && styles.performances__header__filtersButtonOpen
            }`}
            variant={showFilters ? 'contained' : 'outlined'}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
            <img src={showFilters ? ChevronDown : ChevronDownGrey} />
          </Button>
          <Button variant="contained" onClick={() => setModalOpen(true)}>
            Add Performance
          </Button>
        </div>
        {showFilters && (
          <div className={styles.performances__filters}>
            <div className={styles.performances__filters__buttons}>
              <FilterDropdown buttonText="School" />
              <FilterDropdown
                buttonText="Academic Level"
                options={academicLevelOptions}
                setOptions={setAcademicLevelOptions}
              />
              <FilterDropdown
                buttonText="Competition Level"
                options={performanceLevelOptions}
                setOptions={setPerformanceLevelOptions}
              />
              <FilterDropdown
                buttonText="Style"
                options={danceStyleOptions}
                setOptions={setDanceStyleOptions}
              />
              <FilterDropdown
                buttonText="Size"
                options={danceSizeOptions}
                setOptions={setDanceSizeOptions}
              />
            </div>
            <div className={styles.performances__filters__appliedFilters}>applied filters</div>
          </div>
        )}
        <div className={styles.performances__content}>
          <Tabs
            firstTabName="Entry View"
            secondTabName="Judging View"
            firstTabContent={<EntryTable query={query} />}
            secondTabContent={<JudgingTable />}
          />
        </div>
      </div>
      <PerformanceModal mode="new" open={modalOpen} setOpen={setModalOpen} />
    </Layout>
  );
}

// Entries Table
const EntryTable = ({ query, filters }) => {
  const columns = [
    {
      Header: 'Edit',
      accessor: 'edit',
      // eslint-disable-next-line react/display-name
      Cell: () => (
        <div className={styles.entryTable__editCell}>
          <Button variant="edit" />
        </div>
      ),
    },
    {
      Header: 'ID',
      accessor: 'ID',
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'School',
      accessor: 'school',
      filter: 'equals',
    },
    {
      Header: 'Level',
      accessor: 'performanceLevel',
      filter: 'equals',
    },
    {
      Header: 'Style',
      accessor: 'style',
      filter: 'equals',
    },
    {
      Header: 'Size',
      accessor: 'size',
      filter: 'equals',
    },
    {
      Header: 'Score',
      accessor: 'score',
      filter: 'equals',
    },
  ];

  return <Table columns={columns} data={data} query={query} />;
};

// Judging Table
const JudgingTable = () => {
  return <Table columns={columns} data={[]} />;
};

// New Performance Modal
const PerformanceModal = ({ mode, open, setOpen }) => {
  return (
    <Modal
      containerClassName={styles.modal__container}
      title={mode === 'edit' ? 'Edit Performance' : 'New Performance'}
      open={open}
      setModalOpen={setOpen}
      cancelText="Discard"
      submitText="Add Performance"
      onCancel={() => setOpen(false)}
    >
      <div className={styles.modal}>
        <div>
          <h2>Entry ID</h2>
          <Input className={styles.modal__entryId} placeholder="##" />
        </div>
        <div>
          <h2>Dance Title</h2>
          <Input placeholder="Title" />
        </div>
        <div>
          <h2>Dancer(s)</h2>
          <Input placeholder="names, names, names" />
          <h3>Separated by comma (ie: John Smith, Jane Doe...)</h3>
        </div>
        <div>
          <h2>Choreographer(s)</h2>
          <Input placeholder="names, names" />
          <h3>Separated by comma (ie: John Smith, Jane Doe...)</h3>
        </div>
        <div>
          <h2>School</h2>
          <Dropdown className={styles.modal__dropdown} placeholder="School" />
        </div>
        <div>
          <h2>Competition Level</h2>
          <Dropdown className={styles.modal__dropdown} placeholder="Level" />
        </div>
        <div>
          <h2>Style</h2>
          <Dropdown className={styles.modal__dropdown} placeholder="Style" />
        </div>
        <div>
          <h2>Size</h2>
          <Dropdown className={styles.modal__dropdown} placeholder="Size" />
        </div>
      </div>
    </Modal>
  );
};
