import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import db from '../../firebase/firebase';
import PerformanceDialog from './PerformanceDialog';
import PerformanceTableRow from './PerformanceTableRow';
import Filter from '../interface/filter';
import Section from '../interface/Section';

class PerformancesSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredPerformances: null,
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
      this.setState({ loading: false, filteredPerformances: performances, performances });
    });
  }

  getFilterKeys = filters => Object.keys(filters)
    .reduce((res, value) => {
      if (filters[value].length > 0) {
        res.push(value);
      }
      return res;
    }, []);

  // TODO: implement filters for award considerations and search
  handleFilters = (filters) => {
    const { performances } = this.state;
    const keys = this.getFilterKeys(filters);
    const filteredPerformances = performances.filter(
      performance => keys.every(key => filters[key].includes(performance[key]))
    );
    this.setState({ filteredPerformances });
  }


  render() {
    const { filteredPerformances, loading, performances } = this.state;
    const { match: { params: { eventId }}} = this.props;
    const headings = ['Dance Title', 'Dance Entry', 'School', 'Academic Level', 'Level of Competition', 'Dance Style', 'Dance Size'];
    const keys = ['academicLevel', 'choreographers', 'competitionLevel', 'danceEntry', 'danceStyle', 'danceTitle', 'performers', 'school', 'size'];
    const renderNewButton = (<PerformanceDialog eventId={eventId} formType="new" />);
    const showPerformances = Array.isArray(performances) && performances.length > 0;
    const tableFilters = <Filter handleFilters={this.handleFilters} />;

    return (
      <Section headings={headings} loading={loading} renderNewButton={renderNewButton} showContent={showPerformances} tableFilters={tableFilters} type="performance">
        {showPerformances && filteredPerformances.map((performance) => {
          const { id } = performance;
          const currentValues = pick(performance, keys);
          return (
            <PerformanceTableRow
              currentValues={currentValues}
              eventId={eventId}
              id={id}
              key={id} />
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
