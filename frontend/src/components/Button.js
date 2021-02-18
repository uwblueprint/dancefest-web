import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes

import { ReactComponent as Edit } from 'assets/edit.svg'; // Edit Icon
import styles from 'styles/components/Button.module.css'; // Component styles

export default function Button({ className, children, variant, ...props }) {
  let variantClasses = '';

  switch (variant) {
    case 'outlined':
      variantClasses = `${styles.button} ${styles.button__outlined}`;
      break;
    case 'contained':
      variantClasses = `${styles.button} ${styles.button__contained}`;
      break;
  }

  variantClasses += ` ${className}`;

  return variant === 'edit' ? (
    <button className={styles.button__edit} {...props}>
      <Edit />
    </button>
  ) : (
    <button className={variantClasses} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  variant: PropTypes.oneOf(['outlined', 'contained', 'edit']),
};
