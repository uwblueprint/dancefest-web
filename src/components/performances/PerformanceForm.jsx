import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import FormHelperText from '@material-ui/core/FormHelperText';
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
      choreographer: defaultValues.choreographer || '',
      level: defaultValues.level || '',
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
      choreographer,
      level,
      school,
      size,
      disabled
    } = this.state;
    return (
      <React.Fragment>
        <div style={{ display: 'flex', margin: '25px' }}>
          <div style={{ flex: '1 0 0' }}>
            <div style={{ display: 'flex' }}>
              <DialogInput label="Dance Entry" value={danceEntry} />
            </div>
            <DialogInput fullWidth label="Dance Title" value={danceTitle} />
            <DialogInput fullWidth label="Performers" helperText="Comma separated, eg. John Smith, Jane Doe" value={performers} />
            <DialogInput fullWidth label="Choreographer" helperText="Comma separated, eg. John Smith, Jane Doe" value={choreographer} />
          </div>

          <div style={{ flex: '1 0 0', marginLeft: '5px' }}>
            <div style={{ display: 'flex' }}>
              <DialogSelect fullWidth label="School" value={school} />
              <DialogSelect fullWidth label="Level" value={level} />
            </div>
            <DialogSelect fullWidth label="Competition Level" value={competitionLevel} />
            <DialogSelect fullWidth label="Dance Style" value={danceStyle} />
            <DialogSelect fullWidth label="Size" value={size} />
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
