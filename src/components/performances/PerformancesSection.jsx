import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableHeader from '../interface/TableHeader';
import PerformanceTableRow from './PerformanceTableRow';
import EmptyState from '../interface/EmptyStates';

// Testing Data
import PerformanceTestData from './PerformanceTestData';

class PerformancesSection extends React.Component {
  state = {};

  render() {
    const headings = ['Dance Entry', 'Dance Title', 'School', 'Acaademic Level', 'Level of Competition', 'Dance Style', 'Dance Size'];


    return (
      <Table>
        <TableHeader headings={headings} />
        <TableBody>
          {PerformanceTestData ? (
            PerformanceTestData.map(rowProps => (<PerformanceTableRow {...rowProps} />))
          ) : (
            <EmptyState type="performance" title="Empty Performances Page" subtitle="Create your first Performance" />
          )}

        </TableBody>
      </Table>
    );
  }
}
export default PerformancesSection;
