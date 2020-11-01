import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import AdjudicationForm from './AdjudicationForm';
import AdjudicationDialog from './AdjudicationDialog';
//import PerformanceAdjudicationDialog from './AdjudicationDialog'; //change when the adjudications dialog is done

class AdjudicationTableRow extends React.Component {
  state = {};

  render() {
    const {
      currentValues,
      collectionName,
      eventId,
      performanceValues,
      updateData,
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
        <TableCell>{danceStyle}</TableCell>
        <TableCell>{danceSize}</TableCell>
        <TableCell>
          <AdjudicationDialog
            updateData={updateData}
            adjudicationId={id}
            collectionName={collectionName}
            currentValues={currentValues}
            performanceValues={performanceValues} />
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
