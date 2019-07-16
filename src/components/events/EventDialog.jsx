import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import { dialogType } from '../../constants';
import EventForm from './EventForm';
import DFDialog from '../interface/dialog/DFDialog';
import DialogHeader from '../interface/dialog/DialogHeader';
import styles from '../styles';

class EventDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { currentValues, eventId, formType, onUpdate } = this.props;
    const { open } = this.state;
    const { EDIT } = dialogType;
    const dialogTitle = formType === EDIT ? 'Edit' : 'New';
    const newButtonTitle = (
      <React.Fragment>
        <CalendarTodayIcon fontSize="small" style={{ color: 'gray', marginRight: '5px' }} />
        NEW EVENT
      </React.Fragment>);
    const buttonTitle = formType === EDIT ? 'EDIT' : newButtonTitle;

    return (
      <DFDialog
        open={open}
        buttonTitle={buttonTitle}
        formType={formType}
        onClick={this.handleClickOpen}
        onClose={this.handleClose}>
        <DialogHeader collectionName="events" docId={eventId} shouldShowDropdown title={`${dialogTitle} Event`} />
        <EventForm
          currentValues={currentValues}
          eventId={eventId}
          formType={formType}
          onModalClose={this.handleClose} 
		  onUpdate={onUpdate}
		  />
      </DFDialog>
    );
  }
}

EventDialog.propTypes = {
  currentValues: PropTypes.shape({
    eventDate: PropTypes.string,
    eventTitle: PropTypes.string,
    numJudges: PropTypes.number
  }),
  eventId: PropTypes.string,
  formType: PropTypes.oneOf([dialogType.EDIT, dialogType.NEW])
};

EventDialog.defaultProps = {
  currentValues: {},
  eventId: null,
  formType: dialogType.EDIT
};

export default withStyles(styles)(EventDialog);
