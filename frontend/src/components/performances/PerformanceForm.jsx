import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';

import { getSchools } from '../../api/SchoolAPI';

import { dialogType } from '../../constants';
import db from '../../firebase/firebase';
import { createPerformance, updatePerformance } from '../../api/PerformanceAPI';
import DialogInput from '../interface/dialog/DialogInput';
import DialogSelect from '../interface/dialog/DialogSelect';
import Button from '../interface/Button';
import styles from '../styles';

class PerformanceForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentValues, eventId } = props;

    this.state = {
      academicLevel: currentValues.academicLevel || '',
      choreographers: currentValues.choreographers || '',
      competitionLevel: currentValues.competitionLevel || '',
      danceEntry: currentValues.danceEntry,
      danceSize: currentValues.danceSize || 'N/A',
      danceStyle: currentValues.danceStyle || '',
      danceTitle: currentValues.danceTitle || '',
      disabledSave: true,
      options: {},
      performers: currentValues.performers || '',
      schoolName: currentValues.schoolName || '',
      schoolId: currentValues.schoolId || '',
      eventId: eventId,
      schools: [],
    };
  }

  // Disable save button if not all input fields are filled.
  static getDerivedStateFromProps(props, state) {
    const fields = ['academicLevel', 'choreographers', 'competitionLevel',
      'danceEntry', 'danceSize', 'danceStyle', 'danceTitle', 'performers', 'school'];
    const values = pick(state, fields);

    return { disabledSave: !(Object.keys(values).every(value => !!state[value])) };
  }

  async componentDidMount() {
    this.subscribe = db.collection('settings').onSnapshot((querySnapshot) => {
      const options = {};
      querySnapshot.forEach((doc) => {
        options[doc.id] = Object.keys(doc.data());
      });
      this.setState({ options });
    });

    const schools = await getSchools();
    this.setState({ schools: schools.data });
  }

  componentWillUnmount() {
    this.subscribe();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleCancel = () => {
    // TODO: ask are you sure?
    const { onModalClose } = this.props;
    onModalClose();
  }

  handleModalClose = () => {
    const { onModalClose } = this.props;
    onModalClose();
  }

  handleSubmit = async () => {
    const { formType, performanceId, updateData, createData } = this.props;
    const { schoolId, schools } = this.state;

    const data = omit(this.state, ['disabledSave', 'options', 'schools', 'schoolName']);
    if (formType === dialogType.NEW) {
      const performance = await createPerformance(data);
      console.log('testestest')
      console.log(data);
      // performance.data.schoolName = schools[schoolId].name;
      // createData(performance.data);
    } else {
      const performance = await updatePerformance(performanceId, data);
      performance.data.schoolName = schools[schoolId].name;
      updateData(performance.data);
    }
    this.handleModalClose();
  }

  renderOptions = option => (option ? option.map(o => ({ value: o })) : []);

  renderSchoolOptions = schools => {
    return Object.values(schools).map(s => ({ key: s.id, value: s.name }));
  };

  render() {
    const { classes, formType } = this.props;
    const {
      academicLevel,
      choreographers,
      competitionLevel,
      danceEntry,
      danceSize,
      danceStyle,
      danceTitle,
      disabledSave,
      options,
      performers,
      schoolId,
      schools
    } = this.state;
    return (
      <React.Fragment>
        <div style={{ padding: '25px 25px 0' }}>
          <div className={classes.flex}>
            <DialogInput
              className={classes.flex_default}
              label="Dance Entry"
              name="danceEntry"
              onChange={this.handleChange}
              type="number"
              value={danceEntry} />
            <div className={classes.flex_default}>
              <DialogSelect
                fullWidth
                label="School"
                name="schoolId"
                onChange={this.handleChange}
                options={this.renderSchoolOptions(schools)}
                value={schoolId} />
              <DialogSelect
                fullWidth
                label="Level"
                name="academicLevel"
                onChange={this.handleChange}
                options={this.renderOptions(options.academicLevel)}
                value={academicLevel} />
            </div>
          </div>
          <div className={classes.flex}>
            <DialogInput
              className={classes.flex_default}
              label="Dance Title"
              name="danceTitle"
              onChange={this.handleChange}
              value={danceTitle} />
            <DialogSelect
              className={classes.flex_default}
              label="Competition Level"
              name="competitionLevel"
              onChange={this.handleChange}
              options={this.renderOptions(options.competitionLevel)}
              value={competitionLevel} />
          </div>
          <div className={classes.flex}>
            <DialogInput
              className={classes.flex_default}
              helperText="Comma separated, eg. John Smith, Jane Doe"
              label="Performers"
              name="performers"
              onChange={this.handleChange}
              value={performers} />
            <DialogSelect
              className={classes.flex_default}
              label="Dance Style"
              name="danceStyle"
              onChange={this.handleChange}
              options={this.renderOptions(options.danceStyle)}
              value={danceStyle} />
          </div>
          <div className={classes.flex}>
            <DialogInput
              className={classes.flex_default}
              helperText="Comma separated, eg. John Smith, Jane Doe"
              label="Choreographers"
              name="choreographers"
              onChange={this.handleChange}
              value={choreographers} />
            <DialogSelect
              className={classes.flex_default}
              label="Size"
              name="danceSize"
              onChange={this.handleChange}
              options={this.renderOptions(options.danceSize)}
              value={danceSize} />
          </div>
        </div>
        <div className={classes.dfdialog_footer}>
          <DialogActions>
            <Button type="default" onClick={this.handleCancel}>
              {formType === dialogType.EDIT ? 'cancel' : 'discard'}
            </Button>
            <Button disabled={disabledSave} onClick={this.handleSubmit} type="primary">
              Save
            </Button>
          </DialogActions>
        </div>
      </React.Fragment>
    );
  }
}

PerformanceForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  currentValues: PropTypes.shape({
    academicLevel: PropTypes.string,
    choreographers: PropTypes.string,
    danceEntry: PropTypes.number,
    danceSize: PropTypes.string,
    danceStyle: PropTypes.string,
    danceTitle: PropTypes.string,
    performers: PropTypes.string,
    school: PropTypes.string
  }),
  formType: PropTypes.oneOf([dialogType.EDIT, dialogType.NEW]),
  onModalClose: PropTypes.func.isRequired
};

PerformanceForm.defaultProps = {
  currentValues: {},
  formType: dialogType.EDIT
};

export default withStyles(styles)(PerformanceForm);
