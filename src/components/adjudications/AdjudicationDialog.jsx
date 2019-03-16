import React from 'react';
import PropTypes from 'prop-types';
import LensIcon from '@material-ui/icons/Lens';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import FormHelperText from '@material-ui/core/FormHelperText';
import DFDialog from '../interface/dialog/DFDialog';
import styles from '../styles';

import AudioPlay from '../interface/AudioPlay';
import DialogReadOnly from '../interface/dialog/DialogReadOnly';
import DialogHeader from '../interface/dialog/DialogHeader';
import AdjudicationForm from './AdjudicationForm';
import Score from '../interface/dialog/Score';

class AdjudicationDialog extends React.Component {
  state = { open: false, view: true };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, view: true });
  };

  handleView = () => {
    this.setState(prevState => ({
      view: !prevState.view
    }));
  }

  render() {
    const {
      adjudicationId,
      collectionName,
      currentValues,
      performanceValues
    } = this.props;
    const { open, view } = this.state;
    const {
      artisticMark,
      audioURL,
      choreoAward,
      cumulativeMark,
      judgeName,
      notes,
      specialAward,
      technicalMark
    } = currentValues;
    const {
      academicLevel,
      choreographers,
      competitionLevel,
      danceEntry,
      danceStyle,
      danceTitle,
      performers,
      school,
      size
    } = performanceValues;

    const getDisplayValues = (value) => value || "N/A";

    const viewForm = (
      <React.Fragment>
        <div style={{ display: 'flex', flexFlow: 'column', margin: '35px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', borderBottom: '1px solid #dcdcdc' }}>
            <div style={{ flex: '1 0 0' }}>
              <DialogReadOnly value={getDisplayValues(danceEntry)} label="Dance Entry" />
              <DialogReadOnly value={getDisplayValues(danceTitle)} label="Dance Title" />
              <DialogReadOnly value={getDisplayValues(performers)} label="Performers" />
              <DialogReadOnly value={getDisplayValues(choreographers)} label="Choreographer" />
            </div>

            <div style={{ flex: '1 0 0' }}>
              <div style={{ display: 'flex' }}>
                <DialogReadOnly value={getDisplayValues(school)} label="School" />
                <DialogReadOnly value={getDisplayValues(academicLevel)} label="Level" />
              </div>
              <DialogReadOnly value={getDisplayValues(competitionLevel)} label="Competition Level" />
              <DialogReadOnly value={getDisplayValues(danceStyle)} label="Dance Style" helperText="  " />
              <DialogReadOnly value={getDisplayValues(size)} label="Size" />
            </div>
          </div>
          <DialogReadOnly fullWidth label="Notes" value={notes} />
          {audioURL && <AudioPlay audioURL={audioURL} />}
          <FormHelperText>Award Considerations</FormHelperText>
          {specialAward && (
            <div>
              <LensIcon fontSize="inherit" color="primary" />
              Special Award
            </div>
          )}
          {choreoAward && (
            <div>
              <LensIcon fontSize="inherit" color="inherit" style={{ color: 'purple' }} />
              Choreography Award
            </div>
          )}
        </div>
        <DialogActions style={{
          display: 'flex',
          height: '75px',
          padding: '0',
          margin: '0'
        }}>
          <Score type="subtotal" score={artisticMark ? artisticMark : "N/A"} scoreName="Artistic" />
          <Score type="subtotal" score={technicalMark ? technicalMark : "N/A"} scoreName="Technical" />
          <Score type="total" score={cumulativeMark ? cumulativeMark : "N/A"} scoreName="Score" />
        </DialogActions>
      </React.Fragment>
    );

    const editForm = (
      <AdjudicationForm
        adjudicationId={adjudicationId}
        collectionName={collectionName}
        currentValues={currentValues}
        handleView={this.handleView}
        onModalClose={this.handleClose}
        view={view} />
    );

    return (
      <DFDialog open={open} formType="edit" buttonTitle="edit" onClick={this.handleClickOpen} onClose={this.handleClose}>
        <DialogHeader
          collectionName={collectionName}
          docId={adjudicationId}
          edit={view}
          onEditClick={this.handleView}
          shouldShowDropdown
          title={judgeName || ''} />
        {view ? (viewForm) : (editForm)}
      </DFDialog>
    );
  }
}

AdjudicationDialog.propTypes = {
  adjudicationId: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  currentValues: PropTypes.shape({
    artisticMark: PropTypes.number,
    audioURL: PropTypes.string,
    choreoAward: PropTypes.bool,
    cumulativeMark: PropTypes.number,
    notes: PropTypes.string,
    judgeName: PropTypes.string,
    specialAward: PropTypes.bool,
    technicalMark: PropTypes.number
  }).isRequired,
  performanceValues: PropTypes.shape({
    academicLevel: PropTypes.string,
    choreographers: PropTypes.string,
    competitionLevel: PropTypes.string,
    danceEntry: PropTypes.string,
    danceStyle: PropTypes.string,
    danceTitle: PropTypes.string,
    performers: PropTypes.string,
    school: PropTypes.string,
    size: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(AdjudicationDialog);
