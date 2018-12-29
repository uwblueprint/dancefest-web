import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import AlertDialog from '../interface/editing/AlertDialog';


class SettingData extends React.Component {
  state = {
    alert: false
  };

  callAlert = () => {
    this.setState({ alert: true });
  }

  render() {
    const { optionName } = this.props;
    const { alert } = this.state;
    return (
      <div style={{ float: 'left' }}>
        {`${optionName} `}
        <CloseIcon style={{ cursor: 'pointer' }} onClick={this.callAlert} />
        {alert && (<AlertDialog optionName={optionName} />)}
      </div>
    );
  }
}

SettingData.propTypes = {
  optionName: PropTypes.string.isRequired
};


SettingData.defaultProps = {
};

export default SettingData;
