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
    const { currentValues, formType } = this.props;
    const { open } = this.state;
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
        <DialogHeader title={`${dialogTitle} Performance`} onMoreClick={() => {}} />
        <PerformanceForm
          formType={formType}
          currentValues={currentValues}
          onModalClose={this.handleClose} />
      </DFDialog>
    );
  }
}

PerformanceDialog.propTypes = {
  currentValues: PropTypes.shape(),
  formType: PropTypes.oneOf(['edit', 'new'])
};

PerformanceDialog.defaultProps = {
  currentValues: [],
  formType: 'edit'
};


export default withStyles(styles)(PerformanceDialog);
