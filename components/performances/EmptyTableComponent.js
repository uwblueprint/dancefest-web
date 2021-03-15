import React from 'react'; // React

import DancerRedJump from '@assets/dancer-red-jump.svg'; // Jumping Dancer SVG
import DancerYellowBlue from '@assets/dancer-yellow-blue.svg'; // Jumping Dancer SVG
import styles from '@styles/components/performances/EmptyTableComponent.module.scss'; // Component styles

export default function EmptyTableComponent() {
  return (
    <div className={styles.page__performances_list_empty}>
      <img src={DancerYellowBlue} />
      <div>
        <h2>No Performances Listed</h2>
        <h3>Create your first performance</h3>
      </div>
      <img src={DancerRedJump} />
    </div>
  );
}
