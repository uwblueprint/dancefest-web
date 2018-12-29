import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHeader from '../interface/TableHeader';
import AdjudicationTableRow from './AdjudicationTableRow';
import db from '../../firebase/firebase';
import EmptyState from '../interface/EmptyStates';
import SectionHeader from '../interface/SectionHeader';

class AdjudicationsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adjudications: []
    };
  }

  componentDidMount() {
    const { match: { params: { eventId, performanceId }}} = this.props;
    const collectionName = `events/${eventId}/performances/${performanceId}/adjudications`;

    db.collection(collectionName).onSnapshot((querySnapshot) => {
      let adjudications = [];
      querySnapshot.forEach((doc) => {
        const adjudication = {
          id: doc.id,
          ...doc.data()
        };
        adjudications.push(adjudication);
      });
      this.setState({ adjudications });
    });
  }

  render() {
    const headings = ['Judge', 'Audio', 'Cummulative Score', 'Awards'];
    const { adjudications } = this.state;

    return (
      <React.Fragment>
        <SectionHeader title="adjudication" showNew={false} />
        <Table>
          <TableHeader headings={headings} />
          <TableBody>
            {adjudications
              && adjudications.map(rowProps => (
                <AdjudicationTableRow key={rowProps.id} {...rowProps} />))}
          </TableBody>
        </Table>
        {!adjudications && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <EmptyState type="adjudication" title="Empty Adjudications Page" subtitle="Create your first Adjudication" />
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default AdjudicationsSection;
