import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { getAdjudicationByPerformanceAndJudge } from '../../api/AdjudicationAPI';

class AdjudicationTableRow extends React.Component {
  state = {adjudication: {}};
  componentDidMount() {
    getAdjudicationByPerformanceAndJudge(this.props.id, 1) //hradcoded tablet_id
    .then(({data}) => {
      console.log("data is:")
      console.log(data)
      this.setState({ adjudication: data});
    });
  }

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
    const { adjudication } = this.state;
    return (
      <TableRow style={{}}>
        <TableCell>{danceTitle}</TableCell>
        <TableCell>{danceEntry}</TableCell>
        <TableCell>{school}</TableCell>
        <TableCell>{danceStyle}</TableCell>
        <TableCell>{danceSize}</TableCell>
        <TableCell>{adjudication.artisticMark}</TableCell>
        <TableCell>{adjudication.technicalMark}</TableCell>
        <TableCell>
          <Button variant="outlined" color="primary">
            <Link to={`performance/${id}`}>Adjudicate</Link>
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

AdjudicationTableRow.propTypes = {
  history: PropTypes.shape().isRequired,
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
