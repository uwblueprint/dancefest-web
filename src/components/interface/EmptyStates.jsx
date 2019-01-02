import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import AdjEmptyImage from '../images/Adjudications_empty.png';
import EventEmptyImage from '../images/Events_empty.png';
import performanceEmptyImage from '../images/Performances_empty.png';
import styles from '../styles';

const EmptyState = ({ classes, type }) => {
  let image;
  let title;
  let subtitle;
  switch (type) {
    case 'event':
      image = EventEmptyImage;
      title = 'Empty Events Page';
      subtitle = 'Create your first event';
      break;
    case 'adjudication':
      image = AdjEmptyImage;
      title = 'Empty Adjudications Page';
      subtitle = 'Adjudications will be synced following the event';
      break;
    case 'performance':
    default:
      image = performanceEmptyImage;
      title = 'Empty Performances Page';
      subtitle = 'Create your first Performance';
      break;
  }

  return (
    <div className={classes.emptyState_wrapper}>
      <div className={classes.emptyState_content}>
        <img src={image} alt="" width="300" />
        <p className={classes.emptyState_title}>{title}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

EmptyState.propTypes = {
  classes: PropTypes.shape().isRequired,
  type: PropTypes.oneOf(['event', 'adjudication', 'performance']).isRequired
};

export default withStyles(styles)(EmptyState);
