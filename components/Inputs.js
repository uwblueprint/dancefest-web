import styles from '@styles/components/Inputs.module.scss'; // Input component styles

/**
 * Standard input field
 * @param {String} type of field
 * @param {any} value of field
 * @param {Function} onChange event handler for input changes
 * @param {Function} onEnter optional function to run on enter
 * @param {Boolean} fullWidth if 100% of width of parent
 * @returns {HTMLElement} standard input field
 */
function TextInput({ type, value, onChange, onEnter, fullWidth, ...props }) {
  /**
   * Handles execution on enter
   * @param {Event} e event
   */
  const handleEnter = e => {
    // If pressed key is enter, execute onEnter
    if (e.key === 'Enter') onEnter();
  };

  return (
    <input
      className={`${styles.input__text} ${
        // If fullWidth boolean, style with fullwidth class
        fullWidth ? styles.input__fullwidth : null
      }`}
      type={type}
      value={value}
      onChange={onChange}
      // If onEnter provided, handleEnter, else do nothing
      onKeyPress={onEnter ? handleEnter : null}
      // Pass remaining props
      {...props}
    />
  );
}

// Export inputs
export { TextInput };
