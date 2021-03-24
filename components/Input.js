import React from 'react';
import PropTypes from 'prop-types'; // PropTypes
import styles from '@styles/components/Input.module.scss'; // Input component styles

/**
 * Standard input field
 * @param {String} type of field
 * @param {any} value of field
 * @param {Function} onChange event handler for input changes
 * @param {Function} onEnter optional function to run on enter
 * @param {Boolean} fullWidth if 100% of width of parent
 * @returns {HTMLElement} standard input field
 */
export default function TextInput({
  className = '',
  wrapperClassName = '',
  type,
  value,
  onChange,
  onEnter,
  fullWidth,
  inputRef = null,
  icon: Icon,
  onIconClick = () => {},
  ...props
}) {
  /**
   * Handles execution on enter
   * @param {Event} e event
   */
  const handleEnter = e => {
    // If pressed key is enter, execute onEnter
    if (e.key === 'Enter') onEnter();
  };

  return (
    <div
      className={`${styles.input__wrapper} ${
        // If fullWidth boolean, style with fullwidth class
        fullWidth ? styles.input__fullwidth : null
      } ${wrapperClassName}`}
    >
      <input
        className={`${styles.input} ${className} ${Icon && styles.input_withIcon}`}
        ref={inputRef}
        // If onEnter provided, handleEnter, else do nothing
        onKeyPress={onEnter ? handleEnter : null}
        type={type}
        value={value}
        onChange={onChange}
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

TextInput.propTypes = {
  className: PropTypes.string,
  fullWidth: PropTypes.any,
  icon: PropTypes.element,
  inputRef: PropTypes.oneOfType([
    PropTypes.shape({
      current: PropTypes.elementType,
    }),
    PropTypes.func,
  ]),
  onChange: PropTypes.any,
  onEnter: PropTypes.func,
  onIconClick: PropTypes.func,
  type: PropTypes.any,
  value: PropTypes.any,
  wrapperClassName: PropTypes.string,
};
