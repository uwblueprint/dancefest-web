import React from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

import FormHelperText from '@material-ui/core/FormHelperText';
import MenuSelect from '../interface/MenuSelect';
import DFDialog from '../interface/DFDialog';

const fieldStyle = {
  background: 'rgb(211,211,211)',
  color: 'white',
  alignItems: 'center',
  margin: '25px 0 0'
};

const firstfieldStyle = {
  background: 'rgb(211,211,211)',
  color: 'white',
  alignItems: 'center',
  margin: '25px 0 0',
  paddingTop: '0'
};

const leftDialogInput = {
  background: 'rgb(211,211,211)',
  color: 'white',
  alignItems: 'center',
  margin: '25px 0 0 5px'
};

const rightDialogInput = {
  background: 'rgb(211,211,211)',
  color: 'white',
  alignItems: 'center',
  margin: '25px 5px 0 0'
};


export default class PerformanceDialog extends React.Component {
  state = {};

  render() {
    const { currentValues, type } = this.props;
    const buttonTitle = type === 'edit' ? 'EDIT' : 'NEW EVENT';

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
      <div style={{ display: 'flex', justifyContent: 'space-around', paddingBottom: '25px' }}>
        <div style={{ flex: '0 0 1' }}>
          <DialogContent style={firstfieldStyle}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Dance Entry"
              type="email"
              fullWidth />
          </DialogContent>
          <DialogContent style={fieldStyle}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Dance Title"
              type="email"
              fullWidth />
          </DialogContent>
          <FormHelperText>
            Comma separated, eg. John Smith, Jane Doe
          </FormHelperText>
          <DialogContent style={fieldStyle}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Label"
              type="email"
              fullWidth />
          </DialogContent>
          <FormHelperText>
            Comma separated, eg. John Smith, Jane Doe
          </FormHelperText>
          <DialogContent style={fieldStyle}>
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
              <MenuSelect style={{ firstfieldStyle }} />
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
      <DFDialog buttonTitle={buttonTitle} title="Edit Performance">
        {eventForm}
      </DFDialog>
    );
  }
}

PerformanceDialog.propTypes = {
  currentValues: PropTypes.shape().isRequired,
  type: PropTypes.oneOf(['edit', 'new']).isRequired
};
