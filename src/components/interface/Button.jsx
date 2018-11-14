import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MUIButton from '@material-ui/core/Button';
import styles from '../styles';

const Button = ({
  classes, children, disabled, type, onClick
}) => {
  let customClasses;
  switch (type) {
    case 'outline':
      customClasses = classes.button_outline;
      break;
    case 'secondary':
      customClasses = classes.button_secondary;
      break;
    case 'primary':
      customClasses = classes.button_primary;
      break;
    case 'default':
    default:
      customClasses = classes.button_default;
      break;
  }
  const disabledClasss = disabled ? classes.button_disabled : null;

  return (
    <MUIButton
      disabled={disabled}
      onClick={() => onClick && onClick()}
      type="submit"
      classes={{ root: classnames(disabledClasss, classes.button, customClasses) }}>
      {children}
    </MUIButton>
  );
};

Button.propTypes = {
  classes: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['outline', 'primary', 'secondary', 'default']).isRequired
};

Button.defaultProps = {
  disabled: false
};

export default withStyles(styles)(Button);