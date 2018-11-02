import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';

import DFDialog from '../interface/dialog/DFDialog';
import DialogInput from '../interface/dialog/DialogInput';
import DialogSelect from '../interface/dialog/DialogSelect';
import DialogHeader from '../interface/dialog/DialogHeader';
import Button from '../interface/Button';
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
    const { classes, currentValues, type } = this.props;
    const { open } = this.state;
    const buttonTitle = type === 'edit' ? 'EDIT' : 'NEW EVENT';

    const performanceForm = (
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '25px' }}>
        <div style={{ flex: '1 0 0' }}>
          <DialogInput label="Dance Entry" />
          <DialogInput fullWidth label="Dance Title" />
          <DialogInput fullWidth label="Performers" helperText="Comma separated, eg. John Smith, Jane Doe" />
          <DialogInput fullWidth label="Choreographer" helperText="Comma separated, eg. John Smith, Jane Doe" />
        </div>

        <div style={{ flex: '1 0 0' }}>
          <div style={{ display: 'flex' }}>
            <DialogSelect fullWidth label="School" />
            <DialogSelect fullWidth label="Level" />
          </div>
          <DialogSelect fullWidth label="Competition Level" />
          <DialogSelect fullWidth label="Dance Style" helperText="  " />
          <DialogSelect fullWidth label="Size" />
        </div>
      </div>
    );


    return (
      <DFDialog
        open={open}
        buttonTitle={buttonTitle}
        onClick={this.handleClickOpen}
        onClose={this.handleClose}>
        <DialogHeader title="Edit Performance" onMoreClick={() => {}} />
        {performanceForm}
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

PerformanceDialog.propTypes = {
  classes: PropTypes.string.isRequired,
  currentValues: PropTypes.shape().isRequired,
  type: PropTypes.oneOf(['edit', 'new']).isRequired
};

export default withStyles(styles)(PerformanceDialog);
