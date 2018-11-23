import React from 'react';
import Cancel from '@material-ui/icons/Cancel';
import _ from 'lodash';
import db from '../../firebase/firebase';

import addData from '../../firebase/utils/addData';
import SettingData from './SettingData';
import DialogInput from '../interface/dialog/DialogInput';
import DialogSelect from '../interface/dialog/DialogSelect';
import Button from '../interface/Button';

class SettingsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: null,
      selectedOption: 'danceStyle'
    };
  }

  componentDidMount() {
    const settings = [];
    db.collection('settings').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        settings.push(doc.data());
      });
    }).then(() => {
      this.setState({ settings: settings[0] });
    });
  }

  handleChange = event => this.setState({ selectedOption: event.target.value })


  handleSubmit = async () => {
    const collectionName = 'settings';
    const data = _.omit(this.state, 'disabled');


    await addData(collectionName, data);
  }

  render() {
    const { settings, selectedOption } = this.state;
    const options = settings && Object.keys(settings).map(setting => ({ value: setting }));

    return (
      <div style={{
        flex: 1, margin: '0 auto', textAlign: 'center', width: '80%', maxWidth: '700px'
      }}>
        <div style={{ margin: '10px' }}>
          <h3>Add new options to categories.</h3>
          <p>Ex: try adding the option “Hip Hop” to the “Dance Style” category.</p>
        </div>
        {settings && (<DialogSelect value={selectedOption} onChange={this.handleChange} fullWidth label="Pick a Category" options={options} />)}
        <DialogInput label="Enter an Option" fullWidth style={{ backgroundColor: 'rgb(255, 209, 217)' }} />
        <Button onClick={this.handleSubmit} type="secondary">ADD OPTION</Button>
        <div
          style={{
            display: 'flex', flexFlow: 'column', alignItems: 'center', marginTop: '15px', backgroundColor: 'whitesmoke', height: '250px', border: '1px solid #cfcfcf'
          }}
          elevation={0}>
          {settings && settings[selectedOption].map(option => (<SettingData key={option} optionName={option} />))}
        </div>
      </div>
    );
  }
}
export default SettingsSection;
