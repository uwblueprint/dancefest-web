import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import addData from '../../firebase/utils/addData';
import updateData from '../../firebase/utils/updateData';

import DialogInput from '../interface/dialog/DialogInput';
import Button from '../interface/Button';
import styles from '../styles';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import Moment from 'react-moment';
import moment from 'moment';
import { DateFormatInput } from 'material-ui-next-pickers'

import TextField from '@material-ui/core/TextField';
import DayPickerRangeControllerWrapper from '../interface/DayPickerRangeControllerWrapper.jsx';
import { DayPickerRangeController } from 'react-dates';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentValues } = props;

    this.state = {
      disabledSave: true,
      eventDate: currentValues.eventDate || '',
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
    console.log(name);
    this.setState({ [name]: value });
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
      eventDate: new Date(eventDate),
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

            {/*<DayPickerRangeControllerWrapper />*/}

            {/*<DialogInput style={{ marginRight: '5px' }} fullWidth name="eventDate" label="Event Date" onChange={this.handleChange} value={eventDate} />*/}
            <DayPickerRangeController
              //{...props}
              onDatesChange={date => this.setState({ eventDate: date.format('DD/MM/YYYY') })}
              onFocusChange={({ focused }) => this.setState({ focused })}
              //focusedInput={focusedInput}
              startDate={eventDate ? moment(this.convertDateToISOFormat(eventDate)) : null}
              endDate={eventDate ? moment(this.convertDateToISOFormat(eventDate)) : null}
              numberOfMonths={1}
              isRTL={true}
              onDateChange={date => this.setState({ eventDate: date.format('DD/MM/YYYY') })} // PropTypes.func.isRequired
              //onDateChange={this.handleChange} // PropTypes.func.isRequired
              orientation="vertical"
              openDirection="down"
              anchorDirection="right"
            />

            {/*<DialogInput style={{ marginRight: '5px' }} fullWidth name="eventDate" label="Event Date" onChange={this.handleChange} placeholder="dd/mm/yyyy" required type="date" value={eventDate ? this.convertDateToISOFormat(eventDate) : null} />*/}
            {/*<SingleDatePicker
              //{...props}
              date={eventDate ? moment(this.convertDateToISOFormat(eventDate)) : null} // momentPropTypes.momentObj or null
              onDateChange={date => this.setState({ eventDate: date.format('DD/MM/YYYY') })} // PropTypes.func.isRequired
              //onDateChange={this.handleChange} // PropTypes.func.isRequired
              focused={focused}
              orientation="vertical"
              openDirection="down"
              anchorDirection="right"
              onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
              id="your_unique_id" // PropTypes.string.isRequired,
              customInputIcon={<CalendarTodayIcon fontSize="small" style={{ color: 'gray', marginRight: '5px' }} />}
              //inputIconPosition="ICON_AFTER_POSITION"
              numberOfMonths={1}
              isRTL={true}
    />*/}

            {/*<DatePickerWrapper />*/}

            {/*<DateFormatInput style={{ marginRight: '5px' }} fullWidth name='eventDate' onChange={this.handleChange} label='Event Date' okToConfirm margin="normal" type="date" value={eventDate ? new Date(this.convertToISOFormat(eventDate)) : null} variant="filled"/>*/}

            {/*<DialogInput style={{ marginRight: '5px' }} fullWidth name="eventDate" label="Event Date" onChange={this.handleChange} value={eventDate} />*/}

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
