import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';

import AlertDialog from '../interface/editing/AlertDialog';

class SettingData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: false
    };
  }

  handleAlert = () => {
    this.setState({ alert: true });
  }

  render() {
    const { optionName } = this.props;
    const { alert } = this.state;

    return (
      <div style={{ float: 'left' }}>
        {`${optionName} `}
        <CloseIcon style={{ cursor: 'pointer' }} onClick={this.handleAlert} />
        {alert && (<AlertDialog optionName={optionName} />)}
      </div>
    );
  }
}

SettingData.propTypes = {
  optionName: PropTypes.string.isRequired
};

export default SettingData;
