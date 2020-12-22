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
import { updateAdjudications, getAdjudicationByPerformanceAndJudge } from '../../api/AdjudicationAPI';

class AdjudicationTableRow extends React.Component {
  state = {adjudication: {}, isEditMode: false, technicalMark: {}, artisticMark: {} };

  componentDidMount() {
    getAdjudicationByPerformanceAndJudge(this.props.id, 1) //hradcoded tablet_id
    .then(({data}) => {
      this.setState({ adjudication: data, technicalMark: data.technicalMark, artisticMark: data.artisticMark});
    });
  };

  onToggleEditMode = () => {
    const { isEditMode } = this.state;
    this.setState({ isEditMode: !isEditMode })
  };

  onRevert = () => {
    const { adjudication } = this.state;
    this.setState({technicalMark: adjudication.technicalMark, artisticMark: adjudication.artisticMark})
    this.onToggleEditMode();
  };

  submitQuickEdit = async () => {
    const {
      adjudication,
      artisticMark,
      technicalMark
    } = this.state;
    const cumulativeMark = (parseInt(artisticMark, 10) + parseInt(technicalMark, 10)) / 2;
    
    const data = { 
      performanceId: adjudication.performanceId,
      artisticMark,
      technicalMark,
      cumulativeMark,
      notes: adjudication.notes,
      tablet_id: adjudication.tablet_id,
      audio_url: adjudication.audio_url
    };

    const updatedAdjudication = await updateAdjudications(adjudication.id, data);

    this.onToggleEditMode();
  };

  onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    //do something with new values
    if ( name === "artisticMark") {
      this.setState({ artisticMark: value});
    } else {
      this.setState({ technicalMark: value});
    }
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
    const { adjudication, technicalMark, artisticMark, isEditMode } = this.state;
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
            defaultValue={parseInt(artisticMark)}
            name="artisticMark" //unsure if this is necessary
            onChange={(e) => this.onChange(e)}
          />
        ) : (
          parseInt(artisticMark)
        )}
      </TableCell>
      <TableCell>
        {isEditMode ? (
          <Input
            defaultValue={parseInt(technicalMark)}
            name="technicalMark" //unsure if this is necessary
            onChange={(e) => this.onChange(e)}
          />
        ) : (
          parseInt(technicalMark)
        )}
      </TableCell>
        <TableCell>
          { adjudication.artisticMark && adjudication.technicalMark ? (
                isEditMode ? ( 
                  <div style={{ display: 'flex'}}>
                  <div style={{ flex: '50%'}}>
                    <IconButton
                      onClick={() => this.submitQuickEdit()}
                    >
                      <DoneIcon />
                    </IconButton>
                  </div>
                  <div style={{ flex: '50%'}}>
                    <IconButton
                      onClick={() => this.onRevert()}
                    >
                      <RevertIcon />
                    </IconButton>
                  </div>
                  </div>
                ) : (
                  <IconButton
                    onClick={() => this.onToggleEditMode()}
                  >
                    <EditIcon />
                  </IconButton>
                ) ) : ("N/A") }
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
