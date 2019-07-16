import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import humps from 'humps';

import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import moment from 'moment';

import { dialogType } from '../../constants';
import DialogInput from '../interface/dialog/DialogInput';
import Button from '../interface/Button';
import styles from '../styles';
import {editExistingEvent, addNewEvent} from '../../api/EventAPI'


class EventForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentValues } = props;

    this.state = {
      disabledSave: true,
      eventDate: currentValues.eventDate || moment().format('DD/MM/YYYY'),
      eventTitle: currentValues.eventTitle || '',
      numJudges: currentValues.numJudges || 0,
    };
  }

  // Disable save button if not all input fields are filled.
  static getDerivedStateFromProps(props, state) {
    const values = pick(state, ['eventDate', 'eventTitle', 'numJudges']);
    return { disabledSave: !(Object.keys(values).every(value => !!state[value])) };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    const valueIncludes = value.includes("-")
    if(name === 'eventDate' && value){
      this.setState({
        [name]: valueIncludes
        ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY')
        : moment(value, 'MM/DD/YYYY').format('DD/MM/YYYY')
      });
    }
    else{
      this.setState({ [name]: value });
    }
  }

  handleCancel = () => {
    // TODO: ask are you sure?
    this.handleModalClose();
  }

  handleSubmit = async () => {
    const { eventId, formType, onUpdate } = this.props;
    const { eventDate, eventTitle, numJudges } = this.state;
    const data = {
      event_date: new Date(moment(eventDate, 'DD/MM/YYYY').format('MM-DD-YYYY')),
      event_title: eventTitle,
      num_judges: numJudges
    };
    let uri = 'http://127.0.0.1:5000/'
    if (formType === dialogType.NEW) {
      await addNewEvent(data);
    } else {
	  const resp = await editExistingEvent(eventId, data);
	  onUpdate(humps.camelizeKeys(resp.data));
    }
    this.handleModalClose();
  }

  handleModalClose = () => {
    const { onModalClose } = this.props;
    onModalClose();
  }

  render() {
    const { classes, formType } = this.props;
    const {
      disabledSave,
      eventTitle,
      eventDate,
      numJudges
    } = this.state;
    return (
      <React.Fragment>
        <div style={{ margin: '25px' }}>
          <DialogInput fullWidth name="eventTitle" label="Event Title" onChange={this.handleChange} value={eventTitle} />
          <div style={{ display: 'flex' }}>
            <DialogInput
              fullWidth
              inputLabelProps={{ shrink: true }}
              name='eventDate'
              label='Event Date'
              onChange={this.handleChange}
              style={{ marginRight: '5px' }}
              type="date"
              value={eventDate ? moment(eventDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : ''}
              variant="filled"
            />
            <DialogInput fullWidth name="numJudges" label="No. Judges" onChange={this.handleChange} type="number" value={numJudges} />
          </div>
        </div>
        <div className={classes.dfdialog_footer}>
          <DialogActions>
            <Button onClick={this.handleCancel} type="default">
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

EventForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  currentValues: PropTypes.shape(),
  formType: PropTypes.oneOf([dialogType.EDIT, dialogType.NEW]),
  onModalClose: PropTypes.func.isRequired
};

EventForm.defaultProps = {
  currentValues: {},
  formType: dialogType.EDIT
};

export default withStyles(styles)(EventForm);
