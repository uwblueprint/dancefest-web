import PropTypes from 'prop-types'; // PropTypes
import styles from '@styles/components/Button.module.scss'; // Button component styles

/**
 * Buttons
 * @param {String} className Optional class names
 * @param {HTMLElement} children child HTML content
 * @param {String} variant type of button
 * @param {Boolean} fullWidth if button takes full width of container
 * @param {Function} onClick handler
 * @returns {HTMLElement} individual button
 */
function Button({ className = '', children, variant, fullWidth, onClick, ...props }) {
  // Render different button based on variant type
  switch (variant) {
    // Edit button
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
          <img src="/vectors/edit.svg" alt="Edit" />
        </button>
      );
    // Outlined, no-fill button
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
    // Default filled button
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

// Button PropTypes
Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'contained', 'edit']),
};

// Export buttons
export { Button };
