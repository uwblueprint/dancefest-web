import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import LensIcon from '@material-ui/icons/Lens';
import SearchIcon from '@material-ui/icons/Search';

import CheckBox from '../CheckBox';
import db from '../../../firebase/firebase';
import FilterMenu from './FilterMenu';
import styles from '../../styles';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filtered: {
        academicLevel: [],
        awardConsideration: [],
        competitionLevel: [],
        danceSize: [],
        danceStyle: [],
        school: []
      },
      options: {},
      search: undefined
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

  componentDidUpdate(prevProps, prevState) {
    const { filtered: prevFiltered, search: prevSearch } = prevState;
    const { filtered: currFiltered, search: currSearch } = this.state;
    const { handleFilters } = this.props;
    if (!isEqual(prevFiltered, currFiltered) || !isEqual(prevSearch, currSearch)) {
      handleFilters(currFiltered, currSearch);
    }
  }

  componentWillUnmount() {
    this.subscribe();
  }

  handleFilterClearAll = () => this.setState({
    filtered: {
      academicLevel: [],
      awardConsideration: [],
      competitionLevel: [],
      danceSize: [],
      danceStyle: [],
      school: []
    },
    search: undefined
  })

  handleFilterChecked = (e) => {
    const { name, value, checked } = e.target;
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
  };

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ search: value });
  }

  render() {
    const { filtered, options, search } = this.state;
    const { awardConsideration } = filtered;
    const { classes } = this.props;
    const choices = [
      {
        checked: awardConsideration.includes('specialAward'),
        name: 'awardConsideration',
        value: 'specialAward',
        label: (
          <React.Fragment>
            Special Award Only
            <LensIcon color="primary" fontSize="inherit" style={{ marginLeft: '5px', verticalAlign: 'middle' }} />
          </React.Fragment>
        )
      },
      {
        checked: awardConsideration.includes('choreoAward'),
        name: 'awardConsideration',
        value: 'choreoAward',
        label: (
          <React.Fragment>
            Choreography Awards Only
            <LensIcon fontSize="inherit" style={{ color: 'purple', marginLeft: '5px', verticalAlign: 'middle' }} />
          </React.Fragment>
        )
      }
    ];

    return (
      <div style={{ display: 'flex', height: '40px' }}>
        <div className={classes.header_search}>
          <div className={classes.header_searchIcon}>
            <SearchIcon />
          </div>
          <Input
            placeholder="Search"
            disableUnderline
            classes={{
              root: classes.header_inputRoot,
              input: classes.header_inputInput
            }}
            name="search"
            onChange={this.handleInputChange}
            value={search} />
        </div>
        <FilterMenu
          filtered={filtered}
          handleFilterClearAll={this.handleFilterClearAll}
          handleFilterChecked={this.handleFilterChecked}
          options={options} />
        <CheckBox row choices={choices} onChange={this.handleFilterChecked} />
      </div>
    );
  }
}

Filter.propTypes = {
  classes: PropTypes.shape().isRequired,
  handleFilters: PropTypes.func.isRequired
};

export default withStyles(styles)(Filter);
