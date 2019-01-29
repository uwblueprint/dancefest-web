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

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentValues } = props;

    this.state = {
      disabledSave: true,
      eventDate: currentValues.eventDate || '',
      eventTitle: currentValues.eventTitle || '',
      numJudges: currentValues.numJudges || 0
    };
  }

  // Disable save button if not all input fields are filled.
  static getDerivedStateFromProps(props, state) {
    const values = pick(state, ['eventDate', 'eventTitle', 'numJudges']);
    return { disabledSave: !(Object.keys(values).every(value => !!state[value])) };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
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

  render() {
    const { classes, formType } = this.props;
    const {
      disabledSave,
      eventTitle,
      eventDate,
      numJudges,
    } = this.state;
    return (
      <React.Fragment>
        <div style={{ margin: '25px' }}>
          <DialogInput fullWidth name="eventTitle" label="Event Title" onChange={this.handleChange} value={eventTitle} />
          <div style={{ display: 'flex' }}>
            <DialogInput style={{ marginRight: '5px' }} fullWidth name="eventDate" label="Event Date" onChange={this.handleChange} value={eventDate} />
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
