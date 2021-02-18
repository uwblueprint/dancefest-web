import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes

import styles from 'styles/components/Input.module.css'; // Component styles

export default function Input({
  className,
  inputRef = null,
  icon: Icon,
  onIconClick = () => {},
  ...props
}) {
  return (
    <div className={styles.input__wrapper}>
      <input
        className={`${styles.input} ${className} ${Icon && styles.input_withIcon}`}
        ref={inputRef}
        {...props}
      />
      {Icon && (
        <div className={styles.input__icon} onClick={onIconClick}>
          <Icon />
        </div>
      )}
    </div>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  onIconClick: PropTypes.func,
};
