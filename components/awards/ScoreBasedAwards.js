import React, { useState, useEffect } from 'react'; // React
import { useRouter } from 'next/router'; // Collect Router
import axios from 'axios'; // Axios
import Layout from '@components/Layout'; // Layout wrapper

import Event from '@containers/Event'; // Event state
import Loader from 'react-loader-spinner'; // Spinning loader
import Button from '@components/Button'; // Button
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
import BackButton from '@components/BackButton';

import useSnackbar from '@utils/useSnackbar'; // Snackbar

const PAGE_SIZE = 20; // Rows per page

// Page: Performances
export default function Performances({ award, session }) {
  const { snackbarError } = useSnackbar();
  const [event] = Event.useContainer();

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

  // Delete award confirmation modal
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);

  // Get peformances on load
  useEffect(() => {
    getPerformances();
  }, [event]);

  const getPerformances = async () => {
    setLoading(true);

    // NOTE: If we know the specific award category, we can pass in 3 params (competition_level_id, dance_size_id, dance_level_id)
    let performanceUrl = `/api/performances/collect?eventID=${event.id}`;
    if (award.awards_categories && award.awards_categories.length !== 0) {
      performanceUrl += `&settingIDs=${award.awards_categories.join(',')}`;
    }

    try {
      const response = await axios({
        method: 'GET',
        url: performanceUrl,
      });

      setPerformances(formatPerformances(response.data));
    } catch (err) {
      snackbarError(err);
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
    setLoading(true);

    try {
      await axios({
        method: 'POST',
        url: '/api/performances/nominate',
        data: {
          performanceID: performanceToFinalize,
          awardIDs: [award.id],
          eventID: event.id,
        },
      });
    } catch (err) {
      snackbarError(err);
    }

    setLoading(false);
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
    } catch (err) {
      snackbarError(err);
    }
  }

  async function deleteAward() {
    setLoading(true);
    try {
      await axios({
        method: 'PUT',
        url: '/api/awards/delete',
        data: {
          id: award.id,
        },
      });
      // Go back to awards
      router.push('/awards');
    } catch (err) {
      snackbarError(err);
    }
  }

  return (
    <Layout>
      <div>
        <div>
          <BackButton href="/awards">Back to Awards</BackButton>
        </div>
        <div className={styles.performances__navigation}>
          <h2 className={styles.performances__navigation__eventName}>{event ? event.name : ''}</h2>
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
            {session.role === 'ADMIN' && (
              <Button
                className={styles.performances__delete_pagination_container}
                onClick={() => setDeleteConfirmationModalOpen(true)}
                disabled={loading}
              >
                Delete Award
              </Button>
            )}
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
        disableSubmitButton={loading}
      >
        <p>This award will now be shown in the “Finalized” tab.</p>
      </Modal>
      <Modal
        containerClassName={styles.confirmation__modal}
        title="Delete Award?"
        open={deleteConfirmationModalOpen}
        cancelText="Cancel"
        submitText="Confirm"
        setModalOpen={setDeleteConfirmationModalOpen}
        onCancel={() => setDeleteConfirmationModalOpen(false)}
        onSubmit={deleteAward}
        disableSubmitButton={loading}
      >
        <p>Are you sure you want to delete this award?</p>
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
      accessor: 'danceTitle',
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
      Header: 'Title',
      accessor: 'danceTitle',
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
      Header: 'Nominated Awards',
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
