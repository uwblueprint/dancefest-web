import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import FilterIcon from '@material-ui/icons/PlaylistAdd';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SubMenu from './SubMenu';

class FilterMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  handleMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  aggregateChoices = (name, opt) => {
    const { filtered } = this.props;

    return opt.map(o => ({
      checked: filtered[name].includes(o),
      label: o,
      name,
      value: o
    }));
  };

  renderMenuItems = options => Object.keys(options).map((name, index) => {
    const { handleFilterChecked } = this.props;
    const choices = this.aggregateChoices(name, options[name]);
    const key = `${name}-${index}`;
    const result = name.replace( /([A-Z])/g, " $1" );
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

    return (
      <SubMenu
        caption={finalResult}
        choices={choices}
        key={key}
        onChange={handleFilterChecked} />
    );
  })

  render() {
    const { anchorEl } = this.state;
    const { handleFilterClearAll, options } = this.props;
    const anchorOrigin = { horizontal: 'left', vertical: 'bottom' };
    const transformOrigin = { horizontal: 'left', vertical: 'top' };
    const menuItems = options && this.renderMenuItems(options);

    return (
      <React.Fragment>
        <Button onClick={this.handleMenuOpen}>
          Filter
          <FilterIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={anchorOrigin}
          getContentAnchorEl={null}
          transformOrigin={transformOrigin}
          onClose={this.handleMenuClose}
          open={Boolean(anchorEl)}>
          {menuItems}
          <hr />
          <MenuItem onClick={handleFilterClearAll}>
            Clear All Filters
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

FilterMenu.propTypes = {
  filtered: PropTypes.shape({
    academicLevel: PropTypes.arrayOf(PropTypes.string),
    awardConsideration: PropTypes.arrayOf(PropTypes.string),
    competitionLevel: PropTypes.arrayOf(PropTypes.string),
    danceSize: PropTypes.arrayOf(PropTypes.string),
    danceStyle: PropTypes.arrayOf(PropTypes.string),
    school: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  handleFilterChecked: PropTypes.func.isRequired,
  handleFilterClearAll: PropTypes.func.isRequired,
  options: PropTypes.shape({}).isRequired
};

export default FilterMenu;
