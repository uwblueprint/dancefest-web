import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';

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

  handleSubmit = () => {}

  render() {
    const { classes, type } = this.props;
    const { eventTitle, eventDate, numJudges, open } = this.state;
    const buttonTitle = type === 'edit' ? 'EDIT' : 'NEW EVENT';

    return (
      <DFDialog
        open={open}
        buttonTitle={buttonTitle}
        onClick={this.handleClickOpen}
        onClose={this.handleClose}>
        <DialogHeader title="Edit Event" onMoreClick={() => {}} />
        <div style={{ margin: '25px' }}>
          <DialogInput fullWidth name="eventTitle" label="Event Title" onChange={this.handleChange} value={eventTitle} />
          <div style={{ display: 'flex' }}>
            <DialogInput fullWidth name="eventDate" label="Event Date" onChange={this.handleChange} value={eventDate} />
            <DialogInput fullWidth name="numJudges" label="No. Judges" onChange={this.handleChange} value={numJudges} />
          </div>
        </div>
        <div className={classes.dfdialog_footer}>
          <DialogActions>
            <Button type="default" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button type="primary" onClick={this.handleClose}>
              Save
            </Button>
          </DialogActions>
        </div>
      </DFDialog>
    );
  }
}

EventDialog.propTypes = {
  defaultValues: PropTypes.shape().isRequired,
  type: PropTypes.oneOf(['edit', 'new']).isRequired
};

export default withStyles(styles)(EventDialog);
