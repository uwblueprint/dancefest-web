import React from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DFDialog from '../interface/DFDialog';

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


export default class EventDialog extends React.Component {
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
      <div style={{ margin: '35px' }}>
        <DialogInput style={fieldStyle} />
        <div style={{ display: 'flex' }}>
          <DialogInput style={rightDialogInput} />
          <DialogInput style={leftDialogInput} />
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

EventDialog.propTypes = {
  currentValues: PropTypes.shape().isRequired,
  type: PropTypes.oneOf(['edit', 'new']).isRequired
};
