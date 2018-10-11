import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHeader from '../interface/TableHeader';
import AdjudicationTableRow from './AdjudicationTableRow';
// Testing Data
import AdjudicationTestData from './AdjudicationTestData';

class AdjudicationsSection extends React.Component {
  state = {};

  render() {
    const headings = ['Judge', 'Audio', 'Cummulative Score', 'Awards'];

    if (!AdjudicationTestData) {
      // TODO: Create Event Empty State
      return (
        <div>
          emptystate
          {' '}
        </div>
      );
    }

    return (
      <Table>
        <TableHeader headings={headings} />
        <TableBody>
          {AdjudicationTestData.map(rowProps => (<AdjudicationTableRow {...rowProps} />))}
        </TableBody>
      </Table>
    );
  }
}
export default AdjudicationsSection;
