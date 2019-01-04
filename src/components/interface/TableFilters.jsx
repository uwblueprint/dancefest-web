import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';

import Filter from './filter/index';
import styles from '../styles';

// TODO: implement filter components for award considerations
const TableFilters = ({ classes, handleFilters }) => (
  <div style={{ display: 'flex', margin: '5px' }}>
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
        }} />
    </div>
    <Filter handleFilters={handleFilters} />
  </div>
);

TableFilters.propTypes = {
  classes: PropTypes.shape().isRequired,
  handleFilters: PropTypes.func.isRequired
};

export default withStyles(styles)(TableFilters);
