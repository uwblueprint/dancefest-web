import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableHeader from '../interface/TableHeader';
import PerformanceTableRow from './PerformanceTableRow';
import EmptyState from '../interface/EmptyStates';

// Testing Data
import Data from './TestData';

class PerformancesSection extends React.Component {
  state = {};

  render() {
    const headings = ['Dance Entry', 'Dance Title', 'School', 'Acaademic Level', 'Level of Competition', 'Dance Style', 'Dance Size'];

    if (!Data) {
      // TODO: Create Event Empty State
      return (<EmptyState type="performance" />);
    }

    return (
      <Table>
        <TableHeader headings={headings} />
        <TableBody>
          {Data.map(rowProps => (<PerformanceTableRow {...rowProps} />))}
        </TableBody>
      </Table>
    );
  }
}
export default PerformancesSection;
