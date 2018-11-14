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
      groupSize
    } = this.props;

    return (
      <TableRow style={{}}>
        <TableCell><Link to={`performance/${id}/adjudications`}>{danceTitle}</Link></TableCell>
        <TableCell>{entryId}</TableCell>
        <TableCell>{school}</TableCell>
        <TableCell>{academicLevel}</TableCell>
        <TableCell>{competitionLevel}</TableCell>
        <TableCell>{danceStyle}</TableCell>
        <TableCell>{groupSize}</TableCell>
        <TableCell><PerformanceDialog type="edit" currentValues={this.props} /></TableCell>
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
  groupSize: PropTypes.string
};

PerformanceTableRow.defaultProps = {
  id: null,
  entryId: '',
  danceTitle: '',
  school: '',
  academicLevel: '',
  competitionLevel: '',
  danceStyle: null,
  groupSize: ''
};

export default PerformanceTableRow;
