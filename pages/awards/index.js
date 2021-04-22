import React, { useState, useEffect } from 'react'; // React
import axios from 'axios';
import { useRouter } from 'next/router'; // Routing (with buttons)
import { getSession } from 'next-auth/client'; // Session handling
import Loader from 'react-loader-spinner'; // Spinning loader
import Layout from '@components/Layout'; // Layout wrapper
import Event from '@containers/Event'; // Event state

import { formatDropdownOptions } from '@components/Dropdown'; // Format dropdown options util
import AwardModal from '@components/awards/AwardModal';
import Button from '@components/Button'; // Button
import Title from '@components/Title'; // Title
import Input from '@components/Input'; // Input
import Tabs from '@components/Tabs'; // Tabs
import FilterDropdown, { formatFilterDropdownOptions } from '@components/FilterDropdown'; // Filter Dropdown
import Table from '@components/Table'; // Table
import Pagination from '@components/Pagination'; // Pagination
import BackButton from '@components/BackButton';
import Search from '@assets/search.svg'; // Search icon
import ChevronDown from '@assets/chevron-down.svg'; // Chevron down icon
import ChevronDownGrey from '@assets/chevron-down-grey.svg'; // Chevron down grey icon
import DancerRedJump from '@assets/dancer-red-jump.svg'; // Jumping Dancer SVG
import DancerYellowBlue from '@assets/dancer-yellow-blue.svg'; // Jumping Dancer SVG
import styles from '@styles/pages/Awards.module.scss'; // Page styles

import useSnackbar from '@utils/useSnackbar'; // Snackbar

const PAGE_SIZE = 20; // Rows per page

// Get the active filters (list of column accessors) from an object of filter dropdown values
// const getActiveFilters = options => {
//   return Object.keys(options).filter(option => options[option].selected);
// };

// Remove key from object (returns new object)
// const removeKeyFromObject = (object, key) => {
//   // eslint-disable-next-line no-unused-vars
//   const { [key]: _, ...rest } = object;
//   return rest;
// };

const awardOptions = [
  {
    value: 'SCORE_BASED',
    label: 'Score Based',
  },
  {
    value: 'DANCE_ARTISTRY',
    label: 'Dance Artistry',
  },
];

// Page: Awards
export default function Awards({ session }) {
  const { snackbarError } = useSnackbar();
  const router = useRouter(); // collect router
  const [event] = Event.useContainer(); // get event from global state

  // Modal
  const [modalOpen, setModalOpen] = useState(false);

  // Options
  // Filter dropdown options
  const [performanceLevelFilters, setPerformanceLevelFilters] = useState({});
  const [danceSizeFilters, setDanceSizeFilters] = useState({});

  // Modal dropdown options
  const [performanceLevelDropdownOptions, setPerformanceLevelDropdownOptions] = useState([]);
  const [danceSizeDropdownOptions, setDanceSizeDropdownOptions] = useState([]);
  const [awardTypeDropdownOptions] = useState(awardOptions);
  const [danceStyleDropdownOptions, setDanceStyleDropdownOptions] = useState([]);

  // All Filter
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState([]);
  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // API response
  const [awardData, setAwardData] = useState();
  // Award Nominations, Finalized data
  const [nominatedAwards, setNominatedAwards] = useState([]);
  const [finalizedAwards, setFinalizedAwards] = useState([]);

  // Loading State
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (event === null) {
      router.push('/');
    }
  }, [event]);

  // Update table filters
  useEffect(() => {
    const newFilters = [];
    // const activeSizeFilters = getActiveFilters(danceSizeFilters);
    // const activePerfFilters = getActiveFilters(performanceLevelFilters);

    if (query) {
      newFilters.push({
        id: 'title',
        value: query,
      });
    }

    setFilters(newFilters);
    setPageNumber(0);
  }, [query]);

  const getSettings = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: '/api/settings/collect',
      });
      const settings = response.data;

      const performanceLevelSettings = settings.filter(
        setting => setting.type === 'COMPETITION_LEVEL'
      );
      const danceSizeSettings = settings.filter(setting => setting.type === 'DANCE_SIZE');

      const danceStyleSettings = settings.filter(setting => setting.type === 'STYLE');

      const formatOptionsFields = {
        value: 'id',
        label: 'value',
      };

      // Modal dropdown options
      const initialPerformanceLevelDropdownOptions = formatDropdownOptions(
        performanceLevelSettings,
        formatOptionsFields
      );
      const initialDanceSizeDropdownOptions = formatDropdownOptions(
        danceSizeSettings,
        formatOptionsFields
      );
      const initialDanceStyleDropdownOptions = formatDropdownOptions(
        danceStyleSettings,
        formatOptionsFields
      );
      // Add none option
      initialPerformanceLevelDropdownOptions.unshift({ label: 'None', value: -1 });
      initialDanceSizeDropdownOptions.unshift({ label: 'None', value: -1 });
      initialDanceStyleDropdownOptions.unshift({ label: 'None', value: -1 });
      setPerformanceLevelDropdownOptions(initialPerformanceLevelDropdownOptions);
      setDanceSizeDropdownOptions(initialDanceSizeDropdownOptions);
      setDanceStyleDropdownOptions(initialDanceStyleDropdownOptions);

      // Filters
      const initialPerformanceLevelFilters = formatFilterDropdownOptions(
        performanceLevelSettings,
        formatOptionsFields
      );
      const initialDanceSizeFilters = formatFilterDropdownOptions(
        danceSizeSettings,
        formatOptionsFields
      );

      setPerformanceLevelFilters(initialPerformanceLevelFilters);
      setDanceSizeFilters(initialDanceSizeFilters);
    } catch (err) {
      snackbarError(err);
    }
  };

  // Collect all awards
  async function getAwards() {
    // Clear existing finalized and nominated awards
    setFinalizedAwards([]);
    setNominatedAwards([]);
    try {
      const resp = await axios({
        method: 'POST',
        url: `/api/awards/collect?eventID=${event.id}`,
      });

      setAwardData(resp.data);
    } catch (err) {
      snackbarError(err);
    }
  }

  useEffect(() => {
    getAwards();
    getSettings();
  }, [event]);

  // Clean up API Response
  useEffect(() => {
    if (awardData) {
      awardData.forEach(award => {
        // Award Type
        if (award.type === 'SPECIAL') {
          award.type = 'Special Award';
        } else if (award.type === 'SCORE_BASED') {
          award.type = 'Score Based';
        } else {
          award.type = 'Dance Artistry';
        }
        // Filter based on award status
        if (award.is_finalized) {
          award.performances.forEach(perf => {
            if (perf.status === 'FINALIST') {
              award.winner = perf.dance_title;
            }
          });
          setFinalizedAwards(prevFinalized => [...prevFinalized, award]);
        } else {
          if (award.type === 'Score Based') {
            award.nominations = 'N/A';
          } else {
            award.nominations = award.performances.length;
          }
          // If judge view - don't show score based award
          if (session.role === 'JUDGE' && award.type === 'Score Based') {
            return;
          }
          setNominatedAwards(prevNominated => [...prevNominated, award]);
        }
      });

      setLoading(false);
    }
  }, [awardData]);

  const createAward = async (
    awardTitle,
    awardType,
    danceSizeOption = null,
    performanceLevelOption = null,
    danceStyleOption = null
  ) => {
    setLoading(true);
    const settingIds = [];
    if (danceSizeOption !== null && danceSizeOption !== -1) settingIds.push(danceSizeOption);
    if (performanceLevelOption !== null && performanceLevelOption !== -1)
      settingIds.push(performanceLevelOption);
    if (danceStyleOption !== null && danceStyleOption !== -1) settingIds.push(danceStyleOption);

    try {
      await axios({
        url: '/api/awards/create',
        method: 'POST',
        data: {
          title: awardTitle,
          type: awardType,
          eventID: event.id,
          settingIDs: settingIds,
        },
      });
    } catch (err) {
      snackbarError(err);
    }
    await getAwards();
    setLoading(false);
  };

  return (
    <Layout>
      <div>
        <div className={styles.performances__navigation}>
          <BackButton href="/">Back to Events</BackButton>
          <h2 className={styles.performances__navigation__eventName}>{event ? event.name : ''}</h2>
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
            {session.role === 'ADMIN' && (
              <Button variant="contained" onClick={() => setModalOpen(true)} disabled={loading}>
                Add Award
              </Button>
            )}
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
                buttonText="Dance Size"
                options={danceSizeFilters}
                setOptions={setDanceSizeFilters}
              />
              <FilterDropdown
                buttonText="Performance Level"
                options={performanceLevelFilters}
                setOptions={setPerformanceLevelFilters}
              />
            </div>
            {/* <div className={styles.performances__filters__appliedFilters}>
              {renderActiveFilters()}
            </div> */}
          </div>
        )}
        {!loading ? (
          <div className={styles.performances__content}>
            {session.role == 'ADMIN' ? (
              <Tabs
                firstTabName="Nominations"
                secondTabName="Finalized"
                firstTabContent={
                  <NominationTable
                    nominatedAwards={nominatedAwards}
                    filters={filters}
                    pageNumber={pageNumber}
                    setPageCount={setPageCount}
                    clickable
                  />
                }
                secondTabContent={<FinalizedTable finalizedAwards={finalizedAwards} clickable />}
              />
            ) : (
              <div className={styles.awards__judge_table}>
                <NominationTable
                  nominatedAwards={nominatedAwards}
                  filters={filters}
                  pageNumber={pageNumber}
                  setPageCount={setPageCount}
                  clickable
                />
              </div>
            )}
          </div>
        ) : (
          // All else, if still loading, display loader
          <div className={styles.awards__loader}>
            <Loader type="Oval" color="#c90c0f" height={80} width={80} />
          </div>
        )}
      </div>

      <AwardModal
        mode="new"
        open={modalOpen}
        setOpen={setModalOpen}
        danceSizeOptions={danceSizeDropdownOptions}
        performanceLevelOptions={performanceLevelDropdownOptions}
        awardTypeOptions={awardTypeDropdownOptions}
        danceStyleOptions={danceStyleDropdownOptions}
        createAward={createAward}
        loading={loading}
      />
    </Layout>
  );
}

// Entries Table
const NominationTable = ({ nominatedAwards, ...props }) => {
  const router = useRouter(); // Collect router

  const columns = [
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
    router.push(`/awards/${row.original.id}`); // Route to "/performance/:id" page
  };

  return (
    <Table
      columns={columns}
      data={nominatedAwards}
      pageSize={PAGE_SIZE}
      emptyComponent={<EmptyTableComponent />}
      onRowClick={goToPerformanceDetails}
      {...props}
    />
  );
};

// Judging Table
const FinalizedTable = ({ finalizedAwards, ...props }) => {
  const router = useRouter(); // Collect router

  const columns = [
    {
      Header: 'Award Title',
      accessor: 'title',
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
    {
      Header: 'Winner',
      accessor: 'winner',
    },
  ];

  const goToPerformanceDetails = row => {
    router.push(`/awards/${row.original.id}`); // Route to "/performance/:id" page
  };

  return (
    <Table
      columns={columns}
      data={finalizedAwards}
      filters={[]}
      emptyComponent={<EmptyTableComponent />}
      onRowClick={goToPerformanceDetails}
      {...props}
    />
  );
};

const EmptyTableComponent = () => {
  return (
    <div className={styles.page__performances_list_empty}>
      <img src={DancerYellowBlue} />
      <div>
        <h2>No Awards Listed</h2>
        <h3>Create an award!</h3>
      </div>
      <img src={DancerRedJump} />
    </div>
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
    props: {
      session,
    },
  };
}
