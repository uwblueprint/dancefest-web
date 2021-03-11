import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes

import Delete from '@assets/delete.svg'; // Delete icon
import styles from '@styles/components/Pill.module.scss'; // Component styles

// Filter Value
export default function Pill({ className = '', value, onDelete }) {
  return (
    <div className={`${styles.pill} ${className}`}>
      {value}
      <img src={Delete} onClick={onDelete} />
    </div>
  );
}

Pill.propTypes = {
  className: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
