import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import db from '../../firebase/firebase';

import DFDialog from '../interface/dialog/DFDialog';
import DialogHeader from '../interface/dialog/DialogHeader';
import DialogInput from '../interface/dialog/DialogInput';
import Button from '../interface/Button';
import styles from '../styles';

class EventDialog extends React.Component {
  constructor(props) {
    super(props);
    const { defaultValues } = props;

    this.state = {
      eventTitle: defaultValues.eventTitle || '',
      eventDate: defaultValues.eventDate || '',
      numJudges: defaultValues.numJudges || '',
      open: false
    };
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

  handleSubmit = () => {
    this.updateData();
  }

  updateData = () => {
    db.collection('events').doc('gXzBAVAMM2CPgdZObWnY').set({
      eventTitle: 'testing update data'
    }, { merge: true })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  render() {
    const { classes, formType } = this.props;
    const {
      eventTitle,
      eventDate, numJudges,
      open
    } = this.state;
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
        <DialogHeader title={`${dialogTitle} Event`} onMoreClick={() => {}} />
        <div style={{ margin: '25px' }}>
          <DialogInput fullWidth name="eventTitle" label="Event Title" onChange={this.handleChange} value={eventTitle} />
          <div style={{ display: 'flex' }}>
            <DialogInput style={{ marginRight: '5px' }} fullWidth name="eventDate" label="Event Date" onChange={this.handleChange} value={eventDate} />
            <DialogInput fullWidth name="numJudges" label="No. Judges" onChange={this.handleChange} value={numJudges} />
          </div>
        </div>
        <div className={classes.dfdialog_footer}>
          <DialogActions>
            <Button type="default" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button type="primary" onClick={this.updateData}>
              Save
            </Button>
          </DialogActions>
        </div>
      </DFDialog>
    );
  }
}

EventDialog.propTypes = {
  classes: PropTypes.string.isRequired,
  defaultValues: PropTypes.shape().isRequired,
  formType: PropTypes.oneOf(['edit', 'new'])
};

EventDialog.defaultProps = {
  formType: 'edit'
};

export default withStyles(styles)(EventDialog);
