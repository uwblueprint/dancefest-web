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
    const { adjudicationId, collectionName, currentValues } = this.props;
    const { open, view } = this.state;
    const {
      artisticMark,
      audioURL,
      choreoAward,
      cumulativeMark,
      notes,
      specialAward,
      tabletID,
      technicalMark
    } = currentValues;
  
    const viewForm = (
      <React.Fragment>
        <div style={{ display: 'flex', flexFlow: 'column', margin: '35px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', borderBottom: '1px solid #dcdcdc' }}>
            <div style={{ flex: '1 0 0' }}>
              <DialogReadOnly defaultValue="hi" label="Dance Entry" />
              <DialogReadOnly defaultValue="hi" label="Dance Title" />
              <DialogReadOnly defaultValue="hi" label="Performers" />
              <DialogReadOnly defaultValue="hi" label="Choreographer" />
            </div>

            <div style={{ flex: '1 0 0' }}>
              <div style={{ display: 'flex' }}>
                <DialogReadOnly label="School" />
                <DialogReadOnly label="Level" />
              </div>
              <DialogReadOnly label="Competition Level" />
              <DialogReadOnly label="Dance Style" helperText="  " />
              <DialogReadOnly label="Size" />
            </div>
          </div>
          <DialogReadOnly fullWidth label="Notes" defaultValue={notes} />
          {audioURL && <AudioPlay audioURL={audioURL}/>}
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
          <Score type="subtotal" score={artisticMark} scoreName="Artistic" />
          <Score type="subtotal" score={technicalMark} scoreName="Technical" />
          <Score type="total" score={cumulativeMark} scoreName="Score" />
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
          title={tabletID || ''} />
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
    specialAward: PropTypes.bool,
    tabletID: PropTypes.number,
    technicalMark: PropTypes.number
  }).isRequired
};

export default withStyles(styles)(AdjudicationDialog);
