import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LensIcon from '@material-ui/icons/Lens';

import PerformanceAdjudicationDialog from './PerformanceAdjudicationDialog';

const PerformanceAdjudicationTableRow = ({
  collectionName,
  currentValues,
  id,
  performanceValues,
  updateData,
}) => {
  const {
    audioUrl,
    artisticMark,
    choreoAward,
    cumulativeMark,
    specialAward,
    tabletId,
    technicalMark
  } = currentValues;

  return (
    <TableRow key={id}>
      <TableCell>
        {tabletId}
      </TableCell>
      <TableCell>
        <p>
          {audioUrl ? 'yes' : 'no'}
        </p>
      </TableCell>
      <TableCell>
        {artisticMark}
      </TableCell>
      <TableCell>
        {technicalMark}
      </TableCell>
      <TableCell>
        {cumulativeMark}
      </TableCell>
      <TableCell>
        {specialAward && <LensIcon fontSize="inherit" color="primary" />}
        {choreoAward && <LensIcon fontSize="inherit" style={{ color: 'purple' }} />}
      </TableCell>
      <TableCell>
        <PerformanceAdjudicationDialog
          updateData={updateData}
          adjudicationId={id}
          collectionName={collectionName}
          currentValues={currentValues}
          performanceValues={performanceValues} />
      </TableCell>
    </TableRow>
  );
};

PerformanceAdjudicationTableRow.propTypes = {
  currentValues: PropTypes.shape({
    artisticMark: PropTypes.number,
    audioUrl: PropTypes.string,
    choreoAward: PropTypes.bool,
    cumulativeMark: PropTypes.number,
    notes: PropTypes.string,
    specialAward: PropTypes.bool,
    tabletId: PropTypes.number,
    technicalMark: PropTypes.number
  }).isRequired,
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  performanceValues: PropTypes.shape({
    academicLevel: PropTypes.string,
    choreographers: PropTypes.string,
    competitionLevel: PropTypes.string,
    danceEntry: PropTypes.string,
    danceSize: PropTypes.string,
    danceStyle: PropTypes.string,
    danceTitle: PropTypes.string,
    performers: PropTypes.string,
    school: PropTypes.string
  }).isRequired
};

export default PerformanceAdjudicationTableRow;
