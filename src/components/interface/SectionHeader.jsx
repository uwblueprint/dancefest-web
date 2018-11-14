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
  showWinner
}) => (
  <div className={classes.sectionHeaderWrapper}>
    <Typography variant="h3">
      {title}
      s
    </Typography>
    <div className={classes.sectionHeaderAction}>
      {showWinner && (
        <Button type="outline" onClick={() => {}}>
          <CalendarTodayIcon style={{ color: 'gray', marginRight: '5px' }} />
          Winners
        </Button>
      )}
      {showNew && (title === 'event'
        ? (<EventDialog formType="new" defaultValues={[]} />)
        : (<PerformanceDialog formType="new" defaultValues={[]} />)
      )}
    </div>
  </div>
);

SectionHeader.propTypes = {
  classes: PropTypes.string.isRequired,
  showWinner: PropTypes.bool,
  showNew: PropTypes.bool,
  title: PropTypes.string.isRequired
};

SectionHeader.defaultProps = {
  showWinner: false,
  showNew: true
};

export default withStyles(styles)(SectionHeader);
