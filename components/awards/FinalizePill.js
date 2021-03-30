import React from 'react'; // React

import styles from '@styles/components/awards/AwardPill.module.scss';

export default function AwardPill({ onSelectWinner }) {
  return (
    <div className={`${styles.award_pill}`} onClick={onSelectWinner}>
      Select Winner
    </div>
  );
}
