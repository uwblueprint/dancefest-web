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
import FilterDropdown from '@components/FilterDropdown'; // Filter Dropdown
import Pill from '@components/Pill'; // Pill
import Pagination from '@components/Pagination'; // Pagination
import BackArrow from '@assets/back-arrow.svg'; // Back arrow icon
import Search from '@assets/search.svg'; // Search icon
import ChevronDown from '@assets/chevron-down.svg'; // Chevron down icon
import ChevronDownGrey from '@assets/chevron-down-grey.svg'; // Chevron down grey icon
import styles from '@styles/pages/Performances.module.scss'; // Page styles

const DANCE_ENTRY = 1; // TEMPORARY. TODO: Figure out what this is for
const EVENT_ID = 1; // TEMPORARY. TODO: REPLACE WITH STATE/STORE

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
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState('');

  // List options are for the modal selections. Options are for the filter dropdowns
  // TODO: Cleanup
  const [schoolListOptions, setSchoolListOptions] = useState([]);
  const [schoolOptions, setSchoolOptions] = useState({});
  const [academicLevelOptions, setAcademicLevelOptions] = useState({});
  const [performanceLevelListOptions, setPerformanceLevelListOptions] = useState([]);
  const [performanceLevelOptions, setPerformanceLevelOptions] = useState({});
  const [danceStyleListOptions, setDanceStyleListOptions] = useState([]);
  const [danceStyleOptions, setDanceStyleOptions] = useState({});
  const [danceSizeListOptions, setDanceSizeListOptions] = useState([]);
  const [danceSizeOptions, setDanceSizeOptions] = useState({});
  const [filters, setFilters] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [performances, setPerformances] = useState([]);
  const [performanceToEdit, setPerformanceToEdit] = useState(null);

  const getFilters = async () => {
    setLoading(true);

    try {
      const schoolOptionsResponse = await axios({
        method: 'GET',
        url: '/api/schools/collect',
      });
      const schools = schoolOptionsResponse.data;
      const initialSchoolListOptions = [];
      const initialSchoolOptions = {};
      for (const { id, school_name: schoolName } of schools) {
        initialSchoolListOptions.push({
          label: schoolName,
          value: id,
        });
        initialSchoolOptions[id] = {
          label: schoolName,
          selected: false,
        };
      }

      setSchoolListOptions(initialSchoolListOptions);
      setSchoolOptions(initialSchoolOptions);
    } catch {
      // Empty catch block
    }
    try {
      const settingOptionsResponse = await axios({
        method: 'GET',
        url: '/api/settings/collect',
      });
      const settings = settingOptionsResponse.data;
      const academicLevelSettings = {};
      const initialPerformanceLevelListOptions = [];
      const performanceLevelSettings = {};
      const initialDanceStyleListOptions = [];
      const danceStyleSettings = {};
      const initialDanceSizeListOptions = [];
      const danceSizeSettings = {};
      for (const setting of settings) {
        switch (setting.type) {
          case 'COMPETITION_LEVEL':
            initialPerformanceLevelListOptions.push({ label: setting.value, value: setting.value });
            performanceLevelSettings[setting.value] = {
              label: setting.value,
              selected: false,
            };
            break;
          case 'STYLE':
            initialDanceStyleListOptions.push({ label: setting.value, value: setting.value });
            danceStyleSettings[setting.value] = {
              label: setting.value,
              selected: false,
            };
            break;
          case 'DANCE_SIZE':
            initialDanceSizeListOptions.push({ label: setting.value, value: setting.value });
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
      setPerformanceLevelListOptions(initialPerformanceLevelListOptions);
      setPerformanceLevelOptions(performanceLevelSettings);
      setDanceStyleListOptions(initialDanceStyleListOptions);
      setDanceStyleOptions(danceStyleSettings);
      setDanceSizeListOptions(initialDanceSizeListOptions);
      setDanceSizeOptions(danceSizeSettings);
    } catch {
      // Empty catch block
    }

    setLoading(false);
  };

  const getPerformances = async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: 'GET',
        url: `/api/performances/collect?eventID=${EVENT_ID}`,
      });
      const performancesData = response.data;

      setPerformances(performancesData);
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
            firstTabContent={
              loading ? (
                <div className={styles.performances__loadingSpinner}>
                  <Loader type="Oval" color="#c90c0f" height={32} width={32} />
                </div>
              ) : (
                <EntryTable
                  performances={performances}
                  filters={filters}
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
        schoolOptions={schoolListOptions}
        performanceLevelOptions={performanceLevelListOptions}
        danceStyleOptions={danceStyleListOptions}
        danceSizeOptions={danceSizeListOptions}
        performanceToEdit={performanceToEdit}
        setPerformanceToEdit={setPerformanceToEdit}
      />
    </Layout>
  );
}
