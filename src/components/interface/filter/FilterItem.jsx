import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import CheckBoxLabels from '../CheckBox';

export default class FilterItem extends React.Component {
  state = {};

  render() {
    const {
      anchorElement,
      open,
      onClose,
      ...others
    } = this.props;

    return (
      <Menu {...others} anchorEl={anchorElement} open={open} onClose={onClose}>
        <div style={{ padding: '15px', outline: 'none' }}>
          <CheckBoxLabels
            choices={[{ value: 'test', label: 'test' }, { value: 'test', label: 'test' }]} />
        </div>
      </Menu>
    );
  }
}

FilterItem.propTypes = {
  anchorElement: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
