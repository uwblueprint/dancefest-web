import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import db from '../../firebase/firebase';
import PerformanceTableRow from './PerformanceTableRow';
import Section from '../interface/Section';

class PerformancesSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
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
      this.setState({ performances, loading: false });
    });
  }

  render() {
    const { loading, performances } = this.state;
    const { match: { params: { eventId }}} = this.props;
    const headings = ['Dance Title', 'Dance Entry', 'School', 'Academic Level', 'Level of Competition', 'Dance Style', 'Dance Size'];
    const showPerformances = Array.isArray(performances) && performances.length > 0;

    return (
      <Section headings={headings} loading={loading} showContent={showPerformances} type="performance">
        {showPerformances && performances.map((performance) => {
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
      </Section>
    );
  }
}

PerformancesSection.propTypes = {
  match: PropTypes.shape().isRequired
};

export default PerformancesSection;
