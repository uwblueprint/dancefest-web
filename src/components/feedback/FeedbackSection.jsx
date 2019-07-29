import React from 'react';
import PropTypes from 'prop-types';
import humps from 'humps';
import pick from 'lodash/pick';

import { getPerformances } from '../../api/PerformanceAPI';
import FeedbackTableRow from './FeedbackTableRow';
import Section from '../interface/Section';
import FeedbackForm from './FeedbackForm';

class FeedbackSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schools: [],
      feedback: [],
      loading: true,
      adjudications: {},
      performances: {},
      showForm: false,
      school: undefined
    };
  }

  componentDidMount() {
    const { match: { params: { eventId, adjudications, performances }}} = this.props;
    this.setState({ adjudications, loading: false });

    getPerformances(eventId)
    .then(response => {
      let performances = Object.values(response.data).map(performance => {
        return humps.camelizeKeys(performance);
      });
      this.setState({loading: false, performances });
      let set1 = new Set();
      console.log(performances);
      if (performances){
        performances.forEach(function(performance){
          console.log(performance);
          set1.add(performance.school);
        });
        this.setState({schools: Array.from(set1)});
        console.log(this.state.schools);
    }
    })
    .catch(err => {
      console.log(err);
      this.setState({loading: false});
    })
    ;
    }


  setShowForm = (b, school) => {
    this.setState({showForm: b, school});
  }

  render() {
    const { match: { params: { eventId }}} = this.props;
    const { loading, performances, schools, showForm, school } = this.state;
    const headings = ['School', 'Performances', ''];
    const keys = ['academicLevel', 'choreographers', 'competitionLevel', 'danceEntry', 'danceSize', 'danceStyle', 'danceTitle', 'performers', 'school'];
    const showSchools = Array.isArray(schools) && schools.length > 0;

    return (
      <div>
        {
          showForm &&
          <FeedbackForm
            school={school}
            performances={performances.filter(performance => performance.school === school)}
            onModalClose={this.setShowForm}
            eventId={eventId}
          />
        }
        {
          !showForm && 
          <Section headings={headings} loading={loading} showContent={showSchools} type="event">
            {showSchools && schools.map((school) => {
              //filter for all of the performance
              const schoolRow = performances.filter(performance => performance.school === school);
              console.log(schoolRow);
              //pick performances
              const currentValues = pick(school, performances);
              return (
                <FeedbackTableRow
                  school = {school}
                  performances = {schoolRow}
                  setShowForm = {this.setShowForm}
                 />);
            })}
          </Section>
        }
      </div>
    );
  }
}

FeedbackSection.propTypes = {
  match: PropTypes.shape().isRequired
};

export default FeedbackSection;
