import React from 'react'; // React

import EmptyTableComponent from '@components/performances/EmptyTableComponent'; // Empty table component
import Table from '@components/Table'; // Table

// Temp constants
import { columns as judgingTableColumns } from '../../data/mockParticipants';

// Judging Table
export default function JudgingTable() {
  return (
    <Table
      columns={judgingTableColumns}
      data={[]}
      filters={[]}
      emptyComponent={<EmptyTableComponent />}
    />
  );
}
