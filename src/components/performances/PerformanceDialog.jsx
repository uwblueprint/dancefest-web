import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import { dialogType } from '../../constants';
import PerformanceForm from './PerformanceForm';
import DFDialog from '../interface/dialog/DFDialog';
import DialogHeader from '../interface/dialog/DialogHeader';
import styles from '../styles';

class PerformanceDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      currentValues,
      eventId,
      formType,
      performanceId
    } = this.props;
    const { open } = this.state;
    const collectionName = `events/${eventId}/performances`;
    const shouldShowDropdown = formType === dialogType.EDIT;
    const dialogTitle = formType === dialogType.EDIT ? 'Edit' : 'New';
    const buttonTitle = formType === dialogType.EDIT ? 'EDIT'
      : (
        <React.Fragment>
          <CalendarTodayIcon style={{ color: 'gray', marginRight: '5px' }} />
          NEW PERFORMANCE
        </React.Fragment>);
    const title = `${dialogTitle} Performance`;

    return (
      <DFDialog
        open={open}
        buttonTitle={buttonTitle}
        formType={formType}
        onClick={this.handleClickOpen}
        onClose={this.handleClose}>
        <DialogHeader
          collectionName={collectionName}
          docId={performanceId}
          shouldShowDropdown={shouldShowDropdown}
          title={title} />
        <PerformanceForm
          collectionName={collectionName}
          currentValues={currentValues}
          formType={formType}
          onModalClose={this.handleClose}
          performanceId={performanceId} />
      </DFDialog>
    );
  }
}

PerformanceDialog.propTypes = {
  currentValues: PropTypes.shape({
    academicLevel: PropTypes.string,
    choreographers: PropTypes.string,
    danceEntry: PropTypes.number,
    danceStyle: PropTypes.string,
    danceTitle: PropTypes.string,
    performers: PropTypes.string,
    school: PropTypes.string,
    size: PropTypes.number
  }),
  eventId: PropTypes.string.isRequired,
  formType: PropTypes.oneOf([dialogType.EDIT, dialogType.NEW]),
  performanceId: PropTypes.string
};

PerformanceDialog.defaultProps = {
  currentValues: {},
  formType: dialogType.EDIT,
  performanceId: null
};


export default withStyles(styles)(PerformanceDialog);
