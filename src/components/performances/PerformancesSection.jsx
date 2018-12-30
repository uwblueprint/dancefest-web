import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

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
    const collectionName = `events/${eventId}/performances`;

    db.collection(collectionName).onSnapshot((querySnapshot) => {
      const performances = [];
      querySnapshot.forEach((doc) => {
        const performance = {
          id: doc.id,
          ...doc.data()
        };
        performances.push(performance);
      });
      this.setState({ performances });
    });
  }

  render() {
    const headings = ['Dance Title', 'Dance Entry', 'School', 'Acaademic Level', 'Level of Competition', 'Dance Style', 'Dance Size'];
    const { performances } = this.state;
    const { match: { params: { eventId }}} = this.props;

    return (
      <React.Fragment>
        <SectionHeader eventId={eventId} title="performance" />
        <Table>
          <TableHeader headings={headings} />
          <TableBody>
            {(Array.isArray(performances) && performances.length)
              && performances.map((performance) => {
                const keys = ['danceEntry', 'danceTitle', 'performers', 'danceStyle', 'competitionLevel', 'choreographers', 'academicLevel', 'school', 'size'];
                const currentValues = pick(performance, keys);
                return (
                  <PerformanceTableRow
                    currentValues={currentValues}
                    eventId={eventId}
                    id={performance.id}
                    key={performance.id} />
                );
              })}
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
