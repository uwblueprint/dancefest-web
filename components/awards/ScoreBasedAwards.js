import React, { useState, useEffect } from 'react'; // React
import Layout from '@components/Layout'; // Layout wrapper

import Title from '@components/Title'; // Title
import Input from '@components/Input'; // Input
import Tabs from '@components/Tabs'; // Tabs
import Table from '@components/Table'; // Table
import Pagination from '@components/Pagination'; // Pagination
import Search from '@assets/search.svg'; // Search icon
import DancerRedJump from '@assets/dancer-red-jump.svg'; // Jumping Dancer SVG
import DancerYellowBlue from '@assets/dancer-yellow-blue.svg'; // Jumping Dancer SVG
import styles from '@styles/pages/Performances.module.scss'; // Page styles

// Temp constants
import events, { columns } from '../../data/mockParticipants';

const PAGE_SIZE = 8; // Rows per page

// Page: Performances
export default function Performances() {
  const [query, setQuery] = useState('');
  // All Filter
  const [filters, setFilters] = useState([]);
  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);

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

  return (
    <Layout>
      <div>
        <div className={styles.performances__navigation}>
          <h2 className={styles.performances__navigation__eventName}>
            {`OSSDF2021- Let's Dis-dance`}
          </h2>
        </div>
        <div className={styles.performances__header}>
          <div>
            <Title
              className={styles.performances__header__pageTitle}
            >{`Most Outstanding Choreography Novice Duet/Trio`}</Title>
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
          <Tabs
            firstTabName="Entry View"
            secondTabName="Judging View"
            firstTabContent={<EntryTable filters={[]} />}
            secondTabContent={
              <JudgingTable filters={filters} pageNumber={pageNumber} setPageCount={setPageCount} />
            }
          />
        </div>
      </div>
    </Layout>
  );
}

// Entries Table
const EntryTable = () => {
  return (
    <Table columns={columns} data={[]} filters={[]} emptyComponent={<EmptyTableComponent />} />
  );
};

// Judging Table
const JudgingTable = props => {
  const columns = [
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Tech. Score',
      accessor: 'tech_score',
      Cell: ({ value }) => (value !== null ? String(value) : 'N/A'),
    },
    {
      Header: 'Art. Score',
      accessor: 'art_score',
      Cell: ({ value }) => (value !== null ? String(value) : 'N/A'),
    },
    {
      Header: 'Cumul. Score',
      accessor: 'cumul_score',
      Cell: ({ value }) => (value !== null ? String(value) : 'N/A'),
    },
    {
      Header: 'Awards',
      accessor: 'awards',
    },
  ];

  return (
    <Table
      columns={columns}
      data={events}
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
