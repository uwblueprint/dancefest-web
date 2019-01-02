import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import AdjEmptyImage from '../images/Adjudications_empty.png';
import EventEmptyImage from '../images/Events_empty.png';
import PerformanceEmptyImage from '../images/Performances_empty.png';
import styles from '../styles';

const EmptyState = ({ classes, type }) => {
  let image;
  let subtitle;
  let title;
  switch (type) {
    case 'event':
      image = EventEmptyImage;
      subtitle = 'Create your first event';
      title = 'Empty Events Page';
      break;
    case 'adjudication':
      image = AdjEmptyImage;
      subtitle = 'Adjudications will be synced following the event';
      title = 'Empty Adjudications Page';
      break;
    case 'performance':
    default:
      image = PerformanceEmptyImage;
      subtitle = 'Create your first performance';
      title = 'Empty Performances Page';
      break;
  }

  return (
    <div className={classes.emptyState_wrapper}>
      <div className={classes.emptyState_content}>
        <img src={image} alt={`Empty ${type} Section`} width="300" />
        <p className={classes.emptyState_title}>{title}</p>
        <p className={classes.emptyState_subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

EmptyState.propTypes = {
  classes: PropTypes.shape().isRequired,
  type: PropTypes.oneOf(['event', 'adjudication', 'performance']).isRequired
};

export default withStyles(styles)(EmptyState);
