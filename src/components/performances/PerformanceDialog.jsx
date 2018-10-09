import React from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

import FormHelperText from '@material-ui/core/FormHelperText';
import MenuSelect from '../interface/MenuSelect';
import DFDialog from '../interface/Dialog';

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


export default class PerformanceDialog extends React.Component {
  state = {};

  render() {
    const { currentValues, type } = this.props
    const buttonTitle = type === 'edit' ? 'EDIT' : 'NEW EVENT'

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

    const eventForm = (
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
                <MenuSelect style={{
                  margin:
                    '8px'
                }} />
              </DialogContent>
            </div>
            <div style={{ flex: '0 0 1' }}>
              <DialogContent style={fieldStyle}>
                <MenuSelect />
              </DialogContent>
            </div>
          </div>
          <div style={{ flex: '0 0 1' }}>
            <DialogContent style={fieldStyle}>
              <MenuSelect />
            </DialogContent>
            <DialogContent style={fieldStyle}>
              <MenuSelect />
            </DialogContent>
            <DialogContent style={fieldStyle}>
              <MenuSelect />
            </DialogContent>
          </div>
        </div>
      </div>
    );


    return (
      <DFDialog buttonTitle={buttonTitle} title="Edit Event">
        {eventForm}
      </DFDialog>
    );
  }
}

PerformanceDialog.propTypes = {
  currentValues: PropTypes.shape().isRequired,
  type: PropTypes.oneOf(['edit', 'new']).isRequired
};
