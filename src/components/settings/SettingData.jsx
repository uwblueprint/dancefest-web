import React from 'react';
import PropTypes from 'prop-types';

class SettingData extends React.Component {
  state = {};

  render() {
    const { optionName } = this.props;
    return (
      <div style={{ float: 'left' }}>
        {optionName}
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
