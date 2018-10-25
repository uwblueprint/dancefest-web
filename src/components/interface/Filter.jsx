import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import SimpleSelect from './MenuSelect';

class Filter extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}>
          Filter
          {''}
          <PlaylistAdd />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <MenuItem>
            <SimpleSelect />
          </MenuItem>
          <MenuItem>
            <SimpleSelect />
          </MenuItem>
          <MenuItem>
            <SimpleSelect />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default Filter;
