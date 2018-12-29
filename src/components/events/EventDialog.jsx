import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

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
    const { eventId, formType } = this.props;
    const { open } = this.state;
    const dialogTitle = formType === 'edit' ? 'Edit' : 'New';
    const newButtonTitle = (
      <React.Fragment>
        <CalendarTodayIcon fontSize="small" style={{ color: 'gray', marginRight: '5px' }} />
        NEW EVENT
      </React.Fragment>);
    const buttonTitle = formType === 'edit' ? 'EDIT' : newButtonTitle;

    return (
      <DFDialog
        open={open}
        buttonTitle={buttonTitle}
        formType={formType}
        onClick={this.handleClickOpen}
        onClose={this.handleClose}>
        <DialogHeader collectionName="events" docId={eventId} title={`${dialogTitle} Event`} />
        <EventForm {...this.props} onModalClose={this.handleClose} />
      </DFDialog>
    );
  }
}

EventDialog.propTypes = {
  currentValues: PropTypes.shape().isRequired,
  formType: PropTypes.oneOf(['edit', 'new'])
};

EventDialog.defaultProps = {
  formType: 'edit'
};

export default withStyles(styles)(EventDialog);
