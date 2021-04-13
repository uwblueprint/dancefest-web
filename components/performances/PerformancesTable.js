import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import { useRouter } from 'next/router'; // Routing

import JudgingStatusPill from '@components/performances/JudgingStatusPill'; // Judging status pill
import EmptyTableComponent from '@components/performances/EmptyTableComponent'; // Empty table component
import Table from '@components/Table'; // Table

const PAGE_SIZE = 20; // Rows per page

export default function PerformancesTable({ performances, emptyPrompt, ...props }) {
  const router = useRouter();

  const columns = [
    {
      Header: 'Title',
      accessor: 'danceTitle',
    },
    // Entry View columns
    {
      Header: 'School',
      accessor: 'schoolName',
      filter: 'matchEnum',
    },
    {
      Header: 'Perf. Lvl',
      accessor: 'performanceLevel',
      filter: 'matchEnum',
    },
    {
      Header: 'Style',
      accessor: 'danceStyle',
      filter: 'matchEnum',
    },
    {
      Header: 'Size',
      accessor: 'danceSize',
      filter: 'matchEnum',
    },
    // Judging view columns
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
      Cell: ({ value }) => String(value) || 'N/A',
    },
    {
      Header: 'Status',
      accessor: 'status',
      // eslint-disable-next-line react/display-name
      Cell: ({
        row: {
          original: { completedAdjudications, totalAdjudications },
        },
      }) => (
        <JudgingStatusPill
          completedAdjudications={completedAdjudications}
          totalAdjudications={totalAdjudications}
        />
      ),
    },
  ];

  const goToPerformanceDetails = row => {
    router.push(`/performances/${row.original.id}`); // Route to "/performance/:id" page
  };

  return (
    <Table
      columns={columns}
      data={performances}
      pageSize={PAGE_SIZE}
      emptyComponent={<EmptyTableComponent prompt={emptyPrompt} />}
      initialSort={[{ id: 'id' }]}
      onRowClick={goToPerformanceDetails}
      clickable
      {...props}
    />
  );
}

PerformancesTable.propTypes = {
  performances: PropTypes.any,
  setModalOpen: PropTypes.func,
  setPerformanceToEdit: PropTypes.func,
};
