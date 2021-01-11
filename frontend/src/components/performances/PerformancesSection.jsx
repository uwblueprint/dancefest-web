import humps from 'humps';
import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import PerformanceDialog from './PerformanceDialog';
import PerformanceTableRow from './PerformanceTableRow';
import Filter from '../interface/filter';
import Section from '../interface/Section';

import { getPerformances } from '../../api/PerformanceAPI';

class PerformancesSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredPerformances: [],
      loading: true,
      performances: [],
    };

  }

  async componentDidMount() {
    const { match: { params: { eventId }}} = this.props;
    
    //write async await function, seperate mapping into alternative helper function that can be called
    async function getPerformancesInfo(eventId) {
      const rawPerformances = await getPerformances(eventId);

      const performances = Object.values(rawPerformances.data).map(entry => {
        const temp_perf = entry.performance;
        temp_perf['school_name'] = entry.school_name;
        return humps.camelizeKeys(temp_perf);
      })

      return performances.sort((a,b) => Number(a.danceEntry) - Number(b.danceEntry));
    }

    const performances = await getPerformancesInfo(eventId);
    this.setState({ filteredPerformances: performances, loading: false, performances });
  }

  getFilterKeys = filters => Object.keys(filters)
    .reduce((res, value) => {
      if (filters[value].length > 0) {
        res.push(value);
      }
      return res;
    }, []);

  updatePerformances = (data) => {
    const { performances } = this.state;
    // update performance by id
    let newPerformances = performances.map((performance) => {
      if (data.id === performance.id) return data;
      return performance;
    });
    newPerformances = newPerformances.sort((a,b) => Number(a.danceEntry) - Number(b.danceEntry));
    this.setState({ performances: newPerformances, filteredPerformances: newPerformances });
  }

  createPerformance = (data) => {
    const { performances } = this.state;
    let newPerformances = performances.concat([data]);
    newPerformances = newPerformances.sort((a,b) => Number(a.danceEntry) - Number(b.danceEntry));
    this.setState({ performances: newPerformances, filteredPerformances: newPerformances });
  }

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
      // Iterates through each performance metadata/key (i.e. academicLevel) and then
      // iterates through each string in the array (i.e. secondary, primary)
      const isFilterSuccess = keys.every((key) => {
        // awardConsiderations need to be checked differently as it's a Number rather
        // than a String
        if (key === 'awardConsideration') {
          if (filtersObj[key].includes('choreoAward')) {
            return performance.choreoAwardEnum > 0;
          }
          if (filtersObj[key].includes('specialAward')) {
            return performance.specialAwardEnum > 0;
          }
          return true;
        }
        return filtersObj[key].includes(performance[key]);
      });

      // If the user is also performing a search query, we want to include this
      // in our filter logic
      if (searchQuery && searchQuery.length > 0) {
        const { danceTitle, performers, choreographers } = performance;
        const fields = [danceTitle, performers, choreographers];
        const query = searchQuery.toLowerCase();
        
        try{
          return isFilterSuccess && fields.find(field => field.toLowerCase().search(query) !== -1);
        } 
        catch(ex) {
          //if invalid input is given, 0 matching performances will be displayed
          return isFilterSuccess && fields.find(filter => null);
        }
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
    const headings = ['Dance Title', 'Dance Entry', 'School', 'Academic Level', 'Level of Competition', 'Dance Style', 'Dance Size', 'Aristic Score', 'Technical Score', 'Cumulative Score'];
    const keys = ['academicLevel', 'choreographers', 'competitionLevel', 'danceEntry', 'danceSize', 'danceStyle', 'danceTitle', 'performers', 'schoolName', 'schoolId', 'artisticScore', 'technicalScore', 'cumulativeScore'];
    const renderNewButton = (<PerformanceDialog updateData={this.updatePerformances} createData={this.createPerformance} eventId={eventId} formType="new" />);
    const showPerformances = Array.isArray(performances) && performances.length > 0;
    const tableFilters = <Filter handleFilters={this.handleFilters} />;

    return (
      <Section headings={headings} loading={loading} renderNewButton={renderNewButton} showContent={showPerformances} tableFilters={tableFilters} type="performance">
        {showPerformances && filteredPerformances.map((performance) => {
          const { id } = performance;
          const currentValues = pick(performance, keys);
          return (
            <PerformanceTableRow
              updateData={this.updatePerformances}
              createData={this.createPerformance}
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
