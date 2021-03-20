import React from 'react'; // React
import DancerRedJump from '@assets/dancer-red-jump.svg'; // Jumping Dancer SVG
import styles from '@styles/components/performance-details/EmptyComponent.module.scss'; // Component styles

export default function EmptyComponent() {
  return (
    <div className={styles.performance_details__no_content}>
      <div>
        <h2>No Feedback Yet</h2>
        <h3>Check again later</h3>
        <img src={DancerRedJump} />
      </div>
    </div>
  );
}
