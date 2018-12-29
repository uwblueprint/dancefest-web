import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

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
    const { collectionName, formType } = this.props;
    const { open } = this.state;
    const shouldShowDropdown = formType === 'edit';
    const dialogTitle = formType === 'edit' ? 'Edit' : 'New';
    const buttonTitle = formType === 'edit' ? 'EDIT'
      : (
        <React.Fragment>
          <CalendarTodayIcon style={{ color: 'gray', marginRight: '5px' }} />
          NEW PERFORMANCE
        </React.Fragment>);
    return (
      <DFDialog
        open={open}
        buttonTitle={buttonTitle}
        formType={formType}
        onClick={this.handleClickOpen}
        onClose={this.handleClose}>
        <DialogHeader shouldShowDropdown={shouldShowDropdown} title={`${dialogTitle} Performance`} collectionName={collectionName} />
        <PerformanceForm
          {...(this.props)}
          eventId={this.props.eventId}
          onModalClose={this.handleClose} />
      </DFDialog>
    );
  }
}

PerformanceDialog.propTypes = {
  currentValues: PropTypes.shape().isRequired,
  formType: PropTypes.oneOf(['edit', 'new'])
};

PerformanceDialog.defaultProps = {
  formType: 'edit'
};


export default withStyles(styles)(PerformanceDialog);
