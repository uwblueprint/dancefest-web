import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import { createEvent, retrieveEventData } from '../../firebase/database';

import DialogInput from '../interface/dialog/DialogInput';
import DialogSelect from '../interface/dialog/DialogSelect';
import Button from '../interface/Button';
import styles from '../styles';

class PerformanceForm extends React.Component {
  constructor(props) {
    super(props);
    const { defaultValues } = props;

    this.state = {
      danceEntry: defaultValues.danceEntry || 0,
      danceTitle: defaultValues.danceTitle || '',
      performers: defaultValues.performers || '',
      danceStyle: defaultValues.danceStyle || '',
      competitionLevel: defaultValues.competitionLevel || '',
      choreographers: defaultValues.choreographers || '',
      academicLevel: defaultValues.academicLevel || '',
      school: defaultValues.school || '',
      size: defaultValues.size || '',
      disabled: true
    };
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

  // TODO: create validation form method
  validateData = () => {
    const validate = false;

    // TODO: different validation cases depending on adding new vs editing
    this.setState({ disabled: validate });
  }

  // TODO: handle submmission of the form
  handleSubmit = () => {
    const { eventTitle, eventDate, numJudges } = this.state;
    const item = { eventTitle, eventDate, numJudges };
    createEvent(item);
  }

  handleDataRetrieval = () => {
    retrieveEventData();
  }

  handleModalClose = () => {
    const { onModalClose } = this.props;
    onModalClose();
  }

  render() {
    const { classes, type } = this.props;
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
              {type === 'edit' ? 'cancel' : 'discard'}
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
  defaultValues: PropTypes.shape(),
  onModalClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['edit', 'new'])
};

PerformanceForm.defaultProps = {
  defaultValues: [],
  type: 'edit'
};

export default withStyles(styles)(PerformanceForm);
