import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Button from '../interface/Button';
import CheckBox from '../interface/CheckBox';
import { Redirect } from 'react-router-dom';
import { createAdjudication, updateAdjudications, getNextUnjudgedPerformance } from "../../api/AdjudicationAPI";
import { getAdjudications } from '../../api/AdjudicationAPI';
import { getPerformance } from '../../api/PerformanceAPI';
import humps from 'humps';
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import { storage } from '../../firebase/firebase';

export default function AdjudicateForm(props) {
    const { history, match: { params: { eventId, performanceId }}} = props;
    const [loading, setLoading] = useState(true)
    const [adjudications, setAdjudications] = useState({}) 
    const [performanceValues, setPerformancesValues] = useState({}) 

    //form fields
    const [artisticMark, setArtisticMark] = useState(0) //currentValues.artisticMark
    const [choreoAward, setchoreoAward] = useState(false) //currentValues.choreoAward || false
    const [specialAward, setspecialAward] = useState(false) //currentValues.specialAward || false
    const [technicalMark, setTechnicalMark] = useState(0) //currentValues.technicalMark
    const [notes, setNotes] = useState('');
    const [audioDetails, setAudioDetails] = useState({
        url: null,
        blob: null,
        chunks: null,
        duration: {
          h: 0,
          m: 0,
          s: 0
        }
      })
    const [audioFile, setAudioFile] = useState() //will be blob  
    const [nextPerformance, setNextPerformance] = useState()

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
        console.log("data received is:")
        getNextUnjudgedPerformance(1, 2)
            .then(({data}) => {
                console.log(data)
            });  
    }, []); //added the empty array so that it will only be called after the component mounts


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
    const handleArtisticScoreChange = (e) => {
        const { name, value } = e.target;
        const keys = ['artisticMark', 'technicalMark'];
        setArtisticMark(keys.includes(name) ? parseInt(value) : value)
    }

    const handleTechnicalScoreChange = (e) => {
        const { name, value } = e.target;
        const keys = ['artisticMark', 'technicalMark'];
        setTechnicalMark(keys.includes(name) ? parseInt(value) : value)
    }

    const handleNotesChange = (e) => {
        const { value } = e.target;
        setNotes(value)
    }

    //audio methods
    const handleAudioStop = (data) => {
        setAudioDetails(data)
    }

    const handleAudioFile = (file) => {
        setAudioFile(file)
    }

    const makeFirebasePath = (fileName) => {
        return `${fileName}.mp3`
    }

    const handleRest = () => {
        const reset = {
          url: null,
          blob: null,
          chunks: null,
          duration: {
            h: 0,
            m: 0,
            s: 0
          }
        };
        setAudioDetails(reset);
      }

    //handles the checkboxes
    const handleCheckedAward = (e) => {
        const { name, checked } = e.target;
        if (name == 'choreoAward') {
            setchoreoAward(checked)
            setspecialAward(false)
        } else {
            setchoreoAward(false)
            setspecialAward(checked)
        }
    }
    //handle cancellation of form
    const handleCancel = () => {
        //go back to last page
        history.push(`/events/${eventId}/adjudications/`)
    }
    //handle submission of form
    const handleSubmit = async () => {

        if (artisticMark && technicalMark) {

            const data = {
                performanceId,
                artisticMark,
                technicalMark,
                cumulativeMark: (parseInt(artisticMark) + parseInt(technicalMark))/2,
                notes,
                tablet_id: 1
            }
        
            const adjudication = await createAdjudication(data);

            var storeRef = storage.child(makeFirebasePath(`${adjudication.data.id}`))
            storeRef.put(audioFile)
            
            const updatedData = {
                performanceId,
                artisticMark,
                technicalMark,
                cumulativeMark: (parseInt(artisticMark) + parseInt(technicalMark))/2,
                notes,
                tablet_id: 1,
                audio_url: makeFirebasePath(`${adjudication.data.id}`)
            }

            const updatedAdjudication = await updateAdjudications(adjudication.data.id, updatedData)
        }
        history.push(`/events/${eventId}/adjudications/`)
    }

    return (
        <div style={{ display: 'flex', flexFlow: 'column', marginLeft: '200px', marginRight: '200px'}}>
            <div>
                <h1>Adjudication Form</h1>
            </div>
            <div style={{ display: 'flex'}}>
                <div style={{ flex: '50%'}}>
                    <p>Title of Piece</p>
                    <h2>{performanceValues.danceTitle}</h2>
                    <p>Dance Style</p>
                    <h2>{performanceValues.danceStyle}</h2>
                </div>
                <div style={{ flex: '50%'}}>
                    <p>Group Size</p>
                    <h2>{performanceValues.danceSize}</h2>
                    <p>School</p>
                    <h2>{performanceValues.school}</h2>
                </div>
            </div>
            <div>
                <p>Scores</p>
                <div style={{marginBottom: '10px'}}>
                    <TextField
                        required
                        id="artistic-score"
                        label="Artistic Score"
                        variant="filled"
                        style={{width: 'calc(50% - 20px)', marginRight: '20px'}}
                        onChange={handleArtisticScoreChange}
                        type="number"
                    />
                    <TextField 
                        required
                        id="technical-score"
                        label="Technical Score"
                        variant="filled"
                        style={{width: 'calc(50%)'}}
                        onChange={handleTechnicalScoreChange}
                        type="number"
                    />
                </div>
            </div>
            <div>
                <p>Notes</p>
                <div style={{marginBottom: '10px'}}>
                <TextField
                    required
                    id="adjudication-notes"
                    label="Adjudication Notes"
                    multiline
                    rows={4}
                    defaultValue=""
                    variant="filled"
                    style={{width: 'calc(100%)'}}
                    onChange={handleNotesChange}
                />
                </div>
            </div>
            <div>
            <Recorder
                record={true}
                title={"Voice Notes"}
                audioURL={audioDetails.url}
                showUIAudio
                handleAudioStop={data => handleAudioStop(data)}
                handleAudioUpload={data => handleAudioFile(data)}
                handleRest={handleRest} 
            />
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