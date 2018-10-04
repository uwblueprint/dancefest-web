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
import FormHelperText from '@material-ui/core/FormHelperText';
import SimpleSelect from './MenuSelect';

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
  color: 'secondary',
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

export default class EditPerformanceDialog extends React.Component {
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
            Edit Performance
          </DialogTitle>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '0 0 1' }}>
              <DialogContent style={fieldStyle}>
                <TextField
                  style={{ margin: '8px' }}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Dance Entry"
                  type="email"
                  fullWidth />
              </DialogContent>
              <DialogContent style={fieldStyle}>
                <TextField
                  style={{ margin: '1px' }}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Dance Title"
                  type="email"
                  fullWidth />
              </DialogContent>
              <FormHelperText style={{ marginLeft: '15%', marginTop: '-10%' }}>
                Comma separated, eg. John Smith, Jane Doe
              </FormHelperText>
              <DialogContent style={fieldStyle}>
                <TextField
                  style={{ margin: '8px' }}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Label"
                  type="email"
                  fullWidth />
              </DialogContent>
              <FormHelperText style={{ marginLeft: '15%', marginTop: '-10%' }}>
                Comma separated, eg. John Smith, Jane Doe
              </FormHelperText>
              <DialogContent style={fieldStyle}>
                <TextField
                  style={{ margin: '8px' }}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Label"
                  type="email"
                  fullWidth />
              </DialogContent>
            </div>

            <div style={{ flex: '0 0 1' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: '0 0 1' }}>
                  <DialogContent style={fieldStyle}>
                    <SimpleSelect style={{
                      margin:
                        '8px'
                    }} />
                  </DialogContent>
                </div>
                <div style={{ flex: '0 0 1' }}>
                  <DialogContent style={fieldStyle}>
                    <SimpleSelect />
                  </DialogContent>
                </div>
              </div>
              <div style={{ flex: '0 0 1' }}>
                <DialogContent style={labelFieldStyle}>
                  <SimpleSelect />
                </DialogContent>
                <DialogContent style={fieldStyle}>
                  <SimpleSelect />
                </DialogContent>
                <DialogContent style={fieldStyle}>
                  <SimpleSelect />
                </DialogContent>
              </div>
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
