import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes

import { ReactComponent as Edit } from 'assets/edit.svg'; // Edit Icon
import styles from 'styles/components/Button.module.css'; // Component styles

export default function Button({ className = '', children, variant, ...props }) {
  switch (variant) {
    case 'edit':
      return (
        <button className={`${styles.button__edit} ${className}`} {...props}>
          <Edit />
        </button>
      );
    case 'outlined':
      return (
        <button className={`${styles.button} ${styles.button__outlined} ${className}`} {...props}>
          {children}
        </button>
      );
    default:
      return (
        <button className={`${styles.button} ${styles.button__contained} ${className}`} {...props}>
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
