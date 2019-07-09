import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import moment from 'moment';

import { updateEvent } from './../../api/eventApi';
import addData from '../../firebase/utils/addData';

import { dialogType } from '../../constants';
import DialogInput from '../interface/dialog/DialogInput';
import Button from '../interface/Button';
import styles from '../styles';


class EventForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentValues } = props;

    this.state = {
      disabledSave: true,
      eventDate: currentValues.event_date || moment().format('DD/MM/YYYY'),
      eventTitle: currentValues.event_title || '',
      numJudges: currentValues.num_judges || 0,
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
    if(name === 'eventDate' && value){
      this.setState({ 
        [name]: value.includes("-") 
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
    const collectionName = 'events';
    const data = {
      eventDate: moment(eventDate).format('YYYY-MM-DD HH:mm:ss.SSS'),
      eventTitle,
      numJudges
    };
    if (formType === dialogType.NEW) {
      await addData(collectionName, data);
    } else {
	  const resp = await updateEvent(eventId, data);
	  onUpdate(resp.data);
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
              value={eventDate ? moment(eventDate).format('YYYY-MM-DD') : ''} 
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
