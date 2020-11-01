import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import AdjudicationTableRow from './AdjudicationTableRow';
import db from '../../firebase/firebase';
import Section from '../interface/Section';
import { getAdjudications } from '../../api/AdjudicationAPI';
import { getPerformances } from '../../api/PerformanceAPI';
import humps from 'humps';
import { useState, useEffect } from 'react';
import Filter from '../interface/filter';

export default function AdjudicationsSection(props) {
  const [loading, setLoading] = useState(true)
  const [adjudications, setAdjudications] = useState({}) 
  const [performances, setPerformances] = useState({}) 
  const collectionName = `events/${eventId}/performances/1/adjudications`; //replace 1 with ${performanceId}
  const [filteredPerformances, setFileterdPerformances] = useState([]) 
  //constants
  const { match: { params: { eventId }}} = props;
  const headings = ['Dance Title', 'Dance Entry', 'School', 'Dance Style', 'Dance Size'];
  const keys = ['academicLevel', 'choreographers', 'competitionLevel', 'danceEntry', 'danceSize', 'danceStyle', 'danceTitle', 'performers', 'school'];
  const showPerformances = Array.isArray(performances) && performances.length > 0;
  const adjudicationList = Object.values(adjudications);
 

//according to docs, componentDidMount() is similar to useEffect(() => {}); 
  useEffect(() => {     

    getPerformances(eventId)
	.then(response => {
		let performances = Object.values(response.data).map(performance => {
			return humps.camelizeKeys(performance);
		});
    performances = performances.sort((a,b) => Number(a.danceEntry) - Number(b.danceEntry));
    setPerformances(performances);
    setLoading(false);
    setFileterdPerformances(performances);
	})
	.catch(err => {
    console.log(err);
    setLoading(false);
  });
  //need to figure out how to get all adjudications i think...
  getAdjudications(1) //performance id
    .then(({data}) => {
      setAdjudications(data);
      setLoading(false);
    });

  }, []); //added the empty array so that it will only be called after the component mounts

  var getFilterKeys = filters => Object.keys(filters)
  .reduce((res, value) => {
    if (filters[value].length > 0) {
      res.push(value);
    }
    return res;
  }, []);

  const updateAdjudications = (data) => {
    const newAdjudications = Object.assign({}, adjudications, {[data.id]: data});
    setAdjudications(newAdjudications);
  }

  getFilterKeys = filters => Object.keys(filters)
  .reduce((res, value) => {
    if (filters[value].length > 0) {
      res.push(value);
    }
    return res;
  }, []);

//needed to move down here so filters could work
 
  return (
    <Section headings={headings} loading={loading} showContent={showPerformances} type="adjudication">
      {showPerformances && filteredPerformances.map((performance) => {
        const { id } = performance;
        const currentValues = pick(performance, keys);
        return (
          <AdjudicationTableRow
            updateData={updateAdjudications}
            currentValues={currentValues}
            collectionName={collectionName}
            eventId={eventId}
            id={id}
            key={id} />
        );
      })}
    </Section>
  );
}

AdjudicationsSection.propTypes = {
  match: PropTypes.shape().isRequired
};