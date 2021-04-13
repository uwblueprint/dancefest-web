import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import styles from '@styles/components/performance-details/Tab.module.scss'; // Component styles

export default function Tab({
  children,
  adjudication,
  nominations = [],
  selected,
  handleClick,
  newFeedback,
}) {
  return (
    <div className={`${styles.judge__tab} ${selected && styles.judge__tab_selected}`}>
      <button onClick={handleClick}>
        {/* Event title */}
        <h3>{children}</h3>
        {!newFeedback && (
          <div className={styles.judge__tab_stats}>
            <span>ARTISTIC: {adjudication.artisticScore}</span>
            <span>TECHNICAL: {adjudication.technicalScore}</span>
            <span>CUMULATIVE: {adjudication.cumulativeScore}</span>
          </div>
        )}

        <div className={styles.judge__tab_awards}>
          {newFeedback ? (
            <h4>Add your feedback here!</h4>
          ) : (
            <>
              <h4>AWARD NOMINATIONS:</h4>
              <ul>
                {nominations.length > 0 ? (
                  nominations.map(({ title }, i) => <li key={i}>{title}</li>)
                ) : (
                  <li>None</li>
                )}
              </ul>
            </>
          )}
        </div>
      </button>
    </div>
  );
}

Tab.propTypes = {
  children: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.bool,
  setSelectedTab: PropTypes.func,
  tabIndex: PropTypes.number,
};
