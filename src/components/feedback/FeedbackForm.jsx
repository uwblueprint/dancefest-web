import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import moment from 'moment';

import { dialogType } from '../../constants';
import DialogInput from '../interface/dialog/DialogInput';
import Button from '../interface/Button';
import styles from '../styles';
import { getAdjudicationsByPerformanceId, updateAdjudications } from "../../api/AdjudicationAPI";
import { generateToken } from '../../api/SchoolAPI';
import { sendMail } from '../../api/MailerAPI';


class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentValues, school, performances } = props;

    this.state = {
      disabledSave: true,
      eventDate: currentValues.eventDate || moment().format('DD/MM/YYYY'),
      eventTitle: currentValues.eventTitle || '',
      numJudges: currentValues.numJudges || 0,
      adjudications: {}
    };
  }

  componentDidMount() {
    const { performances } = this.props;
    const performanceIds = performances.map(performance => performance.id);
    getAdjudicationsByPerformanceId(performanceIds)
      .then((response) => {
        this.setState({ adjudications: response.data });
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    const adjudicationId = e.target.getAttribute('adjudicationId');
    const performanceId = e.target.getAttribute('performanceId');

    this.setState(prevState => ({
      adjudications: {
        ...prevState.adjudications,
        [performanceId]: {
          ...prevState.adjudications[performanceId],
          [adjudicationId]: {
            ...prevState.adjudications[performanceId][adjudicationId],
            [name]: value
          }
        }
      }
    }));
  }

  handleCancel = () => {
    this.handleModalClose();
  }

  handleSubmit = async () => {
    const { school, eventId } = this.props;
    const { adjudications } = this.state;

    for (const performanceId in adjudications) {
      for (const adjudicationId in adjudications[performanceId]) {
        updateAdjudications(adjudicationId, adjudications[performanceId][adjudicationId]);
      }
    }

    const response = await generateToken({ school });

    sendMail({
      recipients: [response.data.teacherEmail],
      token: response.data.token,
      teacherContact: response.data.teacherContact,
      eventId,
      school
    });

    this.handleModalClose();
  }

  handleModalClose = () => {
    const { onModalClose } = this.props;
    onModalClose(false, undefined);
  }

  render() {
    const { classes, formType, school, performaces } = this.props;
    const {
      disabledSave,
      eventTitle,
      eventDate,
      numJudges,
      adjudications
    } = this.state;
    return (
      <React.Fragment>
        {Object.keys(adjudications).map((performanceId) => {
          return (
            <div>
              <p>{performanceId}</p>
              {Object.values(adjudications[performanceId]).map((adjudication) => {
                return (
                  <div style={{ margin: '25px' }}>
                    <input adjudicationId={adjudication.id} performanceId={performanceId} name="notes" label="Notes" onChange={this.handleChange} value={adjudication.notes} />
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className={classes.dfdialog_footer}>
          <DialogActions>
            <Button onClick={this.handleCancel} type="default">
              {formType === dialogType.EDIT ? 'cancel' : 'discard'}
            </Button>
            <Button onClick={this.handleSubmit} type="primary">
              Save and Email Link
            </Button>
          </DialogActions>
        </div>
      </React.Fragment>
    );
  }
}

FeedbackForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  currentValues: PropTypes.shape(),
  formType: PropTypes.oneOf([dialogType.EDIT, dialogType.NEW]),
  onModalClose: PropTypes.func.isRequired
};

FeedbackForm.defaultProps = {
  currentValues: {},
  formType: dialogType.EDIT
};

export default withStyles(styles)(FeedbackForm);
