import React, { useState, useEffect } from 'react'; // React
import { useRouter } from 'next/router'; // Routing (with buttons)
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
import DancerRedJump from '@assets/dancer-red-jump.svg'; // Jumping Dancer SVG
import DancerYellowBlue from '@assets/dancer-yellow-blue.svg'; // Jumping Dancer SVG
import styles from '@styles/pages/Performances.module.scss'; // Page styles

// Temp constants
import data, { columns } from '../../data/mockAwards';

const PAGE_SIZE = 6; // Rows per page

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
  // Filter Options
  const [awardTypeOptions, setAwardTypeOptions] = useState({});
  const [danceTypeOptions, setDanceTypeOptions] = useState({});
  // All Filter
  const [filters, setFilters] = useState([]);
  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // TODO: Get filter options from Awards API
  /*
  // Get initial filter options
  useEffect(() => {
    const getSettings = async () => {
      // Get settings values
      const settingsResponse = await axios({
        method: 'GET',
        url: '/api/settings/collect',
      });
      const settings = settingsResponse.data;
      const awardTypeSettings = {};
      const danceTypeSettings = {};
      for (const setting of settings) {
        switch (setting.type) {
          case 'COMPETITION_LEVEL': // TODO: AWARD TYPES
            performanceLevelSettings[setting.value] = {
              label: setting.value,
              selected: false,
            };
            break;
          case 'STYLE': // TODO: DANCE TYPE
            danceStyleSettings[setting.value] = {
              label: setting.value,
              selected: false,
            };
            break;
          default:
            throw new Error('Invalid setting type');
        }
      }

      setAcademicLevelOptions(academicLevelSettings);
    };

    getSettings();
  }, []);

   */

  // Update table filters
  useEffect(() => {
    const newFilters = [];
    const awardTypeFilters = getActiveFilters(awardTypeOptions);
    const danceTypeFilters = getActiveFilters(danceTypeOptions);
    if (query) {
      newFilters.push({
        id: 'title',
        value: query,
      });
    }
    if (awardTypeFilters.length > 0) {
      newFilters.push({
        id: 'school',
        value: awardTypeFilters,
      });
    }
    if (danceTypeFilters.length > 0) {
      newFilters.push({
        id: 'academic_level',
        value: danceTypeFilters,
      });
    }

    setFilters(newFilters);
    setPageNumber(0);
  }, [query, awardTypeOptions, danceTypeOptions]);

  // Render filter pills
  const renderActiveFilters = () => {
    let elements = [];
    for (const { id, value: activeFilters } of filters) {
      switch (id) {
        case 'award_type':
          elements = [
            ...elements,
            ...activeFilters.map((f, i) => (
              <Pill
                key={i}
                value={f}
                onDelete={() => setAwardTypeOptions(removeKeyFromObject(awardTypeOptions, f))}
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
            <Title className={styles.performances__header__pageTitle}>Awards</Title>
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
              Add Award
            </Button>
          </div>
          <div>
            <Pagination
              pageCount={pageCount}
              pageNumber={pageNumber}
              onPageChange={({ selected }) => setPageNumber(selected)}
            />
          </div>
        </div>
        {showFilters && (
          <div className={styles.performances__filters}>
            <div className={styles.performances__filters__buttons}>
              <FilterDropdown
                buttonText="Award Type"
                options={awardTypeOptions}
                setOptions={setAwardTypeOptions}
              />
              <FilterDropdown
                buttonText="Dance Type"
                options={danceTypeOptions}
                setOptions={setDanceTypeOptions}
              />
            </div>
            <div className={styles.performances__filters__appliedFilters}>
              {renderActiveFilters()}
            </div>
          </div>
        )}
        <div className={styles.performances__content}>
          <Tabs
            firstTabName="Nominations"
            secondTabName="Finalized"
            firstTabContent={
              <NominationTable
                filters={filters}
                pageNumber={pageNumber}
                setPageCount={setPageCount}
              />
            }
            secondTabContent={<FinalizedTable />}
          />
        </div>
      </div>
      <PerformanceModal mode="new" open={modalOpen} setOpen={setModalOpen} />
    </Layout>
  );
}

// Entries Table
const NominationTable = props => {
  const router = useRouter(); // Collect router

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
      Header: 'Award Title',
      accessor: 'title',
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
    {
      Header: 'No. of nominations',
      accessor: 'nominations',
      filter: 'matchEnum',
      headerStyle: { textAlign: 'right' },
    },
  ];

  const goToPerformanceDetails = row => {
    // Go to /performances/[id] page
    router.push(`/awards/${row.id}`); // Route to "/performance/:id" page
  };

  return (
    <Table
      columns={columns}
      data={data}
      pageSize={PAGE_SIZE}
      emptyComponent={<EmptyTableComponent />}
      onRowClick={goToPerformanceDetails}
      {...props}
    />
  );
};

// Judging Table
const FinalizedTable = () => {
  return (
    <Table columns={columns} data={[]} filters={[]} emptyComponent={<EmptyTableComponent />} />
  );
};

// New Performance Modal
const PerformanceModal = ({ mode, open, setOpen }) => {
  return (
    <Modal
      containerClassName={styles.modal__container}
      title={mode === 'edit' ? 'Edit Award' : 'New Award'}
      open={open}
      setModalOpen={setOpen}
      cancelText="Discard"
      submitText="Add Award"
      onCancel={() => setOpen(false)}
    >
      <div className={styles.modal}>
        <div>
          <h2>Award Title*</h2>
          <Input className={styles.modal__entryId} placeholder="Title" />
        </div>
        <div>
          <h2>Nominated Dance</h2>
          <h3>If the award is to be given to a performance enter their entry ID here:</h3>
          <Input className={styles.modal__entryId} placeholder="Entry ID" />
        </div>
        <div>
          <h2>Award Type*</h2>
          <Dropdown className={styles.modal__dropdown} placeholder="Award Type" />
        </div>
        <div>
          <h2>Nominated Dancer(s)</h2>
          <h3>If the award is to be given to a specific student enter their name here:</h3>
          <Input placeholder="names, names, names" />
          <h3>Separated by comma (ie: John Smith, Jane Doe...)</h3>
        </div>
      </div>
    </Modal>
  );
};

const EmptyTableComponent = () => {
  return (
    <div className={styles.page__performances_list_empty}>
      <img src={DancerYellowBlue} />
      <div>
        <h2>No Performances Listed</h2>
        <h3>Create your first performance</h3>
      </div>
      <img src={DancerRedJump} />
    </div>
  );
};
