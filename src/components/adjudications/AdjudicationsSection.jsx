import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import AdjudicationTableRow from './AdjudicationTableRow';
import db from '../../firebase/firebase';
import Section from '../interface/Section';

class AdjudicationsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adjudications: [],
      loading: true
    };
  }

  componentDidMount() {
    const { match: { params: { eventId, performanceId }}} = this.props;
    const collectionName = `events/${eventId}/performances/${performanceId}/adjudications`;

    db.collection(collectionName).onSnapshot((querySnapshot) => {
      const adjudications = [];
      querySnapshot.forEach((doc) => {
        const adjudication = {
          id: doc.id,
          ...doc.data()
        };
        adjudications.push(adjudication);
      });
      this.setState({ adjudications, loading: false });
    });
  }

  render() {
    const { match: { params: { eventId, performanceId }}} = this.props;
    const { adjudications, loading } = this.state;
    const collectionName = `events/${eventId}/performances/${performanceId}/adjudications`;
    const headings = ['Judge', 'Audio', 'Cumulative Score', 'Awards'];
    const keys = ['artisticMark', 'audio', 'choreoAward', 'cumulativeMark', 'judgeName', 'notes', 'specialAward', 'technicalMark'];
    const showAdjudications = Array.isArray(adjudications) && adjudications.length > 0;

    return (
      <Section headings={headings} loading={loading} showContent={showAdjudications} type="adjudication">
        {showAdjudications && adjudications.map((rowProps) => {
          const { id } = rowProps;
          const currentValues = pick(rowProps, keys);
          return (
            <AdjudicationTableRow
              collectionName={collectionName}
              currentValues={currentValues}
              key={id}
              id={id} />);
        })}
      </Section>
    );
  }
}

AdjudicationsSection.propTypes = {
  match: PropTypes.shape().isRequired
};

export default AdjudicationsSection;
