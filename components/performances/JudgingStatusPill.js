import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes

import styles from '@styles/components/performances/JudgingStatusPill.module.scss';

export default function JudgingStatusPill({ completedAdjudications, totalAdjudications }) {
  return (
    <div
      className={`${styles.judgingStatusPill} ${
        completedAdjudications === totalAdjudications ? styles.complete : styles.incomplete
      }`}
    >{`${completedAdjudications}/${totalAdjudications} Complete`}</div>
  );
}

JudgingStatusPill.propTypes = {
  completedAdjudications: PropTypes.number.isRequired,
  totalAdjudications: PropTypes.number.isRequired,
};
