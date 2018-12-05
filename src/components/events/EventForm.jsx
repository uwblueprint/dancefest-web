import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import _ from 'lodash';
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
      eventTitle: currentValues.eventTitle || '',
      eventDate: currentValues.eventDate || '',
      numJudges: currentValues.numJudges || '',
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
    this.handleModalClose();
  }

  handleSubmit = async () => {
    const { eventId, formType } = this.props;
    const collectionName = 'events';
    const data = _.omit(this.state, 'disabled');


    if (formType === 'new') {
      await addData(collectionName, data, this.handleModalClose);
    } else {
      await updateData(collectionName, eventId, data, this.handleModalClose);
    }
  }

  handleModalClose = () => {
    const { onModalClose } = this.props;
    onModalClose();
  }

  render() {
    const { classes, formType } = this.props;
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

EventForm.propTypes = {
  classes: PropTypes.string.isRequired,
  currentValues: PropTypes.shape(),
  onModalClose: PropTypes.func.isRequired,
  formType: PropTypes.oneOf(['edit', 'new'])
};

EventForm.defaultProps = {
  currentValues: [],
  formType: 'edit'
};

export default withStyles(styles)(EventForm);
