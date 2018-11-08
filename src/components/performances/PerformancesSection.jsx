import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableHeader from '../interface/TableHeader';
import PerformanceTableRow from './PerformanceTableRow';
import EmptyState from '../interface/EmptyStates';
import SectionTitle from '../interface/SectionTitle';

// Testing Data
import PerformanceTestData from './PerformanceTestData';

class PerformancesSection extends React.Component {
  state = {};

  render() {
    const headings = ['Dance Entry', 'Dance Title', 'School', 'Acaademic Level', 'Level of Competition', 'Dance Style', 'Dance Size'];


    return (
      <React.Fragment>
        <SectionTitle title="performances" />
        <Table>
          <TableHeader headings={headings} />
          <TableBody>
            {PerformanceTestData
              && PerformanceTestData.map(rowProps => (<PerformanceTableRow {...rowProps} />))
            }
          </TableBody>
        </Table>
        {
          !PerformanceTestData && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <EmptyState type="performance" title="Empty Performances Page" subtitle="Create your first Performance" />
            </div>
          )
        }
      </React.Fragment>
    );
  }
}
export default PerformancesSection;
