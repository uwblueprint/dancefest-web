import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import Typography from '@material-ui/core/Typography';

import styles from '../styles';

const SectionHeader = ({
  classes,
  renderNewButton,
  title
}) => (
  <div className={classes.sectionHeaderWrapper}>
    <div className={classes.sectionHeaderBackButton}>
      <Button type="default" onClick={() => history.goBack()}>
        <ArrowLeft />
      </Button>
    </div>
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
<<<<<<< HEAD
  renderNewButton: PropTypes.node,
=======
  eventId: PropTypes.string,
  history: PropTypes.shape().isRequired,
  showNew: PropTypes.bool,
>>>>>>> Introducing: Dropdown for logout / settings, back button and delete events
  title: PropTypes.string.isRequired
};

SectionHeader.defaultProps = {
  renderNewButton: null
};

export default withRouter(withStyles(styles)(SectionHeader));
