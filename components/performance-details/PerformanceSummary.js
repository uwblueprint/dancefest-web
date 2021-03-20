import React from 'react';
import styles from '@styles/components/performance-details/PerformanceSummary.module.scss'; // Component styles

export default function PerformanceSummary({ performance }) {
  const {
    danceEntry,
    performers,
    choreographers,
    schoolName,
    performanceLevel,
    danceStyle,
    danceSize,
    cumulativeScore,
    technicalScore,
    artisticScore,
    awards,
  } = performance;

  return (
    <div>
      <div className={styles.performance__summary_container}>
        <div className={styles.performance__summary_col}>
          <div>
            <h2>Entry ID</h2>
            <span>{danceEntry}</span>
          </div>
          <div>
            <h2>Dancer(s)</h2>
            <span>{performers.join(', ')}</span>
          </div>
          <div>
            <h2>Choreographer(s)</h2>
            <span>{choreographers.join(', ')}</span>
          </div>
        </div>
        <div className={styles.performance__summary_col}>
          <div>
            <h2>School</h2>
            <span>{schoolName}</span>
          </div>
          <div>
            <h2>Competition Level</h2>
            <span>{performanceLevel}</span>
          </div>
          <div>
            <h2>Style</h2>
            <span>{danceStyle}</span>
          </div>
          <div>
            <h2>Size</h2>
            <span>{danceSize}</span>
          </div>
        </div>
      </div>
      <div className={styles.performance_details__awards_list}>
        <h2>Awarded:</h2>
        <ul>
          {awards
            .filter(({ status }) => status === 'FINALIST')
            .map(({ title }, i) => (
              <li key={i}>{title}</li>
            ))}
        </ul>
      </div>
      <div className={styles.performance_details__score_content}>
        <div className={styles.performance_details__score_card}>
          <div style={{ textAlign: 'center' }}>
            <h1>{technicalScore}</h1>
            <h2>{`TECHNICAL`}</h2>
          </div>
        </div>

        <div className={styles.performance_details__score_card}>
          <div style={{ textAlign: 'center' }}>
            <h1>{artisticScore}</h1>
            <h2>{`ARTISTIC`}</h2>
          </div>
        </div>

        <div
          className={`${styles.performance_details__score_card} ${styles.performance_details__score_card_cumulative}`}
        >
          <div style={{ textAlign: 'center' }}>
            <h1>{cumulativeScore}</h1>
            <h2>{`CUMULATIVE`}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
