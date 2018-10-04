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
  color: 'white',
  height: 48,
  margin: '35px'
};

const labelFieldStyle = {
  display: 'flex',
  background: 'rgb(211,211,211)',
  height: 48,
  margin: '0 35px'
};

const dialogTitle = {
  color: 'rgb(255,0,0)',
  borderBottom: '1px solid #4d4d4d',
  margin: '0 40px 0 40px'
};

const dialogBox = {
  display: 'flex',
  flexWrap: 'wrap'
};

const buttonStyle = {
  border: '1px solid #4d4d4d',
  borderRadius: '40px'
};

const saveBtn = {
  backgroundColor: '#000',
  color: '#fff',
  border: '1px solid #4d4d4d',
  borderRadius: '40px'
};

const cancelBtn = {
  backgroundColor: '#d4d44',
  border: '1px solid #4d4d4d',
  borderRadius: '40px'
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
        <Button style={buttonStyle} onClick={this.handleClickOpen}>
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
              style={{ margin: '8px' }}
              autoFocus
              margin="dense"
              id="name"
              label="Event Title"
              type="email"
              fullWidth />
          </DialogContent>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '0 0 1' }}>
              <DialogContent style={labelFieldStyle}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Label"
                  type="email"
                  fullWidth />
              </DialogContent>
            </div>
            <div style={{ flex: '0 0 1' }}>
              <DialogContent style={labelFieldStyle}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Label"
                  type="email"
                  fullWidth />
              </DialogContent>
            </div>
          </div>
          <div style={{ backgroundColor: '#F7F7F7', marginTop: '20px' }}>
            <DialogActions>
              <Button onClick={this.handleClose} style={cancelBtn}>
                Cancel
              </Button>
              <Button onClick={this.handleClose} style={saveBtn}>
                Save
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}
