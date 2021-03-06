import React, { useState, useEffect } from 'react'; // React
import axios from 'axios'; // axios
import Layout from '@components/Layout'; // Layout wrapper
import Event from '@containers/Event'; // Event state
import { getSession } from 'next-auth/client'; // Session handling
import { useRouter } from 'next/router'; // Routing

import PerformancesTable from '@components/performances/PerformancesTable'; // Performances table
import AddPerformanceModal from '@components/performances/AddPerformanceModal'; // Performance modal

import Loader from 'react-loader-spinner'; // Loading spinner
import Button from '@components/Button'; // Button
import Title from '@components/Title'; // Title
import Input from '@components/Input'; // Input
import Tabs from '@components/Tabs'; // Tabs
import { formatDropdownOptions } from '@components/Dropdown'; // Format dropdown options util
import FilterDropdown, { formatFilterDropdownOptions } from '@components/FilterDropdown'; // Filter Dropdown + Format filter dropdown options util
import Pill from '@components/Pill'; // Pill
import Pagination from '@components/Pagination'; // Pagination
import BackButton from '@components/BackButton';
import Search from '@assets/search.svg'; // Search icon
import ChevronDown from '@assets/chevron-down.svg'; // Chevron down icon
import ChevronDownGrey from '@assets/chevron-down-grey.svg'; // Chevron down grey icon
import styles from '@styles/pages/Performances.module.scss'; // Page styles

import useSnackbar from '@utils/useSnackbar'; // Snackbar
import { formatSchools } from '@utils/schools'; // Format schools util
import { formatPerformances, filterPerformancesForJudge } from '@utils/performances'; // Format performances util

const ENTRY_VIEW_HIDDEN_COLUMNS = ['technicalScore', 'artisticScore', 'awardsString', 'status'];
const JUDGING_VIEW_HIDDEN_COLUMNS = ['schoolName', 'performanceLevel', 'danceStyle', 'danceSize'];

/**
 * Get the active filters from an object of filter dropdown values
 * @param {Object} options - Object of filters used in FilterDropdown component
 * @returns {Object[]} - List of filters that have `selected: true`. Format: {label: <label>, value: <value>}
 */
const getActiveFilters = options => {
  return Object.entries(options)
    .filter(([key]) => options[key].selected)
    .map(([value, { label }]) => ({
      value,
      label,
    }));
};

/**
 * Remove key from object
 * @param {Object} object - An object containing all the available filters
 * @param {*} key - A key in the object
 * @returns {Object} A new object that is a copy of the `object` parameter with the `key` removed
 */
const removeFilter = (object, key) => {
  return {
    ...object,
    [key]: {
      label: object[key].label,
      selected: false,
    },
  };
};

// Page: Performances
export default function Performances({ session }) {
  const { snackbarError } = useSnackbar();
  const router = useRouter();
  const [event] = Event.useContainer();

  const [eventName, setEventName] = useState(''); // Event name
  const [loading, setLoading] = useState(true); // Loading
  const [modalOpen, setModalOpen] = useState(false); // Modal open
  const [showFilters, setShowFilters] = useState(false); // Show filter dropdowns
  const [searchQuery, setSearchQuery] = useState(''); // Search query string

  // Filter dropdown options
  const [schoolFilters, setSchoolFilters] = useState({});
  const [performanceLevelFilters, setPerformanceLevelFilters] = useState({});
  const [danceStyleFilters, setDanceStyleFilters] = useState({});
  const [danceSizeFilters, setDanceSizeFilters] = useState({});

  // Modal dropdown options
  const [schoolDropdownOptions, setSchoolDropdownOptions] = useState([]);
  const [performanceLevelDropdownOptions, setPerformanceLevelDropdownOptions] = useState([]);
  const [danceStyleDropdownOptions, setDanceStyleDropdownOptions] = useState([]);
  const [danceSizeDropdownOptions, setDanceSizeDropdownOptions] = useState([]);

  // Table props
  const [tableFilters, setTableFilters] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // Table data
  const [performances, setPerformances] = useState([]);
  const [performanceToEdit, setPerformanceToEdit] = useState(null);
  // Table data - judge view
  const [pendingPerformances, setPendingPerformances] = useState([]);
  const [adjudicatedPerformances, setAdjudicatedPerformances] = useState([]);

  const getEvent = async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: 'GET',
        url: `/api/events/get?eventID=${event.id}`,
      });
      const { name } = response.data;

      setEventName(name);
    } catch (err) {
      snackbarError(err);
    }
  };

  const getFilters = async () => {
    setLoading(true);

    const getSchools = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: '/api/schools/collect',
        });
        const schools = formatSchools(response.data);

        // Modal dropdown options
        setSchoolDropdownOptions(
          formatDropdownOptions(schools, {
            value: 'id',
            label: 'schoolName',
          })
        );

        // Filters
        const initialSchoolFilters = formatFilterDropdownOptions(schools, {
          value: 'id',
          label: 'schoolName',
        });
        setSchoolFilters(initialSchoolFilters);
      } catch (err) {
        snackbarError(err);
      }
    };

    const getSettings = async () => {
      const response = await axios({
        method: 'GET',
        url: '/api/settings/collect',
      });
      const settings = response.data;

      const performanceLevelSettings = settings.filter(
        setting => setting.type === 'COMPETITION_LEVEL'
      );
      const danceStyleSettings = settings.filter(setting => setting.type === 'STYLE');
      const danceSizeSettings = settings.filter(setting => setting.type === 'DANCE_SIZE');

      const formatOptionsFields = {
        value: 'id',
        label: 'value',
      };

      // Modal dropdown options
      setPerformanceLevelDropdownOptions(
        formatDropdownOptions(performanceLevelSettings, formatOptionsFields)
      );
      setDanceStyleDropdownOptions(formatDropdownOptions(danceStyleSettings, formatOptionsFields));
      setDanceSizeDropdownOptions(formatDropdownOptions(danceSizeSettings, formatOptionsFields));

      // Filters
      const initialPerformanceLevelFilters = formatFilterDropdownOptions(
        performanceLevelSettings,
        formatOptionsFields
      );
      const initialDanceStyleFilters = formatFilterDropdownOptions(
        danceStyleSettings,
        formatOptionsFields
      );
      const initialDanceSizeFilters = formatFilterDropdownOptions(
        danceSizeSettings,
        formatOptionsFields
      );

      setPerformanceLevelFilters(initialPerformanceLevelFilters);
      setDanceStyleFilters(initialDanceStyleFilters);
      setDanceSizeFilters(initialDanceSizeFilters);
    };

    await getSchools();
    await getSettings();

    setLoading(false);
  };

  useEffect(() => {
    // If judge view - filter performances for specific judge
    if (session.role === 'JUDGE') {
      const [adjudicated, pending] = filterPerformancesForJudge(performances, session.id);
      setPendingPerformances(pending);
      setAdjudicatedPerformances(adjudicated);
    }
  }, [performances]);

  const getPerformances = async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: 'GET',
        url: `/api/performances/collect?eventID=${event.id}`,
      });

      setPerformances(formatPerformances(response.data));
    } catch (err) {
      snackbarError(err);
    }

    setLoading(false);
  };

  const addPerformance = async ({
    danceTitle,
    dancersString,
    choreographersString,
    performanceLink,
    school,
    competitionLevel,
    competitionLevelID,
    danceStyle,
    danceStyleID,
    danceSize,
    danceSizeID,
  }) => {
    setLoading(true);

    try {
      await axios({
        method: 'POST',
        url: '/api/performances/create',
        data: {
          danceTitle,
          performers: dancersString.split(',').map(dancer => dancer.trim()),
          choreographers: choreographersString
            .split(',')
            .map(choreographer => choreographer.trim()),
          performanceLink,
          schoolID: school,
          competitionLevel,
          competitionLevelID,
          danceStyle,
          danceStyleID,
          danceSize,
          danceSizeID,
          eventID: event.id,
        },
      });

      getPerformances();
    } catch (err) {
      snackbarError(err);
    }

    setLoading(false);
  };

  // Get initial filter options and performances
  useEffect(() => {
    if (event === null) {
      router.push('/');
    } else if (event) {
      getEvent();
      getFilters();
      getPerformances();
      // getAdjudications();
    }
  }, [event]);

  // Update table filters
  useEffect(() => {
    const updatedTableFilters = [];
    const activeSchoolFilters = getActiveFilters(schoolFilters);
    const activePerformanceLevelFilters = getActiveFilters(performanceLevelFilters);
    const activeDanceStyleFilters = getActiveFilters(danceStyleFilters);
    const activeDanceSizeFilters = getActiveFilters(danceSizeFilters);
    if (searchQuery) {
      updatedTableFilters.push({
        id: 'danceTitle',
        value: searchQuery,
      });
    }
    if (activeSchoolFilters.length > 0) {
      updatedTableFilters.push({
        id: 'schoolName',
        value: activeSchoolFilters.map(filter => filter.label), // For schools, need to filter by label, not schoolId due to Table accessor being `schoolName`
      });
    }
    if (activePerformanceLevelFilters.length > 0) {
      updatedTableFilters.push({
        id: 'performanceLevel',
        value: activePerformanceLevelFilters.map(filter => filter.label),
      });
    }
    if (activeDanceStyleFilters.length > 0) {
      updatedTableFilters.push({
        id: 'danceStyle',
        value: activeDanceStyleFilters.map(filter => filter.label),
      });
    }
    if (activeDanceSizeFilters.length > 0) {
      updatedTableFilters.push({
        id: 'danceSize',
        value: activeDanceSizeFilters.map(filter => filter.label),
      });
    }

    setTableFilters(updatedTableFilters);
    setPageNumber(0);
  }, [searchQuery, schoolFilters, performanceLevelFilters, danceStyleFilters, danceSizeFilters]);

  // Render active filter pills
  const renderActiveFilters = () => {
    const activeFilterPills = [];
    const activeSchoolFilters = getActiveFilters(schoolFilters);
    const activePerformanceLevelFilters = getActiveFilters(performanceLevelFilters);
    const activeDanceStyleFilters = getActiveFilters(danceStyleFilters);
    const activeDanceSizeFilters = getActiveFilters(danceSizeFilters);

    activeSchoolFilters.forEach(({ label, value }, i) => {
      activeFilterPills.push(
        <Pill
          key={`school-${i}`}
          label={label}
          onDelete={() => setSchoolFilters(removeFilter(schoolFilters, value))}
        />
      );
    });
    activePerformanceLevelFilters.forEach(({ label, value }, i) => {
      activeFilterPills.push(
        <Pill
          key={`performance-level-${i}`}
          label={label}
          onDelete={() => setPerformanceLevelFilters(removeFilter(performanceLevelFilters, value))}
        />
      );
    });
    activeDanceStyleFilters.forEach(({ label, value }, i) => {
      activeFilterPills.push(
        <Pill
          key={`dance-style-${i}`}
          label={label}
          onDelete={() => setDanceStyleFilters(removeFilter(danceStyleFilters, value))}
        />
      );
    });
    activeDanceSizeFilters.forEach(({ label, value }, i) => {
      activeFilterPills.push(
        <Pill
          key={`dance-size-${i}`}
          label={label}
          onDelete={() => setDanceSizeFilters(removeFilter(danceSizeFilters, value))}
        />
      );
    });

    return activeFilterPills;
  };

  return (
    <Layout>
      <div>
        <div className={styles.performances__navigation}>
          <BackButton href="/">Back to Events</BackButton>
        </div>
        <h2 className={styles.performances__eventName}>{eventName}</h2>
        <div className={styles.performances__header}>
          <div>
            <Title className={styles.performances__header__pageTitle}>Performances</Title>
            <Input
              className={styles.performances__header__search}
              placeholder="Search"
              icon={() => <img src={Search} />}
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
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
            {session.role === 'ADMIN' && (
              <Button variant="contained" onClick={() => setModalOpen(true)} disabled={loading}>
                Add Performance
              </Button>
            )}
          </div>
          <div>
            {performances.length > 0 && (
              <Pagination
                pageCount={pageCount}
                pageNumber={pageNumber}
                onPageChange={({ selected }) => setPageNumber(selected)}
              />
            )}
          </div>
        </div>
        {showFilters && (
          <div className={styles.performances__filters}>
            <div className={styles.performances__filters__buttons}>
              <FilterDropdown
                buttonText="School"
                options={schoolFilters}
                setOptions={setSchoolFilters}
              />
              <FilterDropdown
                buttonText="Performance Level"
                options={performanceLevelFilters}
                setOptions={setPerformanceLevelFilters}
              />
              <FilterDropdown
                buttonText="Style"
                options={danceStyleFilters}
                setOptions={setDanceStyleFilters}
              />
              <FilterDropdown
                buttonText="Size"
                options={danceSizeFilters}
                setOptions={setDanceSizeFilters}
              />
            </div>
            <div className={styles.performances__filters__appliedFilters}>
              {renderActiveFilters()}
            </div>
          </div>
        )}
        <div className={styles.performances__content}>
          <Tabs
            firstTabName={session.role === 'ADMIN' ? `Entry View` : `Needs Feedback`}
            secondTabName={session.role === 'ADMIN' ? `Judging View` : `Feedback Given`}
            firstTabContent={
              loading ? (
                <div className={styles.performances__loadingSpinner}>
                  <Loader type="Oval" color="#c90c0f" height={32} width={32} />
                </div>
              ) : (
                <PerformancesTable
                  performances={session.role === 'ADMIN' ? performances : pendingPerformances}
                  emptyPrompt={session.role === 'JUDGE' && 'No performances left to adjudicate'}
                  filters={tableFilters}
                  pageNumber={pageNumber}
                  setPageCount={setPageCount}
                  setPerformanceToEdit={setPerformanceToEdit}
                  setModalOpen={setModalOpen}
                  hiddenColumns={ENTRY_VIEW_HIDDEN_COLUMNS}
                />
              )
            }
            secondTabContent={
              loading ? (
                <div className={styles.performances__loadingSpinner}>
                  <Loader type="Oval" color="#c90c0f" height={32} width={32} />
                </div>
              ) : (
                <PerformancesTable
                  performances={session.role === 'ADMIN' ? performances : adjudicatedPerformances}
                  emptyPrompt={session.role === 'JUDGE' && ''}
                  filters={tableFilters}
                  pageNumber={pageNumber}
                  setPageCount={setPageCount}
                  hiddenColumns={JUDGING_VIEW_HIDDEN_COLUMNS}
                />
              )
            }
          />
        </div>
      </div>
      <AddPerformanceModal
        loading={loading}
        open={modalOpen}
        setOpen={setModalOpen}
        setLoading={setLoading}
        getPerformances={getPerformances}
        addPerformance={addPerformance}
        schoolOptions={schoolDropdownOptions}
        performanceLevelOptions={performanceLevelDropdownOptions}
        danceStyleOptions={danceStyleDropdownOptions}
        danceSizeOptions={danceSizeDropdownOptions}
        performanceToEdit={performanceToEdit}
        setPerformanceToEdit={setPerformanceToEdit}
      />
    </Layout>
  );
}

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
    props: {
      session,
    },
  };
}
