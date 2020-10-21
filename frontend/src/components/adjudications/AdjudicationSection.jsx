import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import AdjudicationTableRow from './AdjudicationTableRow';
import db from '../../firebase/firebase';
import Section from '../interface/Section';
import { getAdjudications } from '../../api/AdjudicationAPI';
import { getPerformance } from '../../api/PerformanceAPI';
import humps from 'humps';
import React, { useState, useEffect } from 'react';

export default function AdjudicationsSection() {
  const [loading, setLoading] = useState(true)
  const [adjudications, setAdjudications] = useState({}) 
  const [performanceValues, setPerformanceValues] = useState({}) 
  //constants
  const { match: { params: { eventId, performanceId }}} = this.props;
  const collectionName = `events/${eventId}/performances/${performanceId}/adjudications`;
  const headings = ['Tablet ID', 'Audio', 'Artistic Score', 'Technical Score', 'Cumulative Score', 'Awards'];
  const keys = ['artisticMark', 'audioUrl', 'choreoAward', 'cumulativeMark', 'notes', 'specialAward', 'tabletId', 'technicalMark'];
  const adjudicationList = Object.values(adjudications);
  const showAdjudications = adjudicationList.length > 0;

//according to docs, componentDidMount() is similar to useEffect(() => {}); 
  useEffect(() => {     

    getPerformance(performanceId)
    .then(({data}) => {
      setPerformanceValues(humps.camelizeKeys(data));
    });
  
    getAdjudications(performanceId)
    .then(({data}) => {
        setAdjudications(data);
        setLoading(false);
    });

    updateAdjudications = (data) => {
      const newAdjudications = Object.assign({}, adjudications, {[data.id]: data});
      setAdjudications(newAdjudications);
    }
  }, []); //added the empty array so that it will only be called after the component mounts

  return (
    <Section headings={headings} loading={loading} showContent={showAdjudications} type="adjudication">
      {showAdjudications && adjudicationList.map((rowProps) => {
        const { id } = rowProps;
        const currentValues = pick(rowProps, keys);
        return (
          <AdjudicationTableRow
            updateData={this.updateAdjudications}
            collectionName={collectionName}
            currentValues={currentValues}
            key={id}
            performanceValues={performanceValues}
            id={id} />);
      })}
    </Section>
  );
}

AdjudicationsSection.propTypes = {
  match: PropTypes.shape().isRequired
};
//start of the old
/*class AdjudicationsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adjudications: {},
      loading: true,
      performanceValues: {}
    };
  }

  componentDidMount() {
    const { match: { params: { performanceId }}} = this.props;

    getPerformance(performanceId)
    .then(({data}) => {
      this.setState({ performanceValues: humps.camelizeKeys(data)});
    });

    getAdjudications(performanceId)
    .then(({data}) => {
      this.setState({ adjudications: data, loading: false});
    });
  }

  updateAdjudications = (data) => {
    const { adjudications } = this.state;
    const newAdjudications = Object.assign({}, adjudications, {[data.id]: data});
    this.setState({ adjudications: newAdjudications})
  }

  render() {
    const { match: { params: { eventId, performanceId }}} = this.props;
    const { adjudications, loading, performanceValues } = this.state;
    const collectionName = `events/${eventId}/performances/${performanceId}/adjudications`;
    const headings = ['Tablet ID', 'Audio', 'Artistic Score', 'Technical Score', 'Cumulative Score', 'Awards'];
    const keys = ['artisticMark', 'audioUrl', 'choreoAward', 'cumulativeMark', 'notes', 'specialAward', 'tabletId', 'technicalMark'];
    const adjudicationList = Object.values(adjudications);
    
    const showAdjudications = adjudicationList.length > 0;

    return (
      <Section headings={headings} loading={loading} showContent={showAdjudications} type="adjudication">
        {showAdjudications && adjudicationList.map((rowProps) => {
          const { id } = rowProps;
          const currentValues = pick(rowProps, keys);
          return (
            <AdjudicationTableRow
              updateData={this.updateAdjudications}
              collectionName={collectionName}
              currentValues={currentValues}
              key={id}
              performanceValues={performanceValues}
              id={id} />);
        })}
      </Section>
    );
  }
}*/

/*AdjudicationsSection.propTypes = {
  match: PropTypes.shape().isRequired
};*/

//export default AdjudicationsSection;
