import React, { useState, useEffect } from 'react'; // React
import axios from 'axios'; // axios
import Link from 'next/link'; // Next link
import Layout from '@components/Layout'; // Layout wrapper

import EntryTable from '@components/performances/EntryTable'; // Entry view table
import JudgingTable from '@components/performances/JudgingTable'; // Judging view table
import PerformanceModal from '@components/performances/PerformanceModal'; // Performance modal

import Loader from 'react-loader-spinner'; // Loading spinner
import Button from '@components/Button'; // Button
import Title from '@components/Title'; // Title
import Input from '@components/Input'; // Input
import Tabs from '@components/Tabs'; // Tabs
import { formatDropdownOptions } from '@components/Dropdown'; // Format dropdown options util
import FilterDropdown, { formatFilterDropdownOptions } from '@components/FilterDropdown'; // Filter Dropdown + Format filter dropdown options util
import Pill from '@components/Pill'; // Pill
import Pagination from '@components/Pagination'; // Pagination
import BackArrow from '@assets/back-arrow.svg'; // Back arrow icon
import Search from '@assets/search.svg'; // Search icon
import ChevronDown from '@assets/chevron-down.svg'; // Chevron down icon
import ChevronDownGrey from '@assets/chevron-down-grey.svg'; // Chevron down grey icon
import styles from '@styles/pages/Performances.module.scss'; // Page styles

import { formatSchools } from '@utils/schools'; // Format schools util
import { formatPerformances } from '@utils/performances'; // Format performances util

const DANCE_ENTRY = 1; // TEMPORARY. TODO: Figure out what this is for
const EVENT_ID = 1; // TEMPORARY. TODO: REPLACE WITH STATE/STORE

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
 * @param {Object} object - An object
 * @param {*} key - A key in the object
 * @returns {Object} A new object that is a copy of the `object` parameter with the `key` removed
 */
const removeKeyFromObject = (object, key) => {
  // eslint-disable-next-line no-unused-vars
  const { [key]: _, ...rest } = object;
  return rest;
};

// Page: Performances
export default function Performances() {
  const [loading, setLoading] = useState(false); // Loading
  const [modalOpen, setModalOpen] = useState(false); // Modal open
  const [showFilters, setShowFilters] = useState(false); // Show filter dropdowns
  const [searchQuery, setSearchQuery] = useState(''); // Search query string

  // Filter dropdown options
  const [schoolFilters, setSchoolFilters] = useState({});
  const [academicLevelFilters, setAcademicLevelFilters] = useState({});
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
      } catch {
        // Empty catch block
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
        value: 'value',
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

  const getPerformances = async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: 'GET',
        url: `/api/performances/collect?eventID=${EVENT_ID}`,
      });
      setPerformances(formatPerformances(response.data));
    } catch {
      // Empty catch block
    }

    setLoading(false);
  };

  const addPerformance = async ({
    danceTitle,
    dancersString,
    choreographersString,
    school,
    competitionLevel,
    danceStyle,
    danceSize,
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
          schoolID: school,
          competitionLevel,
          danceStyle,
          danceSize,
          eventID: EVENT_ID,
          danceEntry: DANCE_ENTRY,
        },
      });

      getPerformances();
    } catch {
      // Empty catch block
    }

    setLoading(false);
  };

  // Get initial filter options and performances
  useEffect(() => {
    getFilters();
    getPerformances();
  }, []);

  // Update table filters
  useEffect(() => {
    const updatedTableFilters = [];
    const activeSchoolFilters = getActiveFilters(schoolFilters);
    const activeAcademicLevelFilters = getActiveFilters(academicLevelFilters);
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
    if (activeAcademicLevelFilters.length > 0) {
      updatedTableFilters.push({
        id: 'academicLevel',
        value: activeAcademicLevelFilters.map(filter => filter.value),
      });
    }
    if (activePerformanceLevelFilters.length > 0) {
      updatedTableFilters.push({
        id: 'performanceLevel',
        value: activePerformanceLevelFilters.map(filter => filter.value),
      });
    }
    if (activeDanceStyleFilters.length > 0) {
      updatedTableFilters.push({
        id: 'danceStyle',
        value: activeDanceStyleFilters.map(filter => filter.value),
      });
    }
    if (activeDanceSizeFilters.length > 0) {
      updatedTableFilters.push({
        id: 'danceSize',
        value: activeDanceSizeFilters.map(filter => filter.value),
      });
    }

    setTableFilters(updatedTableFilters);
    setPageNumber(0);
  }, [
    searchQuery,
    schoolFilters,
    academicLevelFilters,
    performanceLevelFilters,
    danceStyleFilters,
    danceSizeFilters,
  ]);

  // Render active filter pills
  const renderActiveFilters = () => {
    const activeFilterPills = [];
    const activeSchoolFilters = getActiveFilters(schoolFilters);
    const activeAcademicLevelFilters = getActiveFilters(academicLevelFilters);
    const activePerformanceLevelFilters = getActiveFilters(performanceLevelFilters);
    const activeDanceStyleFilters = getActiveFilters(danceStyleFilters);
    const activeDanceSizeFilters = getActiveFilters(danceSizeFilters);

    activeSchoolFilters.forEach(({ label, value }, i) => {
      activeFilterPills.push(
        <Pill
          key={i}
          label={label}
          onDelete={() => setSchoolFilters(removeKeyFromObject(schoolFilters, value))}
        />
      );
    });
    activeAcademicLevelFilters.forEach(({ label, value }, i) => {
      activeFilterPills.push(
        <Pill
          key={i}
          label={label}
          onDelete={() => setAcademicLevelFilters(removeKeyFromObject(academicLevelFilters, value))}
        />
      );
    });
    activePerformanceLevelFilters.forEach(({ label, value }, i) => {
      activeFilterPills.push(
        <Pill
          key={i}
          label={label}
          onDelete={() =>
            setPerformanceLevelFilters(removeKeyFromObject(performanceLevelFilters, value))
          }
        />
      );
    });
    activeDanceStyleFilters.forEach(({ label, value }, i) => {
      activeFilterPills.push(
        <Pill
          key={i}
          label={label}
          onDelete={() => setDanceStyleFilters(removeKeyFromObject(danceStyleFilters, value))}
        />
      );
    });
    activeDanceSizeFilters.forEach(({ label, value }, i) => {
      activeFilterPills.push(
        <Pill
          key={i}
          label={label}
          onDelete={() => setDanceSizeFilters(removeKeyFromObject(danceSizeFilters, value))}
        />
      );
    });

    return activeFilterPills;
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
            <Button variant="contained" onClick={() => setModalOpen(true)}>
              Add Performance
            </Button>
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
                buttonText="Academic Level"
                options={academicLevelFilters}
                setOptions={setAcademicLevelFilters}
              />
              <FilterDropdown
                buttonText="Competition Level"
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
            firstTabName="Entry View"
            secondTabName="Judging View"
            firstTabContent={
              loading ? (
                <div className={styles.performances__loadingSpinner}>
                  <Loader type="Oval" color="#c90c0f" height={32} width={32} />
                </div>
              ) : (
                <EntryTable
                  performances={performances}
                  filters={tableFilters}
                  pageNumber={pageNumber}
                  setPageCount={setPageCount}
                  setPerformanceToEdit={setPerformanceToEdit}
                  setModalOpen={setModalOpen}
                />
              )
            }
            secondTabContent={
              loading ? (
                <Loader type="Oval" color="#c90c0f" height={32} width={32} />
              ) : (
                <JudgingTable />
              )
            }
          />
        </div>
      </div>
      <PerformanceModal
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
