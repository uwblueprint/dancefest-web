import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import Filter from './filter/index';

// TODO: implement filter components for award considerations
const TableSettings = ({ classes }) => (
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
    <Filter />
  </div>
);

TableSettings.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(TableSettings);
