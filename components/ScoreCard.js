import React, { useState } from 'react'; // React

import styles from '@styles/components/ScoreCard.module.scss'; // Component styles

export default function ScoreCard({
  edit = false,
  title,
  score,
  setScore = () => {},
  variant = 'outlined',
}) {
  const [focused, setFocused] = useState(false);
  const variantClassName = variant === 'grey' ? styles.grey : variant === 'red' ? styles.red : '';

  const onChange = event => {
    setScore(event.target.value);
  };

  return (
    <div
      className={`${styles.scoreCard} ${variantClassName} ${focused ? styles.focused : undefined}`}
    >
      {edit ? (
        <input
          value={score}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <h1>{score}</h1>
      )}
      <h2>{title}</h2>
    </div>
  );
}
