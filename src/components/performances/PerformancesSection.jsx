import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import db from '../../firebase/firebase';

import TableHeader from '../interface/TableHeader';
import PerformanceTableRow from './PerformanceTableRow';
import EmptyState from '../interface/EmptyStates';
import SectionHeader from '../interface/SectionHeader';

class PerformancesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      performances: null
    };
  }

  componentDidMount() {
    const { match: { params: { eventId }}} = this.props;
    let performances = [];
    const collectionName = `events/${eventId}/performances`;

    db.collection(collectionName).onSnapshot((querySnapshot) => {
      performances = [];
      querySnapshot.forEach((doc) => {
        const performance = {
          id: doc.id,
          ...doc.data()
        };
        performances.push(performance);
      });
      if (performances.length) {
        this.setState({ performances });
      }
    });
  }

  render() {
    const headings = ['Dance Title', 'Dance Entry', 'School', 'Acaademic Level', 'Level of Competition', 'Dance Style', 'Dance Size'];
    const { performances } = this.state;
    const { match: { params: { eventId }}} = this.props;
    const collectionName = `events/${eventId}/performances`;
    return (
      <React.Fragment>
        <SectionHeader title="performance" eventId={eventId} />
        <Table>
          <TableHeader headings={headings} />
          <TableBody>
            {(Array.isArray(performances) && performances.length)
              && performances.map(performance => (
                <PerformanceTableRow
                  key={performance.id}
                  {...performance}
                  eventId={eventId}
                  collectionName={collectionName} />
              ))}
          </TableBody>
        </Table>
        {
          (!performances) && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <EmptyState type="performance" title="Empty Performances Page" subtitle="Create your first Performance" />
            </div>
          )
        }
      </React.Fragment>
    );
  }
}

PerformancesSection.propTypes = {
  match: PropTypes.shape().isRequired
};

export default PerformancesSection;
