import React, { useState } from 'react'; // React

import Button from '@components/Button'; // Button
import Dropdown from '@components/Dropdown'; // Dropdown
import TextInput from '@components/Input'; // Input
import PlayIcon from '@assets/play.svg'; // Play icon
import styles from '@styles/components/performance-details/JudgeFeedback.module.scss'; // Component styles

export default function JudgeFeedback({ adjudication }) {
  const { notes: initialNotes, technicalScore, artisticScore, cumulativeScore } = adjudication;

  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState(initialNotes);

  const options = [
    {
      value: 'Most Inspiring Medium Group Performance',
      label: 'Most Inspiring Medium Group Performance',
    },
    {
      value: 'Most Exciting Medium Group Performance',
      label: 'Most Exciting Medium Group Performance',
    },
    {
      value: 'Most Inspiring Large Group Performance',
      label: 'Most Inspiring Large Group Performance',
    },
  ];

  const [specialAward, setSpecialAward] = useState(`Sharp Movements`);

  return (
    <div className={styles.judge__feedback_container}>
      <div className={styles.judge__feedback_header}>
        <h2>Notes</h2>
        {editMode ? (
          <span>
            <Button
              variant="outlined"
              onClick={() => {
                setEditMode(false);
              }}
              className={styles.judge__feedback_buttons_spacing}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setEditMode(false);
              }}
            >
              Save
            </Button>
          </span>
        ) : (
          <Button
            variant="outlined"
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit Feedback
          </Button>
        )}
      </div>
      <div>
        {editMode ? (
          <div className={styles.judge__feedback_notes_input}>
            <textarea
              onChange={e => {
                setNotes(e.target.value);
              }}
            >
              {notes}
            </textarea>
          </div>
        ) : (
          <p>{notes}</p>
        )}
      </div>
      <div className={styles.judge__feedback_audio_player}>
        <p>{`OSSDF2021_1.mp3`}</p>
        <span>
          <p>{`3:07`}</p>
          <img src={PlayIcon} />
        </span>
      </div>
      <div>
        <h2>Nominated for:</h2>
        {editMode ? (
          <Dropdown
            selected={options[0]}
            options={options}
            wrapperClassName={styles.judge__feedback_dropdown_wrapper}
          />
        ) : (
          <p>{`Most Inspiring Medium Group Performance`}</p>
        )}
      </div>
      <div>
        <h2>Special Award:</h2>
        {editMode ? (
          <TextInput
            fullWidth
            onChange={setSpecialAward}
            value={specialAward}
            wrapperClassName={styles.judge__feedback_input_wrapper}
          />
        ) : (
          <p>{specialAward}</p>
        )}
      </div>

      <div className={styles.performance_summary__score_content}>
        <div className={styles.performance_details__score_card}>
          <div style={{ textAlign: 'center' }}>
            <h1>{technicalScore}</h1>
            <h2>{`Technical`}</h2>
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
