import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';

const cell = ({ text, number, button }) => (
  <TableCell string>
    {text}
    {number}
    {button}
  </TableCell>
);

cell.propTypes = {
  text: PropTypes.string,
  number: PropTypes.number,
  button: PropTypes.string
};

cell.defaultProps = {
  text: '',
  number: null,
  button: null
};

export default cell;
