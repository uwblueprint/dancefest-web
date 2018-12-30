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
      currentValues,
      eventId
    } = this.props;
    const {
      danceEntry,
      danceTitle,
      danceStyle,
      competitionLevel,
      academicLevel,
      school,
      size
    } = currentValues;

    return (
      <TableRow style={{}}>
        <TableCell><Link to={`performance/${id}/adjudications`}>{danceTitle}</Link></TableCell>
        <TableCell>{danceEntry}</TableCell>
        <TableCell>{school}</TableCell>
        <TableCell>{academicLevel}</TableCell>
        <TableCell>{competitionLevel}</TableCell>
        <TableCell>{danceStyle}</TableCell>
        <TableCell>{size}</TableCell>
        <TableCell>
          <PerformanceDialog
            currentValues={currentValues}
            eventId={eventId}
            formType="edit"
            performanceId={id} />
        </TableCell>
      </TableRow>
    );
  }
}

PerformanceTableRow.propTypes = {
  currentValues: PropTypes.shape({
    academicLevel: PropTypes.string,
    choreographers: PropTypes.string,
    danceEntry: PropTypes.number,
    danceTitle: PropTypes.string,
    danceStyle: PropTypes.string,
    performers: PropTypes.string,
    school: PropTypes.string,
    size: PropTypes.string
  }),
  eventId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

PerformanceTableRow.defaultProps = {
  currentValues: {}
};

export default PerformanceTableRow;
