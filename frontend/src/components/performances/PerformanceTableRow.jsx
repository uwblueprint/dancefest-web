import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import { test2 } from '../../api/AdjudicationAPI';
import PerformanceDialog from './PerformanceDialog';

class PerformanceTableRow extends React.Component {
  state = {};
  componentDidMount() {
    test2(this.props.id) 
    .then(({data}) => {
      console.log(data)
    }); 
  }

  render() {
    const {
      updateData,
      createData,
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
  }),
  eventId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

PerformanceTableRow.defaultProps = {
  currentValues: {}
};

export default PerformanceTableRow;
