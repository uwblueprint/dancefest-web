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
  state = {
    open: false,
    view: true,
    artistic: '',
    technicalMark: '',
    cumulativeMark: '',
    notes: '',
    audio: '',
    awardsConsideration: null
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

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
    const { currentValues } = this.props;
    console.log(currentValues, ' hi');
    const {
      open,
      view,
      artistic,
      technicalMark,
      cumulativeMark,
      specialAward,
      judgeName,
      choreoAward,
      notes,
      audio
    } = this.state;

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
          <DialogReadOnly fullWidth label="Notes" />
          <AudioPlay fileName="file_test.mp3" time={34} />
          <FormHelperText>Award Considerations</FormHelperText>
          <div>
            <LensIcon fontSize="inherit" color="inherit" style={{ color: 'purple' }} />
            Special Award
          </div>
          <div>
            <LensIcon fontSize="inherit" color="primary" />
            Choreography Award
          </div>
        </div>
        <DialogActions style={{
          display: 'flex',
          height: '75px',
          padding: '0',
          margin: '0'
        }}>
          <Score type="subtotal" score={artistic} scoreName="artisticMark" />
          <Score type="subtotal" score={technicalMark} scoreName="technicalMark" />
          <Score type="total" score={cumulativeMark} scoreName="cumulativeMark" />
        </DialogActions>
      </React.Fragment>
    );

    const editForm = (
      <AdjudicationForm
        view={view}
        defaultValues={[]}
        onModalClose={this.handleClose}
        handleView={this.handleView} />
    );

    return (
      <DFDialog open={open} formType="edit" buttonTitle="edit" onClick={this.handleClickOpen} onClose={this.handleClose}>
        <DialogHeader
          edit={view}
          title={currentValues.judge}
          onEditClick={this.handleView}
          onMoreClick={() => { }} />
        {view ? (viewForm) : (editForm)}
      </DFDialog>
    );
  }
}

AdjudicationDialog.propTypes = {
  currentValues: PropTypes.shape().isRequired
};

export default withStyles(styles)(AdjudicationDialog);
