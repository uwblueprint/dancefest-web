import React from 'react';
import { TextField } from '@material-ui/core';
import Button from '../interface/Button';
import CheckBox from '../interface/CheckBox';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { awardConsiderationEnum } from '../../constants';
import { updateAdjudications } from "../../api/AdjudicationAPI";
import { getAdjudications } from '../../api/AdjudicationAPI';
import { getPerformance } from '../../api/PerformanceAPI';
import humps from 'humps';

export default function AdjudicateForm(props) {
    const { match: { params: { eventId, performanceId }}} = props;
    const [loading, setLoading] = useState(true)
    const [adjudications, setAdjudications] = useState({}) 
    const [performanceValues, setPerformancesValues] = useState({}) 

//according to docs, componentDidMount() is similar to useEffect(() => {}); 
    useEffect(() => {     
        getPerformance(performanceId)
        .then(({data}) => {
            setPerformancesValues(humps.camelizeKeys(data)) 
        });

        getAdjudications(performanceId)
        .then(({data}) => {
            setAdjudications(data)  
            setLoading(false)
        });
  }, []); //added the empty array so that it will only be called after the component mounts

    console.log("performance values are:")
    console.log(performanceValues) //works!!
    console.log("adjudications are:")
    console.log(adjudications) //works!!

    const [artisticMark, setartisticMark] = useState(adjudications.artisticMark) //currentValues.artisticMark
    const [choreoAward, setchoreoAward] = useState(adjudications.choreoAward || false) //currentValues.choreoAward || false
    const [specialAward, setspecialAward] = useState(adjudications.specialAward || false) //currentValues.specialAward || false
    const [technicalMark, settechnicalMark] = useState(adjudications.technicalMark) //currentValues.technicalMark

    const choices = [
        {
          checked: specialAward,
          label: 'Special Award',
          name: 'specialAward',
          value: 'specialAward'
        },
        {
          checked: choreoAward,
          label: 'Choreography Award',
          name: 'choreoAward',
          value: 'choreoAward'
        }
      ];
    //handle change of text fields
    const handleChange = (e) => {
        
    }
    //handle cancellation of form
    const handleCancel = () => {
        //go back to last page
    }
    //handle submission of form
    const handleSubmit = async () => {
       
    }

    const handleCheckedAward = (e) => {
        
    }

    return (
        <div style={{ display: 'flex', flexFlow: 'column', marginLeft: '200px', marginRight: '200px'}}>
            <div>
                <h1>Adjudication Form</h1>
            </div>
            <div>
                <h2>Title of Piece: {performanceValues.danceTitle}</h2>
                <h2>Dance Style: {performanceValues.danceStyle}</h2>
                <h2>Group Size: {performanceValues.danceSize}</h2>
                <h2>School: {performanceValues.school}</h2>
            </div>
            <div>
                <p>Scores</p>
                <div style={{marginBottom: '10px'}}>
                    <TextField id="filled-basic" label="Artistic Score" variant="filled" style={{width: 'calc(50% - 20px)', marginRight: '20px'}} onChange={handleChange}/>
                    <TextField id="filled-basic" label="Technical Score" variant="filled" style={{width: 'calc(50%)'}} onChange={handleChange}/>
                </div>
            </div>
            <div>
                <p>Notes</p>
                <div style={{marginBottom: '10px'}}>
                <TextField
                    id="filled-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Notes"
                    variant="filled"
                    style={{width: 'calc(100%)'}}
                />
                </div>
            </div>
            <div> 
                <CheckBox label="Award Considerations" choices={choices} onChange={handleCheckedAward} />
            </div>
            <div> 
            <Button type="default" onClick={handleCancel}>
                cancel
            </Button>
            <Button type="primary" onClick={handleSubmit}>
                save
            </Button>
            </div>  
        </div>
    )
}