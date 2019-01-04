import React from 'react';
import PropTypes from 'prop-types';

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

  handleFilterClearAll = () => this.setState({
    filtered: {
      academicLevel: [],
      competitionLevel: [],
      danceSize: [],
      danceStyle: [],
      school: []
    }
  })

  handleFilterChecked = (e) => {
    const { name, value, checked } = e.target;
    const { handleFilters } = this.props;
    const { filtered } = this.state;

    this.setState((prevState) => {
      const category = prevState.filtered[name];
      const filteredValues = checked ? category.concat(value) : category.filter(v => v !== value);
      return {
        filtered: {
          ...prevState.filtered,
          [name]: filteredValues
        }
      };
    });

    handleFilters(filtered);
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { anchorEl, filtered, options } = this.state;
    const anchorOrigin = { vertical: 'bottom', horizontal: 'left' };
    const transformOrigin = { vertical: 'top', horizontal: 'left' };
    const categories = Object.keys(options);
    const renderOptions = (name, opt) => (opt.map(o => ({
      checked: filtered[name].includes(o),
      label: o,
      name,
      value: o
    })));

    const menuItems = options ? categories.map((name, index) => {
      const values = renderOptions(name, options[name]);
      return {
        caption: name,
        key: `${name}-${index}`,
        options: values
      };
    }) : [];

    return (
      <React.Fragment>
        <Button onClick={this.handleClick}>
          Filter
          <FilterIcon />
        </Button>
        <FilterMenu
          anchorElement={anchorEl}
          anchorOrigin={anchorOrigin}
          getContentAnchorEl={null}
          transformOrigin={transformOrigin}
          menuItems={menuItems}
          open={Boolean(anchorEl)}
          onChange={this.handleFilterChecked}
          onClose={this.handleMenuClose} />
      </React.Fragment>
    );
  }
}

Filter.propTypes = {
  handleFilters: PropTypes.func.isRequired
};

export default Filter;
