import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import EventDialog from './EventDialog';

class EventTableRow extends React.Component {
  state = {};

  render() {
    const {
      id,
      name,
      date,
      numDancers,
      numPerformances,
      numJudges
    } = this.props;

    const defaultValues = {
      eventTitle: name,
      eventDate: date,
      numJudges
    };

    return (
      <TableRow key={id}>
        <TableCell>
          {name}
        </TableCell>
        <TableCell>
          {date}
        </TableCell>
        <TableCell>
          {numDancers}
        </TableCell>
        <TableCell>
          {numPerformances}
        </TableCell>
        <TableCell>
          {numJudges}
        </TableCell>
        <TableCell>
          <EventDialog type="edit" defaultValues={defaultValues} />
        </TableCell>
      </TableRow>
    );
  }
}

EventTableRow.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  date: PropTypes.string,
  numDancers: PropTypes.number,
  numPerformances: PropTypes.number,
  numJudges: PropTypes.number
};


EventTableRow.defaultProps = {
  id: 1,
  name: '',
  date: '',
  numDancers: 1,
  numPerformances: 1,
  numJudges: 1
};

export default EventTableRow;
