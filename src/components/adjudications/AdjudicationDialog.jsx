import React from 'react';
import PropTypes from 'prop-types';
import LensIcon from '@material-ui/icons/Lens';
import { withStyles } from '@material-ui/core/styles';
import DFDialog from '../interface/dialog/DFDialog';
import DialogActions from '@material-ui/core/DialogActions';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '../interface/Button';
import styles from '../styles';

import DialogReadOnly from '../interface/dialog/DialogReadOnly';
import DialogHeader from '../interface/dialog/DialogHeader';
import DialogInput from '../interface/dialog/DialogInput';
import Score from '../interface/dialog/Score';
import Checkboxlabels from '../interface/CheckBox';

class AdjudicationDialog extends React.Component {
  state = {
    open: false,
    view: true
  };

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
    const { currentValues, type, classes } = this.props;
    const { open, view } = this.state;

    const viewForm = (
      <React.Fragment>
        <div style={{ display: 'flex', flexFlow: 'column', margin: '25px' }}>
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
        <DialogActions style={{ display: 'flex', height: '75px', padding: '0', margin: '0' }}>
          <Score type="subtotal" score={34} scoreName="artistic" />
          <Score type="subtotal" score={34} scoreName="technical" />
          <Score type="total" score={34} scoreName="score" />
        </DialogActions>
      </React.Fragment>
    );

    const editForm = (
      <React.Fragment>
        <div style={{ display: 'flex', flexFlow: 'column', margin: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ flex: '1 0 0' }}>
              <DialogInput value="" defaultValue="hi" name="Artistic" label="Artistic" />
            </div>
            <div style={{ flex: '1 0 0' }}>
              <DialogInput value="" name="Technical" label="Technical" />
            </div>
          </div>
          <DialogInput fullWidth multiline name="Notes" value="" label="Notes" />
          <Checkboxlabels label="Award Considerations" choices={[{ value: 'specialAward', label: 'Special Award' }, { value: 'choreoAward', label: 'Choreography Award' }]} />
        </div>
        <div className={classes.dfdialog_footer}>
          <DialogActions>
            <Button type="default" onClick={this.handleView}>
              Cancel
            </Button>
            <Button type="primary" onClick={this.handleClose}>
              Save
            </Button>
          </DialogActions>
        </div>
      </React.Fragment>
    );

    return (
      <DFDialog open={open} buttonTitle="edit" onClick={this.handleClickOpen} onClose={this.handleClose}>
        <DialogHeader edit={view} title={currentValues.judge} onEditClick={this.handleView} onMoreClick={() => {}} />
        { view ? (viewForm) : (editForm)}
      </DFDialog>
    );
  }
}

AdjudicationDialog.propTypes = {
  currentValues: PropTypes.shape().isRequired,
  classes: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['edit', 'new']).isRequired
};

export default withStyles(styles)(AdjudicationDialog);
