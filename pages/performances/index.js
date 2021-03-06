import React, { useState, useEffect } from 'react'; // React
import axios from 'axios'; // axios
import Link from 'next/link'; // Next link
import Layout from '@components/Layout'; // Layout wrapper

import Button from '@components/Button'; // Button
import Title from '@components/Title'; // Title
import Input from '@components/Input'; // Input
import Tabs from '@components/Tabs'; // Tabs
import Modal from '@components/Modal'; // Modal
import Dropdown from '@components/Dropdown'; // Dropdown
import FilterDropdown from '@components/FilterDropdown'; // Filter Dropdown
import Table from '@components/Table'; // Table
import Pill from '@components/Pill'; // Pill
import Pagination from '@components/Pagination'; // Pagination
import BackArrow from '@assets/back-arrow.svg'; // Back arrow icon
import Search from '@assets/search.svg'; // Search icon
import ChevronDown from '@assets/chevron-down.svg'; // Chevron down icon
import ChevronDownGrey from '@assets/chevron-down-grey.svg'; // Chevron down grey icon
import styles from '@styles/pages/Performances.module.scss'; // Page styles

// Temp constants
import data, { columns } from '../../data/mockParticipants';

const PAGE_SIZE = 3; // Rows per page

// Get the active filters (list of column accessors) from an object of filter dropdown values
const getActiveFilters = options => {
  return Object.keys(options).filter(option => options[option].selected);
};

// Remove key from object (returns new object)
const removeKeyFromObject = (object, key) => {
  // eslint-disable-next-line no-unused-vars
  const { [key]: _, ...rest } = object;
  return rest;
};

// Page: Performances
export default function Performances() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState('');
  const [schoolOptions, setSchoolOptions] = useState({});
  const [academicLevelOptions, setAcademicLevelOptions] = useState({});
  const [performanceLevelOptions, setPerformanceLevelOptions] = useState({});
  const [danceStyleOptions, setDanceStyleOptions] = useState({});
  const [danceSizeOptions, setDanceSizeOptions] = useState({});
  const [filters, setFilters] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  // Get initial filter options
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

      // TODO: Get schools

      setAcademicLevelOptions(academicLevelSettings);
      setPerformanceLevelOptions(performanceLevelSettings);
      setDanceStyleOptions(danceStyleSettings);
      setDanceSizeOptions(danceSizeSettings);
    };

    getSettings();
  }, []);

  // Update table filters
  useEffect(() => {
    const newFilters = [];
    const schoolFilters = getActiveFilters(schoolOptions);
    const academicLevelFilters = getActiveFilters(academicLevelOptions);
    const performanceLevelFilters = getActiveFilters(performanceLevelOptions);
    const danceStyleFilters = getActiveFilters(danceStyleOptions);
    const danceSizeFilters = getActiveFilters(danceSizeOptions);
    if (query) {
      newFilters.push({
        id: 'title',
        value: query,
      });
    }
    if (schoolFilters.length > 0) {
      newFilters.push({
        id: 'school',
        value: schoolFilters,
      });
    }
    if (academicLevelFilters.length > 0) {
      newFilters.push({
        id: 'academic_level',
        value: academicLevelFilters,
      });
    }
    if (performanceLevelFilters.length > 0) {
      newFilters.push({
        id: 'competition_level',
        value: performanceLevelFilters,
      });
    }
    if (danceStyleFilters.length > 0) {
      newFilters.push({
        id: 'dance_style',
        value: danceStyleFilters,
      });
    }
    if (danceSizeFilters.length > 0) {
      newFilters.push({
        id: 'dance_size',
        value: danceSizeFilters,
      });
    }

    setFilters(newFilters);
    setPageNumber(0);
  }, [
    query,
    schoolOptions,
    academicLevelOptions,
    performanceLevelOptions,
    danceStyleOptions,
    danceSizeOptions,
  ]);

  // Render filter pills
  const renderActiveFilters = () => {
    let elements = [];
    for (const { id, value: activeFilters } of filters) {
      switch (id) {
        case 'school':
          elements = [
            ...elements,
            ...activeFilters.map((f, i) => (
              <Pill
                key={i}
                value={f}
                onDelete={() => setSchoolOptions(removeKeyFromObject(schoolOptions, f))}
              />
            )),
          ];
          break;
        case 'academic_level':
          elements = [
            ...elements,
            ...activeFilters.map((f, i) => (
              <Pill
                key={i}
                value={f}
                onDelete={() =>
                  setAcademicLevelOptions(removeKeyFromObject(academicLevelOptions, f))
                }
              />
            )),
          ];
          break;
        case 'competition_level':
          elements = [
            ...elements,
            ...activeFilters.map((f, i) => (
              <Pill
                key={i}
                value={f}
                onDelete={() =>
                  setPerformanceLevelOptions(removeKeyFromObject(performanceLevelOptions, f))
                }
              />
            )),
          ];
          break;
        case 'dance_style':
          elements = [
            ...elements,
            ...activeFilters.map((f, i) => (
              <Pill
                key={i}
                value={f}
                onDelete={() => setDanceStyleOptions(removeKeyFromObject(danceStyleOptions, f))}
              />
            )),
          ];
          break;
        case 'dance_size':
          elements = [
            ...elements,
            ...activeFilters.map((f, i) => (
              <Pill
                key={i}
                value={f}
                onDelete={() => setDanceSizeOptions(removeKeyFromObject(danceSizeOptions, f))}
              />
            )),
          ];
          break;
      }
    }

    return elements;
  };

  return (
    <Layout>
      <div>
        <div className={styles.performances__navigation}>
          <Link href="/">
            <Button className={styles.performances__navigation__button} variant="outlined">
              <img src={BackArrow} />
              Back to Events
            </Button>
          </Link>

          <h2 className={styles.performances__navigation__eventName}>
            {`OSSDF2021- Let's Dis-dance`}
          </h2>
        </div>
        <div className={styles.performances__header}>
          <div>
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
          <div>
            <Pagination
              rowsCount={data.length}
              pageNumber={pageNumber}
              pageSize={PAGE_SIZE}
              onPageChange={({ selected }) => setPageNumber(selected)}
            />
          </div>
        </div>
        {showFilters && (
          <div className={styles.performances__filters}>
            <div className={styles.performances__filters__buttons}>
              <FilterDropdown
                buttonText="School"
                options={schoolOptions}
                setOptions={setSchoolOptions}
              />
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
            <div className={styles.performances__filters__appliedFilters}>
              {renderActiveFilters()}
            </div>
          </div>
        )}
        <div className={styles.performances__content}>
          <Tabs
            firstTabName="Entry View"
            secondTabName="Judging View"
            firstTabContent={<EntryTable filters={filters} pageNumber={pageNumber} />}
            secondTabContent={<JudgingTable />}
          />
        </div>
      </div>
      <PerformanceModal mode="new" open={modalOpen} setOpen={setModalOpen} />
    </Layout>
  );
}

// Entries Table
const EntryTable = props => {
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
      filter: 'matchEnum',
    },
    {
      Header: 'Level',
      accessor: 'competition_level',
      filter: 'matchEnum',
    },
    {
      Header: 'Style',
      accessor: 'dance_style',
      filter: 'matchEnum',
    },
    {
      Header: 'Size',
      accessor: 'dance_size',
      filter: 'matchEnum',
    },
    {
      Header: 'Score',
      accessor: 'score',
      filter: 'matchEnum',
    },
  ];

  return <Table columns={columns} data={data} pageSize={PAGE_SIZE} {...props} />;
};

// Judging Table
const JudgingTable = () => {
  return <Table columns={columns} data={[]} filters={[]} />;
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
