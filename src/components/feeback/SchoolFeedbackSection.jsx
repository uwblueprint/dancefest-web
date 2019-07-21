import React from 'react';
import PropTypes from 'prop-types';

import { getPerformancesByToken } from '../../api/SchoolAPI';

class SchoolFeedbackSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      performances: null
    };
  }

  async loadPerformances() {
    const { match: { params: { token }}} = this.props;
    const performances = await getPerformancesByToken(token);
    this.setState({ performances: Object.values(performances.data) });
  }

  componentDidMount() {
    this.loadPerformances();
  }

  // TODO: replace render with new component
  render() {
    const { performances } = this.state;
    console.log(performances);
    return (
      <table>
        {performances && performances.map((elem) => (
          <tr><td>{elem.danceTitle}</td></tr>
        ))}
      </table>
    );
  }
}

SchoolFeedbackSection.propTypes = {
  match: PropTypes.shape().isRequired
};

export default SchoolFeedbackSection;
