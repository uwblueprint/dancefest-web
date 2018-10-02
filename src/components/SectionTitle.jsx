import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const SectionTitle = ({ classes, title }) => (
  <div className={classes.titleWrapper}>
    <Typography className={classes.title} variant="headline">
      {title}
    </Typography>
  </div>
);

const styles = () => ({
  titleWrapper: {
    textAlign: 'center',
    marginTop: '25px',
    marginBottom: '25px'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 36,
    color: '#9b9b9b'
  }
});

SectionTitle.propTypes = {
  classes: PropTypes.objectOf({
    titleWrapper: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(SectionTitle);
