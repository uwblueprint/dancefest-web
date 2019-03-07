import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';

import addData from '../../firebase/utils/addData';
import updateData from '../../firebase/utils/updateData';

import DialogInput from '../interface/dialog/DialogInput';
import Button from '../interface/Button';
import styles from '../styles';
import TextField from '@material-ui/core/TextField';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentValues } = props;

    this.state = {
      disabledSave: true,
      eventDate: currentValues.eventDate || (new Date()).toLocaleDateString(),
      eventTitle: currentValues.eventTitle || '',
      numJudges: currentValues.numJudges || 0,
      focused: false
    };
  }

  // Disable save button if not all input fields are filled.
  static getDerivedStateFromProps(props, state) {
    const values = pick(state, ['eventDate', 'eventTitle', 'numJudges']);
    return { disabledSave: !(Object.keys(values).every(value => !!state[value])) };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'eventDate') {
      this.setState({ eventDate: value.substring(8,10) + '/' + value.substring(5,7) + '/' + value.substring(0,4)});
    }
    else {
      this.setState({ [name]: value });
    }
  }

  handleCancel = () => {
    // TODO: ask are you sure?
    this.handleModalClose();
  }

  handleSubmit = async () => {
    const { eventId, formType } = this.props;
    const { eventDate, eventTitle, numJudges } = this.state;
    const collectionName = 'events';
    const data = {
      eventDate: new Date(parseInt(eventDate.substring(6, 10)), parseInt(eventDate.substring(3, 5)) - 1, parseInt(eventDate.substring(0, 2)), 4, 0, 0),
      eventTitle,
      numJudges
    };
    if (formType === 'new') {
      await addData(collectionName, data);
    } else {
      await updateData(collectionName, eventId, data);
    }
    this.handleModalClose();
  }

  handleModalClose = () => {
    const { onModalClose } = this.props;
    onModalClose();
  }

  //Format of date must be DD/MM/YYYY
  //Transforms DD/MM/YYYY to YYYY-MM-DD
  convertDateToISOFormat = (date) => {
    return date.substring(6, 10) + "-" + date.substring(3, 5) + "-" + date.substring(0, 2);
  }

  render() {
    const { classes, formType } = this.props;
    const {
      disabledSave,
      eventTitle,
      eventDate,
      focused,
      numJudges,
    } = this.state;
    return (
      <React.Fragment>
        <div style={{ margin: '25px' }}>
          <DialogInput fullWidth name="eventTitle" label="Event Title" onChange={this.handleChange} value={eventTitle} />
          <div style={{ display: 'flex' }}>
            <TextField  fullWidth name='eventDate' label='Event Date' onChange={this.handleChange} style={{ marginRight: '5px' }} type="date" value={eventDate ? this.convertDateToISOFormat(eventDate) : ''} variant="filled" />
            <DialogInput fullWidth name="numJudges" label="No. Judges" onChange={this.handleChange} type="number" value={numJudges} />
          </div>
        </div>
        <div className={classes.dfdialog_footer}>
          <DialogActions>
            <Button onClick={this.handleCancel} type="default">
              {formType === 'edit' ? 'cancel' : 'discard'}
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

EventForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  currentValues: PropTypes.shape(),
  formType: PropTypes.oneOf(['edit', 'new']),
  onModalClose: PropTypes.func.isRequired
};

EventForm.defaultProps = {
  currentValues: {},
  formType: 'edit'
};

export default withStyles(styles)(EventForm);
