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
import AdjudicationForm from './PerformanceAdjudicationForm';
import Score from '../interface/dialog/Score';

class PerformanceAdjudicationDialog extends React.Component {
  state = { open: false, view: true };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (data) => {
    const { updateData } = this.props;
    this.setState({ open: false, view: true }, () => updateData(data));
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
      performanceValues,
      updateData,
    } = this.props;
    const { open, view } = this.state;
    const {
      artisticMark,
      audioUrl,
      choreoAward,
      cumulativeMark,
      notes,
      specialAward,
      tabletId,
      technicalMark
    } = currentValues;
    const {
      academicLevel,
      choreographers,
      competitionLevel,
      danceEntry,
      danceStyle,
      danceSize,
      danceTitle,
      performers,
      school
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
              <DialogReadOnly value={getDisplayValues(danceSize)} label="Dance Size" />
            </div>
          </div>
          <DialogReadOnly fullWidth label="Notes" value={notes} />
          {audioUrl && <AudioPlay audioURL={audioUrl} />}
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
          <Score type="subtotal" score={getDisplayValues(artisticMark)} scoreName="Artistic" />
          <Score type="subtotal" score={getDisplayValues(technicalMark)} scoreName="Technical" />
          <Score type="total" score={getDisplayValues(cumulativeMark)} scoreName="Score" />
        </DialogActions>
      </React.Fragment>
    );

    const editForm = (
      <AdjudicationForm
        updateData={updateData}
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
          title={tabletId || 'N/A'} />
        {view ? (viewForm) : (editForm)}
      </DFDialog>
    );
  }
}

PerformanceAdjudicationDialog.propTypes = {
  adjudicationId: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  currentValues: PropTypes.shape({
    artisticMark: PropTypes.number,
    audioUrl: PropTypes.string,
    choreoAward: PropTypes.bool,
    cumulativeMark: PropTypes.number,
    notes: PropTypes.string,
    specialAward: PropTypes.bool,
    tabletId: PropTypes.number,
    technicalMark: PropTypes.number
  }).isRequired,
  performanceValues: PropTypes.shape({
    academicLevel: PropTypes.string,
    choreographers: PropTypes.string,
    competitionLevel: PropTypes.string,
    danceEntry: PropTypes.string,
    danceSize: PropTypes.string,
    danceStyle: PropTypes.string,
    danceTitle: PropTypes.string,
    performers: PropTypes.string,
    school: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(PerformanceAdjudicationDialog);
