import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { withStyles } from '@material-ui/core/styles';
import EventDialog from '../events/EventDialog';
import PerformanceDialog from '../performances/PerformanceDialog';
import Button from './Button';
import styles from '../styles';

const SectionHeader = ({
  classes,
  title,
  showNew,
  eventId
}) => (
  <div className={classes.sectionHeaderWrapper}>
    <Typography variant="h3">
      {title}
      s
    </Typography>
    <div className={classes.sectionHeaderAction}>
      {showNew && (title === 'event'
        ? (<EventDialog formType="new" />)
        : (<PerformanceDialog formType="new" eventId={eventId} />)
      )}
    </div>
  </div>
);

SectionHeader.propTypes = {
  classes: PropTypes.string.isRequired,
  showNew: PropTypes.bool,
  title: PropTypes.string.isRequired,
  eventId: PropTypes.string,
};

SectionHeader.defaultProps = {
  showNew: true
};

export default withStyles(styles)(SectionHeader);
