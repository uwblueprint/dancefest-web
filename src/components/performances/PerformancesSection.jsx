import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import db from '../../firebase/firebase';

import TableHeader from '../interface/TableHeader';
import PerformanceTableRow from './PerformanceTableRow';
import EmptyState from '../interface/EmptyStates';
import SectionTitle from '../interface/SectionTitle';

class PerformancesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      performances: []
    };
  }

  componentDidMount() {
    const { match: { params: { eventId }}} = this.props;
    const performances = [];

    db.collection(`events/${eventId}/performances`).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const performance = {
          id: doc.id,
          ...doc.data()
        };
        performances.push(performance);
      });
    }).then(() => {
      this.setState({ performances });
    });
  }

  render() {
    const headings = ['Dance Title', 'Dance Entry', 'School', 'Acaademic Level', 'Level of Competition', 'Dance Style', 'Dance Size'];
    const { performances } = this.state;
    return (
      <React.Fragment>
        <SectionTitle title="performances" />
        <Table>
          <TableHeader headings={headings} />
          <TableBody>
            {performances
              && performances.map(rowProps => (<PerformanceTableRow {...rowProps} />))
            }
          </TableBody>
        </Table>
        {
          !performances && (
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
