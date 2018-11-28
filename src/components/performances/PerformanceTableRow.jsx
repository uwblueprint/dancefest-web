import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

import PerformanceDialog from './PerformanceDialog';

class PerformanceTableRow extends React.Component {
  state = {};

  render() {
    const {
      id,
      entryId,
      danceTitle,
      school,
      academicLevel,
      competitionLevel,
      danceStyle,
      performers,
      choreographers,
      groupSize
    } = this.props;

    const currentValues = {
      danceTitle,
      performers,
      danceStyle,
      competitionLevel,
      choreographers,
      academicLevel,
      school,
      groupSize
    };

    return (
      <TableRow style={{}}>
        <TableCell><Link to={`performance/${id}/adjudications`}>{danceTitle}</Link></TableCell>
        <TableCell>{entryId}</TableCell>
        <TableCell>{school}</TableCell>
        <TableCell>{academicLevel}</TableCell>
        <TableCell>{competitionLevel}</TableCell>
        <TableCell>{danceStyle}</TableCell>
        <TableCell>{groupSize}</TableCell>
        <TableCell>
          <PerformanceDialog
            formType="edit"
            currentValues={currentValues}
            performanceId={id} />

        </TableCell>
      </TableRow>
    );
  }
}

PerformanceTableRow.propTypes = {
  id: PropTypes.string,
  entryId: PropTypes.string,
  danceTitle: PropTypes.string,
  school: PropTypes.string,
  academicLevel: PropTypes.string,
  competitionLevel: PropTypes.string,
  danceStyle: PropTypes.string,
  performers: PropTypes.string,
  choreographers: PropTypes.string,
  groupSize: PropTypes.string
};

PerformanceTableRow.defaultProps = {
  id: null,
  entryId: '',
  danceTitle: '',
  school: '',
  academicLevel: '',
  competitionLevel: '',
  performers: null,
  choreographers: null,
  danceStyle: null,
  groupSize: ''
};

export default PerformanceTableRow;
