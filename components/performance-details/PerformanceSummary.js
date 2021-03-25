import React from 'react';
import ScoreCard from '@components/ScoreCard'; // Score Card
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
  const finalistAwards = awards.filter(({ status }) => status === 'FINALIST');

  return (
    <>
      <div className={styles.performance__summary_container}>
        <div className={styles.performance__summary_performanceLink}>
          <a>Watch Performance</a>
        </div>
        <div className={styles.performance__summary_performanceInfo}>
          <div>
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
          <div>
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
        {finalistAwards.length > 0 && (
          <div className={styles.performance_details__awards_list}>
            <h2>Awarded:</h2>
            <ul>
              {finalistAwards.map(({ title }, i) => (
                <li key={i}>{title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.performance_details__score_content}>
        <ScoreCard title="Technical" score={technicalScore} />
        <ScoreCard title="Artistic" score={artisticScore} />
        <ScoreCard title="Cumulative" score={cumulativeScore} variant="grey" />
      </div>
    </>
  );
}
