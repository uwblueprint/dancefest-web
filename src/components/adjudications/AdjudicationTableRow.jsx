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
      //audio yes or no
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
          {audio && (<p>Yes</p>)}
          {!audio && (<p>No</p>)}
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
  id: PropTypes.number,
  judge: PropTypes.string,
  cumlScore: PropTypes.number,
  audio: PropTypes.string,
  awards: PropTypes.string
};

AdjudicationTableRow.defaultProps = {
  id: 1,
  judge: '',
  cumlScore: null,
  audio: '',
  awards: ''
};


export default AdjudicationTableRow;
