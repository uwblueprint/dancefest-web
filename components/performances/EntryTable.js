import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
// import { useRouter } from 'next/router'; // Routing

import EmptyTableComponent from '@components/performances/EmptyTableComponent'; // Empty table component
import Table from '@components/Table'; // Table
import Button from '@components/Button'; // Button

const PAGE_SIZE = 3; // Rows per page

export default function EntryTable({ performances, setPerformanceToEdit, setModalOpen, ...props }) {
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
      accessor: 'dance_title',
    },
    {
      Header: 'School',
      accessor: 'school.school_name',
      filter: 'matchEnum',
    },
    {
      Header: 'Level',
      accessor: 'competition_level',
      filter: 'matchEnum',
    },
    {
      Header: 'Style',
      accessor: 'dance_style',
      filter: 'matchEnum',
    },
    {
      Header: 'Size',
      accessor: 'dance_size',
      filter: 'matchEnum',
    },
    // {
    //   Header: 'Score',
    //   accessor: 'score',
    //   filter: 'matchEnum',
    // },
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
      // onRowClick={goToPerformanceDetails}
      {...props}
    />
  );
}

EntryTable.propTypes = {
  performances: PropTypes.any,
  setModalOpen: PropTypes.func,
  setPerformanceToEdit: PropTypes.func,
};
