import React from 'react';
import PropTypes from 'prop-types';

import DFDialog from '../interface/dialog/DFDialog';
import DialogInput from '../interface/dialog/DialogInput';
import DialogSelect from '../interface/dialog/DialogSelect';

export default class PerformanceDialog extends React.Component {
  state = {};

  render() {
    const { currentValues, type } = this.props;
    const buttonTitle = type === 'edit' ? 'EDIT' : 'NEW EVENT';

    const performanceForm = (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ flex: '1 0 0' }}>
          <DialogInput label="Dance Entry" />
          <DialogInput fullWidth label="Dance Title" />
          <DialogInput fullWidth label="Performers" helperText="Comma separated, eg. John Smith, Jane Doe" />
          <DialogInput fullWidth label="Choreographer" helperText="Comma separated, eg. John Smith, Jane Doe" />
        </div>

        <div style={{ flex: '1 0 0', marginTop: '2.5%' }}>
          <div style={{ display: 'flex' }}>
            <DialogSelect fullWidth label="School" />
            <DialogSelect fullWidth label="Level" />
          </div>
          <DialogSelect fullWidth label="Competition Level" />
          <DialogSelect fullWidth label="Dance Style" />
          <DialogSelect fullWidth label="Size" />
        </div>
      </div>
    );


    return (
      <DFDialog buttonTitle={buttonTitle} title="Edit Performance">
        {performanceForm}
      </DFDialog>
    );
  }
}

PerformanceDialog.propTypes = {
  currentValues: PropTypes.shape().isRequired,
  type: PropTypes.oneOf(['edit', 'new']).isRequired
};
