import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LensIcon from '@material-ui/icons/Lens';

import AdjudicationDialog from './AdjudicationDialog';

const AdjudicationTableRow = ({
  collectionName,
  currentValues,
  id
}) => {
  const {
    audio,
    choreoAward,
    cumulativeMark,
    judgeName,
    specialAward
  } = currentValues;

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
        <AdjudicationDialog
          adjudicationId={id}
          collectionName={collectionName}
          currentValues={currentValues} />
      </TableCell>
    </TableRow>
  );
};

AdjudicationTableRow.propTypes = {
  currentValues: PropTypes.shape().isRequired,
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default AdjudicationTableRow;
