import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHeader from '../interface/TableHeader';
import AdjudicationTableRow from './AdjudicationTableRow';
// Testing Data
import AdjudicationTestData from './AdjudicationTestData';
import EmptyState from '../interface/EmptyStates';

class AdjudicationsSection extends React.Component {
  state = {};

  render() {
    const headings = ['Judge', 'Audio', 'Cummulative Score', 'Awards'];


    return (
      <Table>
        <TableHeader headings={headings} />
        <TableBody>
          {AdjudicationTestData ? (
            AdjudicationTestData.map(rowProps => (<AdjudicationTableRow {...rowProps} />))
          ) : (
            <EmptyState type="adjudication" title="Empty Adjudications Page" subtitle="Create your first Adjudication" />
          )}
        </TableBody>
      </Table>
    );
  }
}
export default AdjudicationsSection;
