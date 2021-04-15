import { useState } from 'react'; // React

import { isKeyValidOnNumberInput } from '@utils/score-validation'; // Key validation
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

  const handleKeyDown = event => {
    const key = event.key;
    // Allow some keys
    if (isKeyValidOnNumberInput(key)) {
      return;
    }
    // Disallow '0' if input is empty
    if (event.target.value.length === 0 && key === '0') {
      event.preventDefault();
    }
    // Disallow +, -, 'e' (for exponent), .
    if (/\+|-|e|\./.test(key)) {
      event.preventDefault();
    }
  };

  const handleChange = event => {
    const scoreInt = parseInt(event.target.value);
    // Disallow value being greater than 100
    if (scoreInt < 0 || scoreInt > 100) {
      return;
    }
    setScore(event.target.value);
  };

  return (
    <div
      className={`${styles.scoreCard} ${variantClassName} ${focused ? styles.focused : undefined}`}
    >
      {edit ? (
        <input
          type="number"
          min="0"
          max="100"
          value={score}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <h1>{isNaN(score) ? '-' : score}</h1>
      )}
      <h2>{title}</h2>
    </div>
  );
}
