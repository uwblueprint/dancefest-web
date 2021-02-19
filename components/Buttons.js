import styles from "@styles/components/Buttons.module.scss"; // Button component styles

/**
 * Button with filled background-color
 * @param {Function} onClick event
 * @param {Boolean} fullWidth to extend button to full width of parent
 * @param {HTMLElement} children containing text or elements
 * @param {Object} props remaining props
 * @returns {HTMLElement} button
 */
function FilledButton({ onClick, fullWidth, children, ...props }) {
  return (
    <button
      className={`${styles.button__filled} ${
        // If fullWidth toggled, apply fullwidth class
        fullWidth ? styles.button__fullwidth : null
      }`}
      // onClick handler
      onClick={onClick}
      // Pass remaining props
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Button with border, no fill background-color
 * @param {Function} onClick event
 * @param {Boolean} fullWidth to extend button to full width of parent
 * @param {HTMLElement} children containing text or elements
 * @param {Object} props remaining props
 * @returns {HTMLElement} button
 */
function UnfilledButton({ onClick, fullWidth, children, ...props }) {
  return (
    <button
      className={`${styles.button__unfilled} ${
        // If fullWidth toggled, apply fullwidth class
        fullWidth ? styles.button__fullwidth : null
      }`}
      // onClick handler
      onClick={onClick}
      // Pass remaining props
      {...props}
    >
      {children}
    </button>
  );
}

// Export buttons
export { FilledButton, UnfilledButton };
