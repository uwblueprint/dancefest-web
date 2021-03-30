import React, { useState, useEffect } from 'react'; // React
import axios from 'axios';
import { useRouter } from 'next/router'; // Routing (with buttons)
import Link from 'next/link'; // Next link
import Loader from 'react-loader-spinner'; // Spinning loader
import Layout from '@components/Layout'; // Layout wrapper
import Navigation from '@containers/Navigation'; // Navigation state

import AwardModal from '@components/awards/AwardModal';
import Button from '@components/Button'; // Button
import Title from '@components/Title'; // Title
import Input from '@components/Input'; // Input
import Tabs from '@components/Tabs'; // Tabs
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
import styles from '@styles/pages/Awards.module.scss'; // Page styles

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

// Page: Awards
export default function Awards() {
  const router = useRouter();
  const { event } = Navigation.useContainer();

  const [modalOpen, setModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState('');
  const [danceTypeOptions, setDanceTypeOptions] = useState({});
  // All Filter
  const [filters, setFilters] = useState([]);
  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // Award Creation details
  const [, setAwardTitle] = useState('');

  // Award types, hardcoded for now
  const [awardTypeOptions, setAwardTypeOptions] = useState({});
  // Store response
  const [awardData, setAwardData] = useState();

  // Award Nominations, Finalized
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
        id: 'award_type',
        value: awardTypeFilters,
      });
    }
    if (danceTypeFilters.length > 0) {
      newFilters.push({
        id: 'dance_type',
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

  async function getAwards() {
    try {
      const resp = await axios({
        method: 'POST',
        url: '/api/awards/collect',
        data: {
          eventID: event,
        },
      });
      setAwardData(resp.data);
    } catch (err) {
      // Empty catch block
    }
  }

  useEffect(() => {
    getAwards();
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
              award.winner = perf.name;
            }
          });
          setFinalizedAwards(prevFinalized => [...prevFinalized, award]);
        } else {
          award.nominations = award.performances.length;
          setNominatedAwards(prevNominated => [...prevNominated, award]);
        }
      });
      setLoading(false);
    }
  }, [awardData]);

  useEffect(() => {
    async function nominate() {
      try {
        const resp = await axios({
          method: 'POST',
          url: '/api/performances/nominate',
          data: {
            performanceID: 2,
            awardIDs: [4],
          },
        });
        console.log('resp ' + resp);
      } catch (err) {
        // Empty catch block
        console.log('Something went wrong ' + err);
      }
    }

    async function finalize() {
      try {
        const resp = await axios({
          method: 'PUT',
          url: '/api/awards/finalize',
          data: {
            awardID: 1,
            performanceID: 4,
          },
        });
        console.log('resp ' + resp);
      } catch (err) {
        // Empty catch block
        console.log('Something went wrong ' + err);
      }
    }

    async function createAward(title) {
      try {
        await axios({
          url: '/api/awards/create',
          method: 'POST',
          data: {
            title: title,
          },
        });
      } catch (err) {
        // Empty catch block
        console.log('Error occured', err);
      }
    }
  }, []);

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
        {!loading ? (
          <div className={styles.performances__content}>
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
        setAwardTitle={setAwardTitle}
        submitAward={() => {}}
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
    console.log(row);
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
    console.log(row);
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
