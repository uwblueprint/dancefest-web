import React from 'react';
import PropTypes from 'prop-types';

import CancelIcon from '@material-ui/icons/Cancel';

import AlertDialog from '../interface/editing/AlertDialog';

class SettingData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: false
    };
  }

  handleShowAlert = () => {
    this.setState({ showAlert: true });
  }

  handleCloseAlert = () => {
    this.setState({ showAlert: false });
  }

  render() {
    const { optionName } = this.props;
    const { showAlert } = this.state;

    return (
      <div style={{ width: '100%', marginTop: '5px', marginBottom: '5px' }}>
        <div style={{ clear: 'both', float: 'left', width: 'auto' }}>
          {`${optionName} `}
        </div>
        <div style={{ float: 'right', width: 'auto' }}>
          <CancelIcon fontSize="inherit" style={{ cursor: 'pointer', color: '#99999', verticalAlign: 'middle' }} onClick={this.handleShowAlert} />
          <AlertDialog showAlert={showAlert} {...this.props} onClose={this.handleCloseAlert} />
        </div>
      </div>
    );
  }
}

SettingData.propTypes = {
  optionName: PropTypes.string.isRequired
};

export default SettingData;
