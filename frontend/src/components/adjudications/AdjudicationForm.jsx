import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';

import batchUpdateData from '../../firebase/utils/batchUpdateData';
import updateData from '../../firebase/utils/updateData';
import { awardConsiderationEnum } from '../../constants';
import { updateAdjudications } from "../../api/AdjudicationAPI";

import DialogInput from '../interface/dialog/DialogInput';
import Button from '../interface/Button';
import CheckBox from '../interface/CheckBox';
import styles from '../styles';

class AdjudicationForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentValues } = props;

    this.state = {
      artisticMark: currentValues.artisticMark,
      choreoAward: currentValues.choreoAward || false,
      specialAward: currentValues.specialAward || false,
      technicalMark: currentValues.technicalMark
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const keys = ['artisticMark', 'technicalMark'];
    this.setState({
      [name]: keys.includes(name) ? parseInt(value, 10) : value
    });
  }

  handleCheckedAward = (e) => {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  }

  handleCancel = () => {
    const { onModalClose, handleView, view } = this.props;
    if (!view) {
      // TODO: ask are you sure?
      handleView();
    } else {
      onModalClose();
    }
  }

  getAwardConsderationEnumAction = (currAwardState, prevAwardState) => {
    const { DECREMENT, INCREMENT, NO_CHANGE } = awardConsiderationEnum;
    if (!isEqual(currAwardState, prevAwardState)) {
      return currAwardState ? INCREMENT : DECREMENT;
    }
    return NO_CHANGE;
  }

  // TODO: handle submmission of the form
  handleSubmit = async () => {
    const {
      adjudicationId,
      collectionName,
      currentValues: {
        audioURL,
        choreoAward: prevChoreoAward,
        judgeName,
        notes,
        specialAward: prevSpecialAward
      }
    } = this.props;
    const {
      artisticMark,
      choreoAward,
      specialAward,
      technicalMark
    } = this.state;
    const cumulativeMark = (parseInt(artisticMark, 10) + parseInt(technicalMark, 10)) / 2;

    const choreoAwardAction = this.getAwardConsderationEnumAction(choreoAward, prevChoreoAward);
    const specialAwardAction = this.getAwardConsderationEnumAction(specialAward, prevSpecialAward);

    const data = {
      cumulativeMark,
      judgeName: judgeName || '',
      notes,
      ...this.state
    };

    if (audioURL) {
      Object.assign(data, audioURL);
    }

    const { NO_CHANGE } = awardConsiderationEnum;

    if (choreoAwardAction !== NO_CHANGE
      || specialAwardAction !== NO_CHANGE) {
      await batchUpdateData(
        collectionName,
        adjudicationId,
        data,
        choreoAwardAction,
        specialAwardAction
      );
    } else {
      await updateAdjudications(
        adjudicationId,
        data,
      );
    }
    this.handleModalClose();
  }

  handleModalClose = () => {
    const { onModalClose } = this.props;
    onModalClose();
  }

  render() {
    const { classes, currentValues: { notes }} = this.props;
    const {
      artisticMark,
      choreoAward,
      specialAward,
      technicalMark
    } = this.state;
    const choices = [
      {
        checked: specialAward,
        label: 'Special Award',
        name: 'specialAward',
        value: 'specialAward'
      },
      {
        checked: choreoAward,
        label: 'Choreography Award',
        name: 'choreoAward',
        value: 'choreoAward'
      }
    ];

    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexFlow: 'column', margin: '25px' }}>
          <div style={{ display: 'flex' }}>
            <div>
              <DialogInput type="number" value={artisticMark} name="artisticMark" label="Artistic" onChange={this.handleChange} />
            </div>
            <div>
              <DialogInput type="number" value={technicalMark} name="technicalMark" label="Technical" onChange={this.handleChange} />
            </div>
          </div>
          <DialogInput fullWidth disabled multiline name="notes" value={notes} label="Notes" />
          <CheckBox label="Award Considerations" choices={choices} onChange={this.handleCheckedAward} />
        </div>
        <div className={classes.dfdialog_footer}>
          <DialogActions>
            <Button type="default" onClick={this.handleCancel}>
              cancel
            </Button>
            <Button type="primary" onClick={this.handleSubmit}>
              save
            </Button>
          </DialogActions>
        </div>
      </React.Fragment>
    );
  }
}

AdjudicationForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  currentValues: PropTypes.shape(),
  handleView: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  view: PropTypes.bool.isRequired
};

AdjudicationForm.defaultProps = {
  currentValues: {}
};

export default withStyles(styles)(AdjudicationForm);
