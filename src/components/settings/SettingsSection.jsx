import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import db from '../../firebase/firebase';
import updateSettings from '../../firebase/utils/updateSettings';

import constants from '../../constants';
import Button from '../interface/Button';
import DialogInput from '../interface/dialog/DialogInput';
import DialogSelect from '../interface/dialog/DialogSelect';
import SettingData from './SettingData';
import styles from '../styles';
import SectionHeader from '../interface/SectionHeader';

class SettingsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {},
      selectedCategory: 'Dance Style',
      value: ''
    };
  }

  componentDidMount() {
    db.collection('settings').onSnapshot((querySnapshot) => {
      const settings = {};
      querySnapshot.forEach((doc) => {
        const spacedOutName = doc.id.replace( /([A-Z])/g, " $1" );
        const capitalizedSecondWord = doc.id.charAt(0).toUpperCase() + spacedOutName.slice(1);
        settings[capitalizedSecondWord] = Object.keys(doc.data());
      });
      this.setState({ settings });
    });
  }

  handleChange = event => this.setState({ selectedCategory: event.target.value })

  handleOptionChange = event => this.setState({ value: event.target.value })

  handleSubmit = async () => {
    const { selectedCategory, value } = this.state;
    const selectedCategoryCamelCase = this.toCamelCase(selectedCategory);
    await updateSettings(selectedCategoryCamelCase, value, constants.ADD_DATA);
    this.setState({ value: '' });
  }

  toCamelCase = text => {
    return text.charAt(0).toLowerCase() + text.replace(/ /g,'').slice(1);
  }

  render() {
    const { classes } = this.props;
    const { selectedCategory, settings, value } = this.state;
    const categories = settings && Object.keys(settings).map(setting => ({ value: setting }));
    const shouldShowOptions = Object.keys(settings).length > 0 && !!selectedCategory;

    return (
      <React.Fragment>
        <SectionHeader showNew={false} title="setting" />
        <div className={classes.settings_wrapper}>
          <div style={{ margin: '10px' }}>
            <h3>Add new options to categories.</h3>
            <p>Ex: try adding the option “Hip Hop” to the “Dance Style” category.</p>
          </div>
          {settings && (<DialogSelect
            fullWidth
            label="Pick a Category"
            name="category"
            onChange={this.handleChange}
            options={categories}
            value={selectedCategory} />
          )}
          <DialogInput label="Enter an Option" name="option" value={value} onChange={this.handleOptionChange} fullWidth style={{ backgroundColor: 'rgb(255, 209, 217)' }} />
          <Button onClick={this.handleSubmit} type="secondary">ADD OPTION</Button>
          <div className={classes.settings_view} elevation={0}>
            {shouldShowOptions && settings[selectedCategory].map(option => {
              const selectedCategoryCamelCase = this.toCamelCase(selectedCategory);
              return <SettingData key={option} category={selectedCategoryCamelCase} optionName={option} />;
              })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

SettingsSection.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(SettingsSection);
