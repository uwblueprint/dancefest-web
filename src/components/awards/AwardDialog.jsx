import React from 'react';

import DFDialog from '../interface/dialog/DFDialog';
import DialogHeader from '../interface/dialog/DialogHeader';
import DialogInput from '../interface/dialog/DialogInput';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '../interface/Button';

import { withStyles } from "@material-ui/core";
import styles from '../styles';
import award from './award.png';

import omit from 'lodash/omit';
import { createAward } from '../../api/AwardAPI';

class AwardsDialog extends React.Component {
  constructor(props) {
    super(props);

    const { eventId } = this.props;

    this.state = { 
        title: '',
        open: false,
        eventId: eventId
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = () => {
    this.setState({ title: "", open: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async () => {
    const { createData } = this.props;
    const data = omit(this.state, ['open']);
    data.nominee_count = 0;
    const award = await createAward(data);
    
    createData(award.data);
    this.handleClose();
  }

  render() {
    const { eventId, classes: { awardsButtonStyle, award_text }} = this.props;
    const { open, title } = this.state;
    const collectionName = `events/${eventId}/performances`;
    const buttonTitle = 
        <React.Fragment classes={{ root: awardsButtonStyle }}>
            <img src={award} className="award-img" alt="award_png"/>
            NEW AWARD
        </React.Fragment>
    const header = "New Award";

    return (
      <DFDialog
        buttonTitle={buttonTitle}
        onClick={this.handleClickOpen}
        onClose={this.handleClose}
        open={open}>
        <DialogHeader
          collectionName={collectionName}
          title={header} 
        />
        <div style={{margin: "25px"}}>
          <DialogInput
            className={award_text}
            label="Award Name"
            name="title"
            onChange={this.handleChange}
            value={title} 
          />
        </div>
        <div style={{margin: "15px"}}>
        <DialogActions>
          <Button type="default" onClick={this.handleClose}>
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
