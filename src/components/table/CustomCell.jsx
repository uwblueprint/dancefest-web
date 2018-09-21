import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';

const CustomCell = ({ text, number, button }) => (
  <TableCell string>
    {text}
    {number}
    {button}
  </TableCell>
);

CustomCell.propTypes = {
  text: PropTypes.string,
  number: PropTypes.number,
  button: PropTypes.string
};

CustomCell.defaultProps = {
  text: '',
  number: null,
  button: null
};

export default CustomCell;
