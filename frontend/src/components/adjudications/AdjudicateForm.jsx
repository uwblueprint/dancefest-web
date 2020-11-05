import React from 'react';
import { TextField } from '@material-ui/core';
import Button from '../interface/Button';
import CheckBox from '../interface/CheckBox';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export default function AdjudicateForm(props) {
    const { currentValues } = props;
    const [artisticMark, setartisticMark] = useState() //currentValues.artisticMark
    const [choreoAward, setchoreoAward] = useState() //currentValues.choreoAward || false
    const [specialAward, setspecialAward] = useState() //currentValues.specialAward || false
    const [technicalMark, settechnicalMark] = useState() //currentValues.technicalMark

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
        <div style={{ display: 'flex', flexFlow: 'column', margin: '25px' }}>
                <TextField id="filled-basic" label="Artistic Score" variant="filled" />
                <TextField id="filled-basic" label="Technical Score" variant="filled" />
                <TextField
                    id="filled-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Notes"
                    variant="filled"
                />
                <CheckBox label="Award Considerations" choices={choices} onChange={handleCheckedAward} />
                <Button type="default" onClick={handleCancel}>
                cancel
                </Button>
                <Button type="primary" onClick={handleSubmit}>
                save
                </Button>
        </div>
    )
}