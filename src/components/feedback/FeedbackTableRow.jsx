import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

// import EventDialog from './EventDialog';

class FeedbackTableRow extends React.Component {
  state = {};

  render() {
    const {
      school,
      performances,
      setShowForm
    } = this.props;

    return (
      <TableRow>
        <TableCell>
          {school}
        </TableCell>
        <TableCell>
          <ul>
          {performances.map(performance => performance.danceTitle).map((dance)=>{
              return (
                  <li>{dance}</li>
              );
              }
            )
          }
          </ul>
        </TableCell>
        <TableCell>
          <EventDialog formType="edit" eventId={id} currentValues={currentValues} />
        </TableCell>
      </TableRow>
    );
  }
}

FeedbackTableRow.propTypes = {
  currentValues: PropTypes.shape({
    eventTitle: PropTypes.string,
    eventDate: PropTypes.string,
    numJudges: PropTypes.number
  }),
  id: PropTypes.string
};

FeedbackTableRow.defaultProps = {
  currentValues: {},
  id: null
};

export default FeedbackTableRow;
