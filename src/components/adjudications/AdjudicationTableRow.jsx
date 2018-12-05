import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LensIcon from '@material-ui/icons/Lens';

import AdjudicationDialog from './AdjudicationDialog';

class AdjudicationTableRow extends React.Component {
  state = {};

  render() {
    const {
      id,
      judgeName,
      audio,
      specialAward,
      choreoAward,
      cumulativeMark
    } = this.props;

    return (
      <TableRow key={id}>
        <TableCell>
          {judgeName}
        </TableCell>
        <TableCell>
          <p>
            {audio ? 'yes' : 'no'}
          </p>
        </TableCell>
        <TableCell>
          {cumulativeMark}
        </TableCell>
        <TableCell>
          {specialAward && <LensIcon fontSize="inherit" style={{ color: 'purple' }} />}
          {choreoAward && <LensIcon fontSize="inherit" color="primary" />}
        </TableCell>
        <TableCell>
          <AdjudicationDialog currentValues={this.props} />
        </TableCell>
      </TableRow>
    );
  }
}

AdjudicationTableRow.propTypes = {
  audio: PropTypes.string,
  choreoAward: PropTypes.bool,
  cumulativeMark: PropTypes.number,
  id: PropTypes.number,
  judgeName: PropTypes.string,
  specialAward: PropTypes.bool
};

AdjudicationTableRow.defaultProps = {
  audio: '',
  cumulativeMark: 0,
  choreoAward: false,
  id: 1,
  judgeName: '',
  specialAward: false
};


export default AdjudicationTableRow;
