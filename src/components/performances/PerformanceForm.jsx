import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';

import updateData from '../../firebase/utils/updateData';
import addData from '../../firebase/utils/addData';
import DialogInput from '../interface/dialog/DialogInput';
import DialogSelect from '../interface/dialog/DialogSelect';
import Button from '../interface/Button';
import styles from '../styles';

class PerformanceForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentValues } = props;

    this.state = {
      academicLevel: currentValues.academicLevel || '',
      choreographers: currentValues.choreographers || '',
      competitionLevel: currentValues.competitionLevel || '',
      danceEntry: currentValues.danceEntry,
      danceTitle: currentValues.danceTitle || '',
      danceStyle: currentValues.danceStyle || '',
      disabled: false,
      performers: currentValues.performers || '',
      school: currentValues.school || '',
      size: currentValues.size || ''
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleCancel = () => {
    // TODO: ask are you sure?
    const { onModalClose } = this.props;
    onModalClose();
  }

  handleModalClose = () => {
    const { onModalClose } = this.props;
    onModalClose();
  }

  handleSubmit = async () => {
    const { collectionName, performanceId, formType } = this.props;
    const data = omit(this.state, 'disabled');
    if (formType === 'new') {
      await addData(collectionName, data);
    } else {
      await updateData(collectionName, performanceId, data);
    }
    this.handleModalClose();
  }

  render() {
    const { classes, formType } = this.props;
    const {
      danceEntry,
      danceTitle,
      performers,
      danceStyle,
      competitionLevel,
      choreographers,
      academicLevel,
      school,
      size
    } = this.state;
    return (
      <React.Fragment>
        <div style={{ padding: '25px 25px 0' }}>
          <div className={classes.flex}>
            <DialogInput className={classes.flex_default} type="number" name="danceEntry" label="Dance Entry" value={danceEntry} onChange={this.handleChange} />
            <div className={classes.flex_default}>
              <DialogSelect fullWidth label="School" name="school" value={school} />
              <DialogSelect fullWidth label="Level" name="academicLevel" value={academicLevel} />
            </div>
          </div>
          <div className={classes.flex}>
            <DialogInput className={classes.flex_default} name="danceTitle" label="Dance Title" value={danceTitle} onChange={this.handleChange} />
            <DialogSelect className={classes.flex_default} name="competitionLevel" label="Competition Level" value={competitionLevel} />
          </div>
          <div className={classes.flex}>
            <DialogInput className={classes.flex_default} name="performers" label="Performers" helperText="Comma separated, eg. John Smith, Jane Doe" value={performers} onChange={this.handleChange} />
            <DialogSelect className={classes.flex_default} name="danceStyle" label="Dance Style" value={danceStyle} />
          </div>
          <div className={classes.flex}>
            <DialogInput className={classes.flex_default} name="choreographers" label="Choreographers" helperText="Comma separated, eg. John Smith, Jane Doe" value={choreographers} onChange={this.handleChange} />
            <DialogSelect className={classes.flex_default} name="size" label="Size" value={size} />
          </div>
        </div>
        <div className={classes.dfdialog_footer}>
          <DialogActions>
            <Button type="default" onClick={this.handleCancel}>
              {formType === 'edit' ? 'cancel' : 'discard'}
            </Button>
            <Button disabled={false} type="primary" onClick={this.handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </div>
      </React.Fragment>
    );
  }
}

PerformanceForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  currentValues: PropTypes.shape({
    academicLevel: PropTypes.string,
    choreographers: PropTypes.string,
    danceEntry: PropTypes.number,
    danceTitle: PropTypes.string,
    danceStyle: PropTypes.string,
    performers: PropTypes.string,
    school: PropTypes.string,
    size: PropTypes.string
  }),
  formType: PropTypes.oneOf(['edit', 'new']),
  onModalClose: PropTypes.func.isRequired
};

PerformanceForm.defaultProps = {
  currentValues: {},
  formType: 'edit'
};

export default withStyles(styles)(PerformanceForm);
