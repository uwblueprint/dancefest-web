import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes

import Edit from '@assets/edit.svg'; // Edit Icon
import styles from '@styles/components/Button.module.scss'; // Button component styles

export default function Button({
  className = '',
  children,
  variant,
  fullWidth,
  onClick,
  ...props
}) {
  switch (variant) {
    case 'edit':
      return (
        <button
          className={`${styles.button__edit} ${className} ${
            // If fullWidth toggled, apply fullwidth class
            fullWidth ? styles.button__fullwidth : null
          }`}
          onClick={onClick}
          {...props}
        >
          <img src={Edit} />
        </button>
      );
    case 'outlined':
      return (
        <button
          className={`${styles.button} ${styles.button__outlined} ${className} ${
            // If fullWidth toggled, apply fullwidth class
            fullWidth ? styles.button__fullwidth : null
          }`}
          onClick={onClick}
          {...props}
        >
          {children}
        </button>
      );
    default:
      return (
        <button
          className={`${styles.button} ${styles.button__contained} ${className} ${
            // If fullWidth toggled, apply fullwidth class
            fullWidth ? styles.button__fullwidth : null
          }`}
          onClick={onClick}
          {...props}
        >
          {children}
        </button>
      );
  }
}

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'contained', 'edit']),
};
