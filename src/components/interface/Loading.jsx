import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

import { withStyles } from '@material-ui/core/styles';

import styles from '../styles';

const Loading = ({
  classes,
  color,
  height,
  type,
  width
}) => (
  <div className={classes.loading_wrapper}>
    <ReactLoading color={color} height={height} type={type} width={width} />
  </div>
);

Loading.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  type: PropTypes.string,
  width: PropTypes.number
};

Loading.defaultProps = {
  color: '#de2706',
  height: 50,
  type: 'spin',
  width: 50
};

Loading.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(Loading);
