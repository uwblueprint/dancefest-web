import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import Button from '../interface/Button'

// import EventDialog from './EventDialog';

class FeedbackTableRow extends React.Component {
  state = {};
  
  onClick = () => {
    console.log(this.props);
    const {setShowForm, school} = this.props;
    setShowForm(true, school);
  }

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
          <Button type='default' onClick={this.onClick}>
            Review Feedback
          </Button>
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
