import React from 'react';

import Cancel from '@material-ui/icons/Cancel';

import DialogInput from '../interface/dialog/DialogInput';
import DialogSelect from '../interface/dialog/DialogSelect';
import Button from '../interface/Button';

class SettingsSection extends React.Component {
  state = {};

  render() {
    return (
      <div style={{ flex: 1, margin: '0 auto', textAlign: 'center', width: '80%', maxWidth: '700px' }}>
        <div style={{ margin: '10px' }}>
          <h3>Add new options to categories.</h3>
          <p>Ex: try adding the option “Hip Hop” to the “Dance Style” category.</p>
        </div>
        <DialogSelect fullWidth label="Pick a Category" />
        <DialogInput label="Enter an Option" fullWidth style={{ backgroundColor: 'rgb(255, 209, 217)' }} />
        <Button type="secondary">ADD OPTION</Button>
        <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center', marginTop: '15px', backgroundColor: 'whitesmoke', border: '1px solid #cfcfcf' }} elevation={0}>
          <div>
            <div style={{ float: 'left' }}>
              ballet
            </div>
            <Cancel />
          </div>
          <div>
            <div style={{ float: 'left' }}>
              jazz
            </div>
            <Cancel />
          </div>
          <div>
            <div style={{ float: 'left' }}>
              tap
            </div>
            <Cancel />
          </div>
        </div>
      </div>
    );
  }
}
export default SettingsSection;
