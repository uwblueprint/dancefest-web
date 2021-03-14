import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
// import { useRouter } from 'next/router'; // Routing

import JudgingStatusPill from '@components/performances/JudgingStatusPill'; // Judging status pill
import EmptyTableComponent from '@components/performances/EmptyTableComponent'; // Empty table component
import Table from '@components/Table'; // Table
import Button from '@components/Button'; // Button

const PAGE_SIZE = 3; // Rows per page

export default function PerformancesTable({
  performances,
  setPerformanceToEdit,
  setModalOpen,
  ...props
}) {
  // const router = useRouter(); // Collect router

  const columns = [
    {
      Header: 'Edit',
      accessor: 'edit',
      // eslint-disable-next-line react/display-name
      Cell: ({ row: { original } }) => (
        <Button
          variant="edit"
          onClick={() => {
            setPerformanceToEdit(original);
            setModalOpen(true);
          }}
        />
      ),
    },
    {
      Header: 'ID',
      accessor: 'id',
    },
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
      Header: 'Level',
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
    {
      Header: 'Score',
      accessor: 'score',
    },
    // Judging view columns
    {
      Header: 'Tech. Score',
      accessor: 'technicalScore',
    },
    {
      Header: 'Art. Score',
      accessor: 'artisticScore',
    },
    {
      Header: 'Cumul. Score',
      accessor: 'cumulativeScore',
    },
    {
      Header: 'Awards',
      accessor: 'awards',
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

  // const goToPerformanceDetails = row => {
  //   // Go to /performances/[id] page
  //   router.push(`/performances/${row.id}`); // Route to "/performance/:id" page
  // };

  return (
    <Table
      columns={columns}
      data={performances}
      pageSize={PAGE_SIZE}
      emptyComponent={<EmptyTableComponent />}
      initialSort={[{ id: 'id' }]}
      // onRowClick={goToPerformanceDetails}
      {...props}
    />
  );
}

PerformancesTable.propTypes = {
  performances: PropTypes.any,
  setModalOpen: PropTypes.func,
  setPerformanceToEdit: PropTypes.func,
};
