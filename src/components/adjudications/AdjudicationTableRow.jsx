import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import EventDialog from '../events/EventDialog';
import AdjudicationDialog from './AdjudicationDialog';

class AdjudicationTableRow extends React.Component {
  state = {};

  render() {
    const {
      id,
      judge,
      audio,
      cumlScore,
      awards
    } = this.props;

    return (
      <TableRow key={id}>
        <TableCell>
          {judge}
        </TableCell>
        <TableCell>
          {audio}
        </TableCell>
        <TableCell>
          {cumlScore}
        </TableCell>
        <TableCell>
          {awards}
        </TableCell>
        <TableCell>
          <AdjudicationDialog type="edit" currentValues={this.props} />
        </TableCell>
      </TableRow>
    );
  }
}

AdjudicationTableRow.propTypes = {
  id: PropTypes.number,
  judge: PropTypes.string,
  cumlScore: PropTypes.string,
  audio: PropTypes.string
};

AdjudicationTableRow.defaultProps = {
  id: 1,
  judge: '',
  cumlScore: '',
  audio: ''
};


export default AdjudicationTableRow;
