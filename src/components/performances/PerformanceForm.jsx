import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';

import db from '../../firebase/firebase';
import addData from '../../firebase/utils/addData';
import updateData from '../../firebase/utils/updateData';
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
      danceStyle: currentValues.danceStyle || '',
      danceTitle: currentValues.danceTitle || '',
      disabled: false,
      options: {},
      performers: currentValues.performers || '',
      school: currentValues.school || '',
      size: currentValues.size || 0
    };
  }

  componentDidMount() {
    this.subscribe = db.collection('settings').onSnapshot((querySnapshot) => {
      const options = {};
      querySnapshot.forEach((doc) => {
        options[doc.id] = Object.keys(doc.data());
      });
      this.setState({ options });
    });
  }

  componentWillUnmount() {
    this.subscribe();
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
    const { collectionName, formType, performanceId } = this.props;
    const data = omit(this.state, ['disabled', 'options']);
    if (formType === 'new') {
      await addData(collectionName, data);
    } else {
      await updateData(collectionName, performanceId, data);
    }
    this.handleModalClose();
  }

  renderOptions = option => (option ? option.map(o => ({ value: o })) : []);

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
      size,
      options
    } = this.state;
    return (
      <React.Fragment>
        <div style={{ padding: '25px 25px 0' }}>
          <div className={classes.flex}>
            <DialogInput
              className={classes.flex_default}
              label="Dance Entry"
              name="danceEntry"
              onChange={this.handleChange}
              type="number"
              value={danceEntry} />
            <div className={classes.flex_default}>
              <DialogSelect
                fullWidth
                label="School"
                name="school"
                onChange={this.handleChange}
                options={this.renderOptions(options.school)}
                value={school} />
              <DialogSelect
                fullWidth
                label="Level"
                name="academicLevel"
                onChange={this.handleChange}
                options={this.renderOptions(options.academicLevel)}
                value={academicLevel} />
            </div>
          </div>
          <div className={classes.flex}>
            <DialogInput
              className={classes.flex_default}
              label="Dance Title"
              name="danceTitle"
              onChange={this.handleChange}
              value={danceTitle} />
            <DialogSelect
              className={classes.flex_default}
              label="Competition Level"
              name="competitionLevel"
              onChange={this.handleChange}
              options={this.renderOptions(options.competitionLevel)}
              value={competitionLevel} />
          </div>
          <div className={classes.flex}>
            <DialogInput
              className={classes.flex_default}
              helperText="Comma separated, eg. John Smith, Jane Doe"
              label="Performers"
              name="performers"
              onChange={this.handleChange}
              value={performers} />
            <DialogSelect
              className={classes.flex_default}
              label="Dance Style"
              name="danceStyle"
              onChange={this.handleChange}
              options={this.renderOptions(options.danceStyle)}
              value={danceStyle} />
          </div>
          <div className={classes.flex}>
            <DialogInput
              className={classes.flex_default}
              helperText="Comma separated, eg. John Smith, Jane Doe"
              label="Choreographers"
              name="choreographers"
              onChange={this.handleChange}
              value={choreographers} />
            <DialogSelect
              className={classes.flex_default}
              label="Size"
              name="size"
              onChange={this.handleChange}
              options={this.renderOptions(options.danceSize)}
              value={size} />
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
    danceStyle: PropTypes.string,
    danceTitle: PropTypes.string,
    performers: PropTypes.string,
    school: PropTypes.string,
    size: PropTypes.number
  }),
  formType: PropTypes.oneOf(['edit', 'new']),
  onModalClose: PropTypes.func.isRequired
};

PerformanceForm.defaultProps = {
  currentValues: {},
  formType: 'edit'
};

export default withStyles(styles)(PerformanceForm);
