import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import styles from '../styles';

const fieldStyle = {
  background: 'rgb(211,211,211)',
  color: 'white',
  alignItems: 'center',
  padding: '15px',
  margin: '35px 0 0'
};

const leftDialogInput = {
  background: 'rgb(211,211,211)',
  color: 'white',
  alignItems: 'center',
  padding: '15px',
  margin: '35px 0 0 5px'
};

const rightDialogInput = {
  background: 'rgb(211,211,211)',
  color: 'white',
  alignItems: 'center',
  padding: '15px',
  margin: '35px 5px 0 0'
};

class AdjudicationDialog extends React.Component {
  state = {
    open: false,
    view: true
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, view: false });
  };

  handleView = () => {
    this.setState((prevState) => { prevState.view; });
  }

  render() {
    const { currentValues, type, classes } = this.props;
    const { open, view } = this.state;
    const buttonTitle = type === 'edit' ? 'EDIT' : 'NEW EVENT';

    console.log(currentValues);

    const DialogInput = ({ style }) => (
      <DialogContent style={style}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Label"
          type="email"
          fullWidth />
      </DialogContent>
    );

    const adjudicationForm = (
      <div style={{ margin: '35px' }}>
        <DialogInput style={fieldStyle} />
        <div style={{ display: 'flex' }}>
          <DialogInput style={rightDialogInput} />
          <DialogInput style={leftDialogInput} />
        </div>
      </div>
    );

    return (
      <div>
        <Button classes={{ root: classes.table_editButton }} onClick={this.handleClickOpen}>
          {buttonTitle}
        </Button>
        <Dialog
          fullWidth
          maxWidth="md"
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          {view ? (
            <div>
              <DialogTitle classes={{ root: classes.dfdialog_title }} disableTypography id="form-dialog-title">
                
              </DialogTitle>
              <div onClick={() => { this.setState({ view: !view }); }} />
            </div>
          )
            : (<div>
              <DialogTitle classes={{ root: classes.dfdialog_title }} disableTypography id="form-dialog-title">
                Edit Performance
              </DialogTitle>

              {adjudicationForm}

              <div className={classes.dfdialog_footer}>
                <DialogActions>
                  <Button onClick={this.handleClose} classes={{ root: classes.dfdialog_saveButton }}>
                    Cancel
                  </Button>
                  <Button onClick={this.handleClose} classes={{ root: classes.dfdialog_cancelButton }}>
                    Save
                  </Button>
                </DialogActions>
              </div>
            </div>
            )
          }
        </Dialog>
      </div>
    );
  }
}

AdjudicationDialog.propTypes = {
  currentValues: PropTypes.shape().isRequired,
  classes: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['edit', 'new']).isRequired
};

export default withStyles(styles)(AdjudicationDialog);
