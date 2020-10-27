import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

//import AdjudicationDialog from './AdjudicationDialog';
import PerformanceDialog from '../performances/PerformanceDialog'; //change when the adjudications dialog is done

class AdjudicationTableRow extends React.Component {
  state = {};

  render() {
    const {
      currentValues,
      eventId,
      id
    } = this.props;
    const {
      academicLevel,
      competitionLevel,
      danceEntry,
      danceSize,
      danceStyle,
      danceTitle,
      school
    } = currentValues;

    return (
      <TableRow style={{}}>
        <TableCell><Link to={`performance/${id}/adjudications`}>{danceTitle}</Link></TableCell>
        <TableCell>{danceEntry}</TableCell>
        <TableCell>{school}</TableCell>
        <TableCell>{academicLevel}</TableCell>
        <TableCell>{competitionLevel}</TableCell>
        <TableCell>{danceStyle}</TableCell>
        <TableCell>{danceSize}</TableCell>
        <TableCell>
          <PerformanceDialog //will change when dialog done
            currentValues={currentValues}
            eventId={eventId}
            formType="edit"
            performanceId={id} />
        </TableCell>
      </TableRow>
    );
  }
}

AdjudicationTableRow.propTypes = {
  currentValues: PropTypes.shape({
    academicLevel: PropTypes.string,
    choreographers: PropTypes.string,
    danceEntry: PropTypes.number,
    danceSize: PropTypes.string,
    danceStyle: PropTypes.string,
    danceTitle: PropTypes.string,
    performers: PropTypes.string,
    school: PropTypes.string
  }),
  eventId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

AdjudicationTableRow.defaultProps = {
  currentValues: {}
};

export default AdjudicationTableRow;
