import React from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const fieldStyle = {
  background: 'rgb(211,211,211)',
  borderRadius: 3,
  color: 'white',
  height: 48,
  padding: '0 30px',
  margin: '35px'
};

const labelFieldStyle = {
  display: 'flex',
  background: 'rgb(211,211,211)',
  borderRadius: 3,
  height: 48,
  padding: '0 30px',
  margin: '35px'
};

const dialogTitle = {
  color: 'rgb(255,0,0)'
};

const dialogBox = {
  display: 'flex'
};


export default class EventDialog extends React.Component {
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
    return (
      <div>
        <Button onClick={this.handleClickOpen}>
          EDIT
        </Button>
        <Dialog
          style={dialogBox}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle style={dialogTitle} id="form-dialog-title">
            Edit Event
          </DialogTitle>
          <DialogContent style={fieldStyle}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Event Title"
              type="email"
              fullWidth />
          </DialogContent>
          <DialogContent style={labelFieldStyle}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Label"
              type="email"
              fullWidth />
          </DialogContent>
          <DialogContent style={labelFieldStyle}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Label"
              type="email"
              fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
