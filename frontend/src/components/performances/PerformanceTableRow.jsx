import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import { surfaceScores } from '../../api/AdjudicationAPI';
import PerformanceDialog from './PerformanceDialog';
import { Tab } from '@material-ui/core';

class PerformanceTableRow extends React.Component {
  state = {artisticMark: 0, technicalMark: 0, cumulativeMark: 0};
  componentDidMount() {
    surfaceScores(this.props.id) 
    .then(({data}) => {
      this.setState({artisticMark: data["artisticMark"], technicalMark: data['technicalMark'], cumulativeMark: data["cumulativeMark"]});
    }); 
  }

  render() {
    const {
      updateData,
      createData,
      currentValues,
      eventId,
      id,
    } = this.props;
    const {
      artisticMark, 
      technicalMark,
      cumulativeMark,
    } = this.state;
    const {
      academicLevel,
      competitionLevel,
      danceEntry,
      danceSize,
      danceStyle,
      danceTitle,
      schoolName,
    } = currentValues;

    return (
      <TableRow style={{}}>
        <TableCell><Link to={`performance/${id}/adjudications`}>{danceTitle}</Link></TableCell>
        <TableCell>{danceEntry}</TableCell>
        <TableCell>{schoolName}</TableCell>
        <TableCell>{academicLevel}</TableCell>
        <TableCell>{competitionLevel}</TableCell>
        <TableCell>{danceStyle}</TableCell>
        <TableCell>{danceSize}</TableCell>
        <TableCell>{artisticMark}</TableCell>
        <TableCell>{technicalMark}</TableCell>
        <TableCell>{cumulativeMark}</TableCell>
        <TableCell>
          <PerformanceDialog
            updateData={updateData}
            createData={createData}
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
    danceSize: PropTypes.string,
    danceStyle: PropTypes.string,
    danceTitle: PropTypes.string,
    performers: PropTypes.string,
    schoolId: PropTypes.string,
    artisticMark: PropTypes.number,
  }),
  eventId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

PerformanceTableRow.defaultProps = {
  currentValues: {}
};

  

export default PerformanceTableRow;
