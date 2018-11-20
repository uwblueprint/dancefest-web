import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import _ from 'lodash';

import DialogInput from '../interface/dialog/DialogInput';
import DialogSelect from '../interface/dialog/DialogSelect';
import Button from '../interface/Button';
import styles from '../styles';

class PerformanceForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentValues } = props;

    this.state = {
      danceEntry: currentValues.danceEntry || 0,
      danceTitle: currentValues.danceTitle || '',
      performers: currentValues.performers || '',
      danceStyle: currentValues.danceStyle || '',
      competitionLevel: currentValues.competitionLevel || '',
      choreographers: currentValues.choreographers || '',
      academicLevel: currentValues.academicLevel || '',
      school: currentValues.school || '',
      size: currentValues.size || '',
      disabled: true
    };
  }

  // disable save button if not all input fields are filled
  static getDerivedStateFromProps(props, state) {
    const values = _.omit(state, 'disabled');
    return { disabled: !(Object.keys(values).every(value => !!state[value])) };
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

  // TODO: handle submmission of the form
  handleSubmit = () => {

  }

  handleModalClose = () => {
    const { onModalClose } = this.props;
    onModalClose();
  }

  render() {
    const { classes, formType } = this.props;
    const {
      danceEntry,
      danceTitle,
      performers,
      danceStyle,
      competitionLevel,
      choreographers,
      academicLevel,
      school,
      size,
      disabled
    } = this.state;
    return (
      <React.Fragment>
        <div style={{ padding: '25px 25px 0' }}>
          <div className={classes.flex}>
            <DialogInput className={classes.flex_default} type="number" name="danceEntry" label="Dance Entry" value={danceEntry} onChange={this.handleChange} />
            <div className={classes.flex_default}>
              <DialogSelect fullWidth label="School" name="school" value={school} />
              <DialogSelect fullWidth label="Level" name="academicLevel" value={academicLevel} />
            </div>
          </div>
          <div className={classes.flex}>
            <DialogInput className={classes.flex_default} name="danceTitle" label="Dance Title" value={danceTitle} onChange={this.handleChange} />
            <DialogSelect className={classes.flex_default} name="competitionLevel" label="Competition Level" value={competitionLevel} />
          </div>
          <div className={classes.flex}>
            <DialogInput className={classes.flex_default} name="performers" label="Performers" helperText="Comma separated, eg. John Smith, Jane Doe" value={performers} onChange={this.handleChange} />
            <DialogSelect className={classes.flex_default} name="danceStyle" label="Dance Style" value={danceStyle} />
          </div>
          <div className={classes.flex}>
            <DialogInput className={classes.flex_default} name="choreographers" label="Choreographers" helperText="Comma separated, eg. John Smith, Jane Doe" value={choreographers} onChange={this.handleChange} />
            <DialogSelect className={classes.flex_default} name="size" label="Size" value={size} />
          </div>
        </div>
        <div className={classes.dfdialog_footer}>
          <DialogActions>
            <Button type="default" onClick={this.handleCancel}>
              {formType === 'edit' ? 'cancel' : 'discard'}
            </Button>
            <Button disabled={disabled} type="primary" onClick={this.handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </div>
      </React.Fragment>
    );
  }
}

PerformanceForm.propTypes = {
  classes: PropTypes.string.isRequired,
  currentValues: PropTypes.shape(),
  onModalClose: PropTypes.func.isRequired,
  formType: PropTypes.oneOf(['edit', 'new'])
};

PerformanceForm.defaultProps = {
  currentValues: [],
  formType: 'edit'
};

export default withStyles(styles)(PerformanceForm);
