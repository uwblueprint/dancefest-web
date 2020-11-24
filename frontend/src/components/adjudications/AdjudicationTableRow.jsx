import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

class AdjudicationTableRow extends React.Component {
  state = {};

  render() {
    const history = useHistory()
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
          <Button variant="outlined" color="primary" onClick={   
            history.push({
              pathname:  `/performance/${id}`,
              state: {
                response: messageFromServer 
              } 
            })}>
            {/* <Link to={`adjudications/performance/${id}`}>Adjudicate</Link> */}
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
