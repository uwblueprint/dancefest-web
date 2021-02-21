import React, { useState } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes

import styles from '@styles/components/Tabs.module.scss'; // Component styles

export default function Tabs({
  firstTabName = 'Tab one',
  secondTabName = 'Tab two',
  firstTabContent = null,
  secondTabContent = null,
}) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={styles.tabs}>
      <div className={styles.tabs__tabs}>
        <button
          className={`${styles.tabs__tab} ${styles.tabs__tabLeft} ${
            selectedTab === 0 && styles.tabs__tabSelectedLeft
          }`}
          onClick={() => setSelectedTab(0)}
        >
          {firstTabName}
        </button>
        <button
          className={`${styles.tabs__tab} ${styles.tabs__tabRight} ${
            selectedTab === 1 && styles.tabs__tabSelectedRight
          }`}
          onClick={() => setSelectedTab(1)}
        >
          {secondTabName}
        </button>
      </div>
      <div className={styles.tabs__content}>
        {selectedTab === 0 ? firstTabContent : secondTabContent}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  firstTabContent: PropTypes.any,
  firstTabName: PropTypes.string,
  secondTabContent: PropTypes.any,
  secondTabName: PropTypes.string,
};
