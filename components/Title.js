import PropTypes from 'prop-types'; // PropTypes
import styles from '@styles/components/Title.module.scss'; // Component styles

/**
 * Title
 * @param {HTMLElement} children to wrap
 * @param {String} className optional additional classes
 * @returns {HTMLElement} H1 title element
 */
function Title({ children, className = '' }) {
  return <h1 className={`${styles.title} ${className}`}>{children}</h1>;
}

// Title PropTypes
Title.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

// Export title
export { Title };
