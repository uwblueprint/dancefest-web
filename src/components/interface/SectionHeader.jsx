import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import styles from '../styles';

const SectionHeader = ({
  classes,
  renderNewButton,
  title
}) => (
  <div className={classes.sectionHeaderWrapper}>
    <Typography variant="h3">
      {`${title}s`}
    </Typography>
    {!!renderNewButton && (
      <div className={classes.sectionHeaderAction}>
        {renderNewButton}
      </div>)
    }
  </div>
);

SectionHeader.propTypes = {
  classes: PropTypes.shape().isRequired,
  renderNewButton: PropTypes.node,
  title: PropTypes.string.isRequired
};

SectionHeader.defaultProps = {
  renderNewButton: null
};

export default withStyles(styles)(SectionHeader);
