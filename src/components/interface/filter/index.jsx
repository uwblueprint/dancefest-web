import React from 'react';
import Button from '@material-ui/core/Button';
import FilterIcon from '@material-ui/icons/PlaylistAdd';
import EnhancedMenu from './EnhancedMenu';

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

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { anchorEl } = this.state;
    const menuItems = [
      {
        key: 1,
        caption: 'Academic Level',
        options: [{ value: 'test', label: 'test' }, { value: 'test', label: 'test' }]
      },
      {
        key: 2,
        caption: 'Level of Competition',
        options: [{ value: 'test', label: 'test' }, { value: 'test', label: 'test' }]
      },
      {
        key: 3,
        caption: 'Dance Style',
        options: [{ value: 'test', label: 'test' }, { value: 'test', label: 'test' }]
      },
      {
        key: 4,
        caption: 'Dance Size',
        options: [{ value: 'test', label: 'test' }, { value: 'test', label: 'test' }]
      }
    ];

    return (
      <React.Fragment>
        <Button onClick={this.handleClick}>
          Filter
          <FilterIcon />
        </Button>
        <EnhancedMenu
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={Boolean(anchorEl)}
          menuItems={menuItems}
          anchorElement={anchorEl}
          onClose={this.handleMenuClose} />
      </React.Fragment>
    );
  }
}

export default Filter;
