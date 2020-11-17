import React from 'react';
import PropTypes from 'prop-types';

import { getPerformancesByToken } from '../../api/SchoolAPI';
import SchoolFeedbackPerformanceList from './SchoolFeedbackPerformanceList';
import SchoolFeedbackPerformanceInfo from './SchoolFeedbackPerformanceInfo';
import { getAdjudicationsByPerformanceId } from '../../api/AdjudicationAPI';
import Loading from '../interface/Loading';

class SchoolFeedbackSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      performances: [],
      adjudications: {},
      comments: [],
      selectedPerf: '',
      loading: true
    };
  }

  async loadPerformances() {
    const { match: { params: { eventId, token }}} = this.props;
    const performances = await getPerformancesByToken(eventId, token);
    const performanceIds = Object.keys(performances.data);
    getAdjudicationsByPerformanceId(performanceIds)
      .then((response) => {
        const adjudications = response.data;
        const newPerformances = Object.values(performances.data).map((p) => {
          const performance = p;
          const scores = [];
          Object.values(adjudications[p.id]).forEach((adj) => {
            scores.push(adj['cumulativeMark']);
          });
          performance.averageScore = this.mean(scores);
          return performance;
        });
        this.setState({ adjudications, performances: newPerformances, loading: false });
      });
  }

  componentDidMount() {
    this.loadPerformances();
  }

  handleDetailsClicked = async (performance) => {
    const { adjudications } = this.state;
    const comments = Object.values(adjudications[performance.id]);
    this.setState({ comments, selectedPerf: performance });
  }

  mean = (vals) => {
    return vals.reduce((a, b) => {
      if (isNaN(b)) return 0;
      return a + b;
    }) / vals.length;
  }

  // TODO: handle bad link
  render() {
    const { performances, comments, selectedPerf, loading } = this.state;
    return (
      <React.Fragment>
        {loading ? <Loading /> :
          (
            <React.Fragment>
              <h1 className="title">SCHOOL FEEDBACK</h1>

              <div className="sidebar-container">
                <p className="subtitle">Performances</p>
                <SchoolFeedbackPerformanceList
                  performances={performances}
                  onClick={this.handleDetailsClicked}
                />
              </div>

              <div className="views-container">
                <SchoolFeedbackPerformanceInfo
                  adjudications={comments}
                  selected={selectedPerf}
                />
              </div>
            </React.Fragment>

          )
        }
      </React.Fragment>
    );
  }
}

SchoolFeedbackSection.propTypes = {
  match: PropTypes.shape().isRequired
};

export default SchoolFeedbackSection;
