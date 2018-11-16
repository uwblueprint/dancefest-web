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
    const { match: { params: { eventId, performanceId } } } = this.props;
    const adjudications = []

    console.log(performanceId);

    db.collection(`events/${eventId}/performances/${performanceId}/adjudications`).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const adjudication = {
          id: doc.id,
          ...doc.data()
        };
        console.log(doc)
        adjudications.push(adjudication);
      });
    }).then(() => {
      this.setState({ adjudications });
    });
  }

  render() {
    const headings = ['Judge', 'Audio', 'Cummulative Score', 'Awards'];
    const { adjudications } = this.state;
    console.log(adjudications);

    return (
      <React.Fragment>
        <SectionHeader title="adjudication" showNew={false} />
        <Table>
          <TableHeader headings={headings} />
          <TableBody>
            {adjudications
              && adjudications.map(rowProps => (<AdjudicationTableRow {...rowProps} />))}
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
