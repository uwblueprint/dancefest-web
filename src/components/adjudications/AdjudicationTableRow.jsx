import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LensIcon from '@material-ui/icons/Lens';

import AdjudicationDialog from './AdjudicationDialog';

const AdjudicationTableRow = ({
  collectionName,
  currentValues,
  id,
  performanceValues
}) => {
  const {
    audioURL,
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
          {audioURL ? 'yes' : 'no'}
        </p>
      </TableCell>
      <TableCell>
        {cumulativeMark}
      </TableCell>
      <TableCell>
        {specialAward && <LensIcon fontSize="inherit" color="primary" />}
        {choreoAward && <LensIcon fontSize="inherit" style={{ color: 'purple' }} />}
      </TableCell>
      <TableCell>
        <AdjudicationDialog
          adjudicationId={id}
          collectionName={collectionName}
          currentValues={currentValues}
          performanceValues={performanceValues} />
      </TableCell>
    </TableRow>
  );
};

AdjudicationTableRow.propTypes = {
  currentValues: PropTypes.shape({
    artisticMark: PropTypes.number,
    audioURL: PropTypes.string,
    choreoAward: PropTypes.bool,
    cumulativeMark: PropTypes.number,
    notes: PropTypes.string,
    judgeName: PropTypes.string,
    specialAward: PropTypes.bool,
    technicalMark: PropTypes.number
  }).isRequired,
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  performanceValues: PropTypes.shape().isRequired
};

export default AdjudicationTableRow;
