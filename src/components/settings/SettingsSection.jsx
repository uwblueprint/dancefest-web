import React from 'react';
import db from '../../firebase/firebase';
import updateSettings from '../../firebase/utils/updateSettings';

import constants from '../../constants';
import SettingData from './SettingData';
import DialogInput from '../interface/dialog/DialogInput';
import DialogSelect from '../interface/dialog/DialogSelect';
import Button from '../interface/Button';

class SettingsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {},
      selectedCategory: 'danceStyle',
      value: ''
    };
  }

  componentDidMount() {
    const settings = {};
    db.collection('settings').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        settings[doc.id] = Object.keys(doc.data());
      });
    }).then(() => {
      this.setState({ settings });
    });
  }

  handleChange = event => this.setState({ selectedCategory: event.target.value })

  handleOptionChange = event => this.setState({ value: event.target.value })

  handleSubmit = async () => {
    const { selectedCategory, value } = this.state;
    await updateSettings(selectedCategory, value, constants.ADD_DATA);
  }

  render() {
    const { settings, selectedCategory, value } = this.state;
    const categories = settings && Object.keys(settings).map(setting => ({ value: setting }));
    const shouldShowOptions = Object.keys(settings).length > 0 && !!selectedCategory;

    return (
      <div style={{
        flex: 1, margin: '0 auto', textAlign: 'center', width: '80%', maxWidth: '700px'
      }}>
        <div style={{ margin: '10px' }}>
          <h3>Add new options to categories.</h3>
          <p>Ex: try adding the option “Hip Hop” to the “Dance Style” category.</p>
        </div>
        {settings && (<DialogSelect value={selectedCategory} onChange={this.handleChange} fullWidth label="Pick a Category" options={categories} />)}
        <DialogInput label="Enter an Option" name="option" value={value} onChange={this.handleOptionChange} fullWidth style={{ backgroundColor: 'rgb(255, 209, 217)' }} />
        <Button onClick={this.handleSubmit} type="secondary">ADD OPTION</Button>
        <div
          style={{
            display: 'flex', flexFlow: 'column', alignItems: 'center', marginTop: '15px', backgroundColor: 'whitesmoke', height: '250px', border: '1px solid #cfcfcf'
          }}
          elevation={0}>
          {shouldShowOptions && settings[selectedCategory]
            .map(option => (<SettingData key={option} optionName={option} />))}
        </div>
      </div>
    );
  }
}
export default SettingsSection;
