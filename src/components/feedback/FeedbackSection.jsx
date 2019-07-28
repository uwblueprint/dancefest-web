import React from 'react';
import PropTypes from 'prop-types';
import humps from 'humps';
import pick from 'lodash/pick';

import { getPerformances } from '../../api/performanceApi';
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
      showForm: false
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


  setShowForm = (b) => {
    this.setState({showForm: b});
  }

  render() {
    const { loading, performances, schools, showForm } = this.state;
    const headings = ['School', 'Performances', ''];
    const keys = ['academicLevel', 'choreographers', 'competitionLevel', 'danceEntry', 'danceSize', 'danceStyle', 'danceTitle', 'performers', 'school'];
    const showSchools = Array.isArray(this.state.schools) && this.state.schools.length > 0;

    return (
      <div>
        {
          showForm && <FeedbackForm/>
        }
        {
          !showForm && 
          <Section headings={headings} loading={loading} showContent={showSchools} type="event">
            {showSchools && this.state.schools.map((school) => {
              //filter for all of the performance
              const schoolRow = performances.filter(performance => performance.school === school)
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
