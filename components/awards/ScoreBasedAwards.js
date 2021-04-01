import React, { useState, useEffect } from 'react'; // React
import { useRouter } from 'next/router'; // Collect Router
import axios from 'axios'; // Axios
import Layout from '@components/Layout'; // Layout wrapper

import Navigation from '@containers/Navigation'; // Navigation state
import Loader from 'react-loader-spinner'; // Spinning loader
import Title from '@components/Title'; // Title
import Input from '@components/Input'; // Input
import Tabs from '@components/Tabs'; // Tabs
import Table from '@components/Table'; // Table
import Modal from '@components/Modal.js'; // Modal
import Pagination from '@components/Pagination'; // Pagination
import Search from '@assets/search.svg'; // Search icon
import DancerRedJump from '@assets/dancer-red-jump.svg'; // Jumping Dancer SVG
import DancerYellowBlue from '@assets/dancer-yellow-blue.svg'; // Jumping Dancer SVG
import styles from '@styles/pages/Awards.module.scss'; // Page styles
import { formatPerformances } from '@utils/performances'; // Format performances util
import AwardPill from '@components/awards/FinalizePill.js'; // Award Finalize Pill

const PAGE_SIZE = 20; // Rows per page

// Page: Performances
export default function Performances({ award }) {
  const { event } = Navigation.useContainer();

  const router = useRouter();

  const [query, setQuery] = useState('');
  // All Filter
  const [filters, setFilters] = useState([]);
  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // Performances
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState([]);

  // Confirmation Modal
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [performanceToFinalize, setPerformanceToFinalize] = useState(-1);

  // Get peformances on load
  useEffect(() => {
    getPerformances();
  }, [event]);

  const getPerformances = async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: 'GET',
        url: `/api/performances/collect?eventID=${event}`,
      });

      setPerformances(formatPerformances(response.data));
    } catch (err) {
      // Empty catch block
    }

    setLoading(false);
  };

  // Update table filters
  useEffect(() => {
    const newFilters = [];
    if (query) {
      newFilters.push({
        id: 'title',
        value: query,
      });
    }
    setFilters(newFilters);
    setPageNumber(0);
  }, [query]);

  async function nominate() {
    try {
      await axios({
        method: 'POST',
        url: '/api/performances/nominate',
        data: {
          performanceID: performanceToFinalize,
          awardIDs: [award.id],
        },
      });
    } catch {
      // Empty catch block
    }
  }

  async function finalizeAward() {
    try {
      await axios({
        method: 'POST',
        url: '/api/awards/finalize',
        data: {
          awardID: award.id,
          performanceID: performanceToFinalize,
        },
      });

      router.push('/awards');
    } catch {
      // Empty catch block
    }
  }

  return (
    <Layout>
      <div>
        <div className={styles.performances__navigation}>
          <h2 className={styles.performances__navigation__eventName}>{`EVENT NAME`}</h2>
        </div>
        <div className={styles.performances__header}>
          <div>
            <Title className={styles.performances__header__pageTitle}>{award.title}</Title>
            <Input
              className={styles.performances__header__search}
              placeholder="Search"
              icon={() => <img src={Search} />}
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          </div>
          <div>
            <Pagination
              pageCount={pageCount}
              pageNumber={pageNumber}
              onPageChange={({ selected }) => setPageNumber(selected)}
            />
          </div>
        </div>
        <div className={styles.performances__content}>
          {!loading ? (
            <Tabs
              firstTabName="Entry View"
              secondTabName="Judging View"
              selected={1}
              firstTabContent={
                <EntryTable
                  performances={performances}
                  setConfirmationModalOpen={setConfirmationModalOpen}
                  setPerformanceToFinalize={setPerformanceToFinalize}
                  filters={[]}
                  pageNumber={pageNumber}
                  setPageCount={setPageCount}
                />
              }
              secondTabContent={
                <JudgingTable
                  performances={performances}
                  setConfirmationModalOpen={setConfirmationModalOpen}
                  setPerformanceToFinalize={setPerformanceToFinalize}
                  filters={filters}
                  pageNumber={pageNumber}
                  setPageCount={setPageCount}
                />
              }
            /> // All else, if still loading, display loader
          ) : (
            <div className={styles.awards__loader}>
              <Loader type="Oval" color="#c90c0f" height={80} width={80} />
            </div>
          )}
        </div>
      </div>
      <Modal
        containerClassName={styles.confirmation__modal}
        title={`Select Winner?`}
        open={confirmationModalOpen}
        cancelText="Cancel"
        submitText="Confirm"
        setModalOpen={setConfirmationModalOpen}
        onCancel={() => setConfirmationModalOpen(false)}
        onSubmit={() => {
          nominate(); // TODO: this is a janky move - maybe handle it better on the backend?
          setTimeout(() => {
            finalizeAward();
          }, 500);
          setPerformanceToFinalize(-1);
        }}
      >
        <p>This award will now be shown in the “Finalized” tab.</p>
      </Modal>
    </Layout>
  );
}

// Entries Table
const EntryTable = ({
  performances,
  setConfirmationModalOpen,
  setPerformanceToFinalize,
  ...props
}) => {
  const columns = [
    {
      Header: 'Title',
      accessor: 'name',
    },
    {
      Header: 'School',
      accessor: 'schoolName',
    },
    {
      Header: 'Perf. Level',
      accessor: 'performanceLevel',
      Cell: ({ value }) => (value !== null ? String(value) : 'N/A'),
    },
    {
      Header: 'Style',
      accessor: 'danceStyle',
      Cell: ({ value }) => (value !== null ? String(value) : 'N/A'),
    },
    {
      Header: 'Size',
      accessor: 'danceSize',
      Cell: ({ value }) => (value !== null ? String(value) : 'N/A'),
    },
    {
      accessor: 'finalize',
      // eslint-disable-next-line react/display-name
      Cell: ({ row: { original } }) => (
        <AwardPill
          onSelectWinner={() => {
            setConfirmationModalOpen(true);
            setPerformanceToFinalize(original.id);
          }}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={performances}
      filters={[]}
      emptyComponent={<EmptyTableComponent />}
      {...props}
    />
  );
};

// Judging Table
const JudgingTable = ({
  performances,
  setConfirmationModalOpen,
  setPerformanceToFinalize,
  ...props
}) => {
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Title',
      accessor: 'name',
    },
    {
      Header: 'Tech. Score',
      accessor: 'technicalScore',
      Cell: ({ value }) => (value !== null ? String(value) : 'N/A'),
    },
    {
      Header: 'Art. Score',
      accessor: 'artisticScore',
      Cell: ({ value }) => (value !== null ? String(value) : 'N/A'),
    },
    {
      Header: 'Cumul. Score',
      accessor: 'cumulativeScore',
      Cell: ({ value }) => (value !== null ? String(value) : 'N/A'),
    },
    {
      Header: 'Awards',
      accessor: 'awardsString',
      Cell: ({ value }) => (value !== '' ? String(value) : 'N/A'),
    },
    {
      accessor: 'finalize',
      // eslint-disable-next-line react/display-name
      Cell: ({ row: { original } }) => (
        <AwardPill
          onSelectWinner={() => {
            setPerformanceToFinalize(original.id);
            setConfirmationModalOpen(true);
          }}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={performances}
      pageSize={PAGE_SIZE}
      emptyComponent={<EmptyTableComponent />}
      {...props}
    />
  );
};

const EmptyTableComponent = () => {
  return (
    <div className={styles.page__performances_list_empty}>
      <img src={DancerYellowBlue} />
      <div>
        <h2>No Nominations Listed</h2>
        <h3>Nominate some performances for this award</h3>
      </div>
      <img src={DancerRedJump} />
    </div>
  );
};
