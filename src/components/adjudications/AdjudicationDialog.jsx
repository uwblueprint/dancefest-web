import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '../interface/Button';
import styles from '../styles';

import DialogReadOnly from '../interface/dialog/DialogReadOnly';
import DialogInput from '../interface/dialog/DialogInput';
import Checkboxlabels from '../interface/CheckBox'

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
      <div style={{ display: 'flex', flexFlow: 'column', margin: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
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
        <hr />
        <DialogReadOnly fullWidth label="Competition Level" />
        <DialogReadOnly fullWidth label="Competition Level" />
        <FormLabel component="legend">Award Considerations</FormLabel>
        <Checkboxlabels row choices={[{ value: 'test', label: 'test' }, { value: 'test', label: 'test' }]} />
      </div>
    );

    const editForm = (
      <div style={{ display: 'flex', flexFlow: 'column', margin: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ flex: '1 0 0' }}>
            <DialogInput defaultValue="hi" label="Artistic" />
          </div>
          <div style={{ flex: '1 0 0' }}>
            <DialogInput label="Technical" />
          </div>
        </div>
        <DialogInput fullWidth multiline label="Notes" />
        <DialogInput fullWidth label="Competition Level" />
      </div>
    );

    return (
      <div>
        <Button classes={{ root: classes.table_editButton }} onClick={this.handleClickOpen}>
          edit
        </Button>
        <Dialog
          fullWidth
          maxWidth="md"
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <div>
            <DialogTitle classes={{ root: classes.dfdialog_title }} disableTypography id="form-dialog-title">
              Edit Performance
              <div style={{ float: 'right', color: 'black' }}>
                <EditIcon onClick={this.handleView} />
                <MoreVertIcon onClick={() => console.log(this.state.view)} />
              </div>
            </DialogTitle>
            { view ? (viewForm) : (editForm)}
            <div className={classes.dfdialog_footer}>
              <DialogActions>
                <Button type="default" onClick={this.handleClose}>
                  Cancel
                </Button>
                <Button type="primary" onClick={this.handleClose}>
                  Save
                </Button>
              </DialogActions>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

AdjudicationDialog.propTypes = {
  currentValues: PropTypes.shape().isRequired,
  classes: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['edit', 'new']).isRequired
};

export default withStyles(styles)(AdjudicationDialog);
