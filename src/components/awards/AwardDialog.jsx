import React from 'react';

import { dialogType } from '../../constants';
import DFDialog from '../interface/dialog/DFDialog';
import DialogHeader from '../interface/dialog/DialogHeader';
import DialogInput from '../interface/dialog/DialogInput';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '../interface/Button';

import { withStyles } from "@material-ui/core";
import styles from '../styles';
import award from './award.png';

class AwardsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        awardname: '',
        open: false
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {

  }

  handleCancel = (e) => {

  }

  render() {
    const { eventId, classes: { awardsButtonStyle, award_text }} = this.props;
    const { open, awardname } = this.state;
    const collectionName = `events/${eventId}/performances`;
    const buttonTitle = 
        <React.Fragment classes={{ root: awardsButtonStyle }}>
            <img src={award} className="award-img" alt="award_png"/>
            NEW AWARD
        </React.Fragment>
    const title = "New Award";

    return (
      <DFDialog
        buttonTitle={buttonTitle}
        onClick={this.handleClickOpen}
        onClose={this.handleClose}
        open={open}>
        <DialogHeader
          collectionName={collectionName}
          title={title} 
        />
        <div style={{margin: "25px"}}>
          <DialogInput
            className={award_text}
            label="Award Name"
            name="awardname"
            onChange={this.handleChange}
            value={awardname} 
          />
        </div>
        <div style={{margin: "15px"}}>
        <DialogActions>
          <Button type="default" onClick={this.handleCancel}>
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} style={{color: "#fff", backgroundColor: "grey"}}>
            Save
          </Button>
        </DialogActions>
        </div>
      </DFDialog>
    );
  }
}

AwardsDialog.defaultProps = {
  collectionName: '',
  currentValues: {},
};

export default withStyles(styles)(AwardsDialog);
