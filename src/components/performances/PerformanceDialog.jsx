import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import PerformanceForm from './PerformanceForm';
import DFDialog from '../interface/dialog/DFDialog';
import DialogHeader from '../interface/dialog/DialogHeader';
import styles from '../styles';
import addData from '../../firebase/utils/addData';

class PerformanceDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDup = async () => {
    const {
      currentValues
    } = this.props;
    const vals = {
      ... currentValues,
      danceTitle: `${currentValues.danceTitle} Duplicate`
    };
    const { eventId } = this.props;
    const collectionName = `events/${eventId}/performances`;

    await addData(collectionName, vals);
    this.handleClose();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
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
    const shouldShowDropdown = formType === 'edit';
    const dialogTitle = formType === 'edit' ? 'Edit' : 'New';
    const buttonTitle = formType === 'edit' ? 'EDIT'
      : (
        <React.Fragment>
          <CalendarTodayIcon style={{ color: 'gray', marginRight: '5px' }} />
          NEW PERFORMANCE
        </React.Fragment>);
    const title = `${dialogTitle} Performance`;

    return (
      <DFDialog
        buttonTitle={buttonTitle}
        formType={formType}
        onClick={this.handleClickOpen}
        onClose={this.handleClose}
        open={open}>
        <DialogHeader
          collectionName={collectionName}
          docId={performanceId}
          handleDup={this.handleDup}
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
  collectionName: PropTypes.string,
  eventId: PropTypes.string.isRequired,
  formType: PropTypes.oneOf(['edit', 'new']),
  performanceId: PropTypes.string
};

PerformanceDialog.defaultProps = {
  collectionName: '',
  currentValues: {},
  formType: 'edit',
  performanceId: null
};


export default withStyles(styles)(PerformanceDialog);
