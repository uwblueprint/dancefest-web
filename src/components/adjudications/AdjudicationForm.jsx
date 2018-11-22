import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';

import DialogInput from '../interface/dialog/DialogInput';
import Button from '../interface/Button';
import Checkboxlabels from '../interface/CheckBox';
import styles from '../styles';

class AdjudicationForm extends React.Component {
  constructor(props) {
    super(props);
    const { defaultValues } = props;

    this.state = {
      artistic: defaultValues.artistic || '',
      technical: defaultValues.technical || '',
      audio: null,
      specialAward: false,
      choreoAward: false,
      notes: defaultValues.notes || '',
      disabled: true
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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

  // TODO: create validation form method
  validateData = () => {
    const validate = false;

    // TODO: different validation cases depending on adding new vs editing
    this.setState({ disabled: validate });
  }

  handleCheckedAward = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  // TODO: handle submmission of the form
  handleSubmit = () => {
    const {
      artistic,
      technical,
      audio,
      awards,
      notes
    } = this.state;

    const item = {
      artistic,
      technical,
      audio,
      awards,
      notes
    }
  }

  handleModalClose = () => {
    const { onModalClose } = this.props;
    onModalClose();
  }

  render() {
    const { classes } = this.props;
    const choices = [{ value: 'specialAward', label: 'Special Award' }, { value: 'choreoAward', label: 'Choreography Award' }];
    const {
      artisticMark,
      technicalMark,
      audio,
      specialAward,
      choreoAward,
      notes,
      cumulativeMark,
      disabled,
    } = this.state;
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
          <DialogInput fullWidth multiline name="notes" value={notes} label="Notes" onChange={this.handleChange} />
          <Checkboxlabels label="Award Considerations" choices={choices} onChange={this.handleCheckedAward} />
        </div>
        <div className={classes.dfdialog_footer}>
          <DialogActions>
            <Button type="default" onClick={this.handleCancel}>
              cancel
            </Button>
            <Button disabled={disabled} type="primary" onClick={this.handleSubmit}>
              save
            </Button>
          </DialogActions>
        </div>
      </React.Fragment>
    );
  }
}

AdjudicationForm.propTypes = {
  classes: PropTypes.string.isRequired,
  defaultValues: PropTypes.shape(),
  handleView: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  view: PropTypes.bool.isRequired
};

AdjudicationForm.defaultProps = {
  defaultValues: []
};

export default withStyles(styles)(AdjudicationForm);
