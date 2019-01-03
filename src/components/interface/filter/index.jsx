import React from 'react';
import Button from '@material-ui/core/Button';
import FilterIcon from '@material-ui/icons/PlaylistAdd';

import db from '../../../firebase/firebase';

import FilterMenu from './FilterMenu';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      options: {},
      filtered: {
        academicLevel: [],
        competitionLevel: [],
        danceSize: [],
        danceStyle: [],
        school: []
      }
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

  handleFilterChecked = (e) => {
    const { filtered } = this.state;
    const { name, value, checked } = e.target;
    console.log(e.target);
    console.log(name, value, checked, '@@');

    if (!checked) {
      this.setState(prevState => ({
        filtered: {
          [name]: prevState.filtered[name].filter(v => v !== value),
          ...prevState.filtered
        }
      }));
    } else {
      this.setState(prevState => ({
        filtered: {
          [name]: prevState.filtered[name].push(value),
          ...prevState.filtered
        }
      }));
    }
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { anchorEl, filtered, options } = this.state;
    const categories = Object.keys(options);
    const renderOptions = (name, opt) => opt.map(o => ({ label: o, name, value: o }));

    const menuItems = options ? categories.map((name, index) => {
      const values = renderOptions(name, options[name]);
      return {
        key: `${name}-${index}`,
        caption: name,
        options: values
      };
    }) : [];

    console.log(filtered);

    return (
      <React.Fragment>
        <Button onClick={this.handleClick}>
          Filter
          <FilterIcon />
        </Button>
        <FilterMenu
          anchorElement={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          getContentAnchorEl={null}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          menuItems={menuItems}
          open={Boolean(anchorEl)}
          onChange={this.handleFilterChecked}
          onClose={this.handleMenuClose} />
      </React.Fragment>
    );
  }
}

export default Filter;
