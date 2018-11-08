import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import Filter from './filter/index';


const TableHeader = ({ headings, classes }) => (
  <TableHead>
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
    <TableRow>
      {headings.map(heading => (
        <TableCell key={heading}>
          {heading}
        </TableCell>
      ))}
      <TableCell />
    </TableRow>
  </TableHead>
);

TableHeader.propTypes = {
  headings: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(TableHeader);
