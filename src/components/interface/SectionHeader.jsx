import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import Typography from '@material-ui/core/Typography';

import Button from './Button';
import styles from '../styles';

const SectionHeader = ({
  classes,
  history,
  renderNewButton,
  title
}) => {
  const goBack = () => { history.goBack(); };
  return (
    <div className={classes.sectionHeaderWrapper}>
      <div className={classes.sectionHeaderBackButton}>
        <Button type="default" onClick={goBack}>
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
};

SectionHeader.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  renderNewButton: PropTypes.node,
  title: PropTypes.string.isRequired
};

SectionHeader.defaultProps = {
  renderNewButton: null
};

export default withRouter(withStyles(styles)(SectionHeader));
