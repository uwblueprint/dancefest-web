import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';

import updateData from '../../firebase/utils/updateData';

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
    this.setState({ [name]: value });
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

  // TODO: handle submmission of the form
  handleSubmit = async () => {
    const { adjudicationId, collectionName } = this.props;
    const { artisticMark, technicalMark } = this.state;
    const cumulativeMark = (artisticMark + technicalMark) / 2;
    const data = {
      cumulativeMark,
      ...this.state
    };
    await updateData(
      collectionName,
      adjudicationId,
      data
    );
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
      { checked: specialAward, value: 'specialAward', label: 'Special Award' },
      { checked: choreoAward, value: 'choreoAward', label: 'Choreography Award' }
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
