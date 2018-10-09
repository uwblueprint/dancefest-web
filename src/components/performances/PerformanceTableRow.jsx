import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import PerformanceDialog from './PerformanceDialog';

class PerformanceTableRow extends React.Component {
  state = {};

  render() {
    const {
      id,
      entry,
      title,
      school,
      academicLevel,
      competitionLevel,
      danceStyle,
      danceSize
    } = this.props;

    return (
      <TableRow key={id}>
        <TableCell>{entry}</TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>{school}</TableCell>
        <TableCell>{academicLevel}</TableCell>
        <TableCell>{competitionLevel}</TableCell>
        <TableCell>{danceStyle}</TableCell>
        <TableCell>{danceSize}</TableCell>
        <TableCell><PerformanceDialog type="edit" currentValues={this.props} /></TableCell>
      </TableRow>
    );
  }
}

PerformanceTableRow.propTypes = {
  id: PropTypes.number,
  entry: PropTypes.string,
  title: PropTypes.string,
  school: PropTypes.string,
  academicLevel: PropTypes.string,
  competitionLevel: PropTypes.string,
  danceStyle: PropTypes.number,
  danceSize: PropTypes.number
};

PerformanceTableRow.defaultProps = {
  id: 1,
  entry: '',
  title: '',
  school: '',
  academicLevel: '',
  competitionLevel: '',
  danceStyle: 1,
  danceSize: 1
};

export default PerformanceTableRow;
