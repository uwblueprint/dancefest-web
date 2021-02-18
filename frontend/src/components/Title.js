import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes

import styles from 'styles/components/Title.module.css'; // Component styles

export default function Title({ children }) {
  return <h1 className={styles.title}>{children}</h1>;
}

Title.propTypes = {
  children: PropTypes.any,
};
