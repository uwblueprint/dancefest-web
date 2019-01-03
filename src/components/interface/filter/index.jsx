import React from 'react';
import Button from '@material-ui/core/Button';
import FilterIcon from '@material-ui/icons/PlaylistAdd';

import db from '../../../firebase/firebase';

import EnhancedMenu from './EnhancedMenu';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      options: {}
    };
  }

  componentDidMount() {
    this.subscribe = db.collection('settings').onSnapshot((querySnapshot) => {
      const options = {};
      querySnapshot.forEach((doc) => {
        options[doc.id] = Object.keys(doc.data());
      });
      this.setState({ options });
    });
  }

  componentWillUnmount() {
    this.subscribe();
  }

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
    const { anchorEl, options } = this.state;
    const categories = Object.keys(options);
    const renderOptions = opt => opt.map(o => ({ value: o, label: o }));

    const menuItems = options ? categories.map((name, index) => {
      const values = renderOptions(options[name]);
      return {
        key: `${name}-${index}`,
        caption: name,
        options: values
      };
    }) : [];

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
