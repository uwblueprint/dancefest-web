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

    this.subscribe = db.collection(collectionName).onSnapshot((querySnapshot) => {
      let performances = [];
      querySnapshot.forEach((doc) => {
        const performance = {
          id: doc.id,
          ...doc.data()
        };
        performances.push(performance);
      });
      performances = performances.sort((a, b) => Number(a.danceEntry) - Number(b.danceEntry));
      this.setState({ filteredPerformances: performances, loading: false, performances });
    });
  }

  componentWillUnmount() {
    this.subscribe();
  }

  getFilterKeys = filters => Object.keys(filters)
    .reduce((res, value) => {
      if (filters[value].length > 0) {
        res.push(value);
      }
      return res;
    }, []);

  /*
  * Method handles the logic on filter and search
  * @param {Object} filtersObj - object with keys as the performances metadata that
  * one is trying to filter for, values as String array of all selected characteristics for
  * each metadata to filter for. Example:
  *  {
  *    academicLevel: ["secondary", "primary"],
  *    awardConsideration: [],
  *    competitionLevel: [],
  *    danceSize: [],
  *    danceStyle: ["jazz"],
  *    school: []
  *  }
  * Thus, this function will filter out all performances that are secondary and primary
  * academic level as well as danceStyles of Jazz.
  * @param {String} searchQuery - the searchQuery that the user types in the search bar
  */
  handleFilters = (filtersObj, searchQuery) => {
    const { performances } = this.state;
    // Retrieves the keys for performances (i.e. academicLevel, awardConsideration, etc.)
    const keys = this.getFilterKeys(filtersObj);

    // Filter function that accepts a performance object and returns true
    // if this performance passes the filter (i.e should be included)
    const filterFunction = (performance) => {
      const danceTitle = performance.danceTitle ? performance.danceTitle.toLowerCase() : '';
      // Iterates through each performance metadata/key (i.e. academicLevel) and then
      // iterates through each string in the array (i.e. secondary, primary)
      const isFilterSuccess = keys.every((key) => {
        // awardConiderations need to be checked differently as it's a Number rather
        // than a String
        if (key === 'awardConsideration') {
          if (filtersObj[key].includes('choreoAward')) {
            return performance.choreoAwardEnum > 0;
          }
          if (filtersObj[key].includes('specialAward')) {
            return performance.specialAwardEnum > 0;
          }

          return false;
        }
        return filtersObj[key].includes(performance[key]);
      });

      // If the user is also performing a search query, we want to include this
      // in our filter logic
      if (searchQuery && searchQuery.length > 0) {
        const query = searchQuery.toLowerCase();
        return isFilterSuccess && danceTitle.search(query) !== -1;
      }
      return isFilterSuccess;
    };

    const filteredPerformances = performances
      .filter(filterFunction)
      .sort((a, b) => Number(a.danceEntry) - Number(b.danceEntry));
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
