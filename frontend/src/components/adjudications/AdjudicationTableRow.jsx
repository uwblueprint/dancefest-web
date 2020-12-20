import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Input from "@material-ui/core/Input";
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import { Link } from 'react-router-dom';
import { getAdjudicationByPerformanceAndJudge } from '../../api/AdjudicationAPI';

class AdjudicationTableRow extends React.Component {
  state = {adjudication: {}, isEditMode: false };
  componentDidMount() {
    getAdjudicationByPerformanceAndJudge(this.props.id, 1) //hradcoded tablet_id
    .then(({data}) => {
      this.setState({ adjudication: data});
    });
  }

  onToggleEditMode = () => {
    if (this.state.isEditMode === true) {
      this.setState({ isEditMode: false});
    } else {
      this.setState({ isEditMode: true});
    }
  };

  onRevert = id => {
    this.onToggleEditMode();
  };

  onChange = (e, data) => {
    const value = e.target.value;
    const name = e.target.name;
    //do something with new values
    //do something with data (the old value of the cell)
  };

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
    const { adjudication, isEditMode } = this.state;
    return (
      <TableRow style={{}}>
        <TableCell>{danceTitle}</TableCell>
        <TableCell>{danceEntry}</TableCell>
        <TableCell>{school}</TableCell>
        <TableCell>{danceStyle}</TableCell>
        <TableCell>{danceSize}</TableCell>
        <TableCell>
        {isEditMode ? (
          <Input
            value={adjudication.artisticMark}
            name={adjudication.artisticMark} //unsure if this is necessary
            onChange={(e) => this.onChange(e, adjudication.artisticMark)}
          />
        ) : (
          adjudication.artisticMark
        )}
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <Input
            value={adjudication.technicalMark}
            name={adjudication.technicalMark} //unsure if this is necessary
            onChange={(e) => this.onChange(e, adjudication.technicalMark)}
          />
        ) : (
          adjudication.technicalMark
        )}
      </TableCell>
        <TableCell>
                {isEditMode ? (
                  <>
                    <IconButton
                      onClick={() => this.onToggleEditMode()}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => this.onRevert(id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    onClick={() => this.onToggleEditMode()}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
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
