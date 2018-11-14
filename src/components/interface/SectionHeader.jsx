import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { withStyles } from '@material-ui/core/styles';
import EventDialog from '../events/EventDialog';
import Button from './Button';

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
      {showNew && (<EventDialog formType="new" defaultValues={[]} />)}
    </div>
  </div>
);

const styles = () => ({
  sectionHeaderWrapper: {
    textAlign: 'center',
    position: 'relative',
    marginTop: '25px',
    marginBottom: '25px'
  },
  sectionHeaderAction: {
    display: 'flex',
    position: 'absolute',
    top: '5px',
    right: '25px'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 36,
    color: '#de2706'
  }
});

SectionHeader.propTypes = {
  classes: PropTypes.shape().isRequired,
  showWinner: PropTypes.bool,
  showNew: PropTypes.bool,
  title: PropTypes.string.isRequired
};

SectionHeader.defaultProps = {
  showWinner: false,
  showNew: true
};

export default withStyles(styles)(SectionHeader);
