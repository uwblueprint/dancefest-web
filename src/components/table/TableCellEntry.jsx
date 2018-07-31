import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';

const cell = ({ text }) => (
  <TableCell numeric>
    {text}
  </TableCell>
);

cell.propTypes = {
  text: PropTypes.string.isRequired
};

export default cell;
