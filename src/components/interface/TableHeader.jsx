import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

const TableHeader = ({ headings }) => (
  <TableHead>
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
  headings: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default withStyles(styles)(TableHeader);
