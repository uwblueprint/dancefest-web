import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes

import Delete from '@assets/delete.svg'; // Delete icon
import styles from '@styles/components/Pill.module.scss'; // Component styles

// Filter Value
export default function Pill({ className = '', label, onDelete }) {
  return (
    <div className={`${styles.pill} ${className}`}>
      {label}
      <img src={Delete} onClick={onDelete} />
    </div>
  );
}

Pill.propTypes = {
  className: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
