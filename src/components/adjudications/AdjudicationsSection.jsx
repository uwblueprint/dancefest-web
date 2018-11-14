import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHeader from '../interface/TableHeader';
import AdjudicationTableRow from './AdjudicationTableRow';
// TODO: REMOVE THIS WHEN FIRESTORE DATA IS ADDED =====
import AdjudicationTestData from './AdjudicationTestData';
// =====================================================
import EmptyState from '../interface/EmptyStates';
import SectionTitle from '../interface/SectionTitle';

class AdjudicationsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adjudications: []
    };
  }

  componentDidMount() {
    /* TODO: FILL IN THIS
    1. Get eventId and performanceId from url params using react-router-dom
    2. Get adjudications data from firebase
    3. Add to state
    */
  }

  render() {
    const headings = ['Judge', 'Audio', 'Cummulative Score', 'Awards'];
    const { adjudications } = this.state;

    return (
      <React.Fragment>
        <SectionTitle title="adjudications" />
        <Table>
          <TableHeader headings={headings} />
          <TableBody>
            {AdjudicationTestData
              && AdjudicationTestData.map(rowProps => (<AdjudicationTableRow {...rowProps} />))}
          </TableBody>
        </Table>
        {!AdjudicationTestData && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <EmptyState type="adjudication" title="Empty Adjudications Page" subtitle="Create your first Adjudication" />
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default AdjudicationsSection;
