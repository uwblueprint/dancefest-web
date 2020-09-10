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

import SchoolFeedbackPerformanceList from './SchoolFeedbackPerformanceList';
import FeedbackFormPerformanceInfo from './FeedbackFormPerformanceInfo';
import Loading from '../interface/Loading';

class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentValues, school, performances } = props;

    this.state = {
      disabledSave: true,
      eventDate: currentValues.eventDate || moment().format('DD/MM/YYYY'),
      eventTitle: currentValues.eventTitle || '',
      numJudges: currentValues.numJudges || 0,
      performances: [],
      adjudications: {},
      selectedPerf: '',
      comments: [],
      loading: true
    };
  }

  componentDidMount() {
    const { performances } = this.props;
    const performanceIds = performances.map(performance => performance.id);
    getAdjudicationsByPerformanceId(performanceIds)
      .then((response) => {
        const adjudications = response.data;
        const newPerformances = performances.map((p) => {
          const performance = p;
          const scores = [];
          Object.values(adjudications[p.id]).forEach((adj) => {
            scores.push(adj.cumulativeMark);
          });
          performance.averageScore = this.mean(scores);
          return performance;
        });
        this.setState({ adjudications, performances: newPerformances, loading: false });
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    const adjudicationId = e.target.getAttribute('adjudicationId');
    const performanceId = e.target.getAttribute('performanceId');

    const { adjudications } = this.state;

    const technicalMark = (name === 'technicalMark') ? parseInt(value) : adjudications[performanceId][adjudicationId].technicalMark;
    const artisticMark = (name === 'artisticMark') ? parseInt(value) : adjudications[performanceId][adjudicationId].artisticMark;

    const cumulativeMark = technicalMark + artisticMark;

    this.setState(prevState => ({
      adjudications: {
        ...prevState.adjudications,
        [performanceId]: {
          ...prevState.adjudications[performanceId],
          [adjudicationId]: {
            ...prevState.adjudications[performanceId][adjudicationId],
            [name]: value,
            cumulativeMark
          }
        }
      },
      comments: prevState.comments.map((adj) => {
        const adjudication = adj;
        if (adjudication.id === parseInt(adjudicationId)) {
          adjudication[name] = value;
          adjudication.cumulativeMark = cumulativeMark;
        }
        return adjudication;
      }),
      performances: prevState.performances.map((p) => {
        const performance = p;
        if (performance.id === parseInt(performanceId)) {
          const scores = [];
          Object.values(prevState.adjudications[performance.id]).forEach((adj) => {
            scores.push((adj.id === parseInt(adjudicationId)) ? cumulativeMark : adj.cumulativeMark);
          });
          performance.averageScore = this.mean(scores);
        }
        return performance;
      })
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

  handleDetailsClicked = async (performance) => {
    const { adjudications } = this.state;
    const comments = Object.values(adjudications[performance.id]);
    this.setState({ comments, selectedPerf: performance });
  }

  mean = (vals) => {
    return vals.reduce((a, b) => {
      if (isNaN(b)) return 0;
      return a + b;
    }) / vals.length;
  }

  render() {
    const { classes, formType, school } = this.props;
    const {
      disabledSave,
      eventTitle,
      eventDate,
      numJudges,
      adjudications,
      performances,
      selectedPerf,
      comments,
      loading
    } = this.state;
    return (
      <React.Fragment>
        {loading? <Loading /> :
          (
            <React.Fragment>

              <h1 className="title">REVIEW AND SEND FEEDBACK</h1>

              <div className="sidebar-container">
                <p className="subtitle">Performances</p>
                <SchoolFeedbackPerformanceList
                  performances={performances}
                  onClick={this.handleDetailsClicked}
                />
              </div>

              <div className="views-container">
                <FeedbackFormPerformanceInfo
                  adjudications={comments}
                  selected={selectedPerf}
                  handleChange={this.handleChange}
                />
              </div>

              <DialogActions style={{ float: 'left', 'margin-left': '2%', 'padding-bottom': '10px' }}>
                <Button onClick={this.handleCancel} type="default">
                  {formType === dialogType.EDIT ? 'cancel' : 'discard'}
                </Button>
                <Button onClick={this.handleSubmit} type="primary">
                  Save and Email Link
                </Button>
              </DialogActions>

            </React.Fragment>
          )
        }
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
