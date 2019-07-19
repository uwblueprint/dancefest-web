import React from 'react';
import PropTypes from 'prop-types';

import FeedbackTableRow from './FeedbackTableRow';
import Section from '../interface/Section';

class FeedbackSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedback: [],
      loading: true,
      adjudications: {},
      performanceValues: {}
    };
  }

  componentDidMount() {
    const { match: { params: { eventId, performanceId }}} = this.props;
    this.setState({ adjudications, loading: false });
  }

  componentWillUnmount() {
    this.subscribe();
  }

  render() {
    const { match: { params: { eventId, performanceId }}} = this.props;
    const { adjudications, loading, performanceValues } = this.state;
    const headings = ['Tablet ID', 'Audio', 'Artistic Score', 'Technical Score', 'Cumulative Score', 'Awards'];
    const keys = ['artisticMark', 'audioURL', 'choreoAward', 'cumulativeMark', 'notes', 'specialAward', 'tabletID', 'technicalMark'];

    return (
      <Section>
      </Section>
    );
  }
}

FeedbackSection.propTypes = {
  match: PropTypes.shape().isRequired
};

export default FeedbackSection;
