import React from 'react';
import Table from '@material-ui/core/Table';

import TableHeader from '../interface/TableHeader';

// Testing Data
import Data from '../events/TestData';

class AdjudicationsSection extends React.Component {
  state = {};

  render() {
    const headings = ['Judge', 'Cummulative Score', 'Audio'];

    if (!Data) {
      // TODO: Create Event Empty State
      return (<div>emptystate </div>);
    }

    return (
      <Table>
        <TableHeader headings={headings} />
      </Table>
    );
  }
}
export default AdjudicationsSection;
