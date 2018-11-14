import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import { createEvent, retrieveEventData } from '../../firebase/database';

import DialogInput from '../interface/dialog/DialogInput';
import Button from '../interface/Button';
import styles from '../styles';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    const { defaultValues } = props;

    this.state = {
      eventTitle: defaultValues.eventTitle || '',
      eventDate: defaultValues.eventDate || '',
      numJudges: defaultValues.numJudges || '',
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
      eventTitle,
      eventDate,
      numJudges,
      disabled
    } = this.state;
    return (
      <React.Fragment>
        <div style={{ margin: '25px' }}>
          <DialogInput fullWidth name="eventTitle" label="Event Title" onChange={this.handleChange} value={eventTitle} />
          <div style={{ display: 'flex' }}>
            <DialogInput style={{ marginRight: '5px' }} fullWidth name="eventDate" label="Event Date" onChange={this.handleChange} value={eventDate} />
            <DialogInput fullWidth name="numJudges" label="No. Judges" onChange={this.handleChange} value={numJudges} />
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

EventForm.propTypes = {
  classes: PropTypes.string.isRequired,
  defaultValues: PropTypes.shape(),
  onModalClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['edit', 'new'])
};

EventForm.defaultProps = {
  defaultValues: [],
  type: 'edit'
};

export default withStyles(styles)(EventForm);
