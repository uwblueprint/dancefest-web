import React, { useState, useEffect } from 'react'; // React
import axios from 'axios';
import { useRouter } from 'next/router';
import Navigation from '@containers/Navigation'; // Navigation state

import Button from '@components/Button'; // Button
import Input from '@components/Input'; // Input
import { formatDropdownOptions } from '@components/Dropdown'; // Dropdown
import ScoreCard from '@components/ScoreCard'; // Score Card
import DropdownGrid from '@components/DropdownGrid'; // Dropdown Grid
import AudioPlayer from '@components/AudioPlayer'; // Audio Player
import styles from '@styles/components/performance-details/JudgeFeedback.module.scss'; // Component styles

const SPECIAL_AWARD_TYPE = 'SPECIAL';
const DANCE_ARTISTRY_AWARD_TYPE = 'DANCE_ARTISTRY';

export default function JudgeFeedback({
  getPerformance = () => {},
  setLoading = () => {},
  awardsDict,
  adjudication,
  nominations: initialNominations,
}) {
  const { event: eventId } = Navigation.useContainer();
  const router = useRouter();
  const { id: performanceId } = router.query;
  const {
    id,
    userId: judgeID,
    audioUrl,
    notes: initialNotes,
    technicalScore: initialTechnicalScore,
    artisticScore: initialArtisticScore,
    cumulativeScore: initialCumulativeScore,
  } = adjudication;
  const initialNormalAwards = formatDropdownOptions(
    (initialNominations || []).filter(({ type }) => type === DANCE_ARTISTRY_AWARD_TYPE),
    { value: 'id', label: 'title' }
  );
  const initialSpecialAward =
    formatDropdownOptions(
      (initialNominations || []).filter(({ type }) => type === SPECIAL_AWARD_TYPE),
      {
        value: 'id',
        label: 'title',
      }
    )[0] || null;
  const normalAwardsOptions = [
    { value: null, label: 'None' },
    ...formatDropdownOptions(
      Object.values(awardsDict).filter(({ type }) => type === DANCE_ARTISTRY_AWARD_TYPE),
      {
        value: 'id',
        label: 'title',
      }
    ),
  ];

  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const [technicalScore, setTechnicalScore] = useState(initialTechnicalScore);
  const [artisticScore, setArtisticScore] = useState(initialArtisticScore);
  const [cumulativeScore, setCumulativeScore] = useState(initialCumulativeScore);
  const [normalAwards, setNormalAwards] = useState(initialNormalAwards);
  const [specialAward, setSpecialAward] = useState(initialSpecialAward); // Existing special award
  const [specialAwardName, setSpecialAwardName] = useState(
    initialSpecialAward ? initialSpecialAward.label : ''
  ); // New/existing special award

  const normalAwardsData = normalAwards
    .filter(award => !!award)
    .map(award => awardsDict[award.value]);
  const specialAwardData = specialAward && awardsDict[specialAward.value];

  useEffect(() => {
    if (adjudication) {
      setNormalAwards(initialNormalAwards);
      setSpecialAward(initialSpecialAward);
      setNotes(adjudication.notes);
      setTechnicalScore(adjudication.technicalScore);
      setArtisticScore(adjudication.artisticScore);
      setCumulativeScore(adjudication.cumulativeScore);
    }
  }, [adjudication, initialNominations]);

  // Submit updated feedback
  const updateFeedback = async () => {
    setLoading(true);

    try {
      // Update adjudication
      await axios({
        method: 'put',
        url: `/api/adjudications/edit`,
        data: {
          id,
          artisticMark: artisticScore,
          technicalMark: technicalScore,
          cumulativeMark: cumulativeScore,
          notes,
        },
      });

      // Update nominations
      await axios({
        method: 'put',
        url: `/api/performances/nominate`,
        data: {
          eventID: parseInt(eventId),
          performanceID: parseInt(performanceId),
          awardIDs: (specialAward === null ? [...normalAwards] : [...normalAwards, specialAward])
            .filter(award => award !== null)
            .map(award => award.value)
            .filter(awardId => awardId !== null),
          judgeID,
          specialAwardName,
        },
      });

      await getPerformance();
    } catch {
      // Empty catch block
    }

    setLoading(false);
  };

  // Discard changes
  const cancelUpdate = async () => {
    setLoading(true);
    getPerformance(); // Re-sync data with server
    setLoading(false);
  };

  return (
    <>
      <div className={styles.judge__feedback_container}>
        <div className={styles.judge__feedback_header}>
          <h2>Notes</h2>
          {editMode ? (
            <span>
              <Button
                variant="outlined"
                onClick={() => {
                  cancelUpdate();
                  setEditMode(false);
                }}
                className={styles.judge__feedback_buttons_spacing}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  updateFeedback();
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
        <div className={styles.judge__feedback_notes_wrapper}>
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
            <p>{notes || 'None'}</p>
          )}
        </div>
        <div className={styles.judge__feedback_audio_player_wrapper}>
          <AudioPlayer audioUrl={audioUrl} />
        </div>
        <div className={styles.judge__feedback_nominations}>
          <h2>Nominated for:</h2>
          {editMode ? (
            <DropdownGrid
              placeholder="Select Award"
              options={normalAwardsOptions}
              values={normalAwards}
              setValues={setNormalAwards}
            />
          ) : normalAwardsData.length > 0 ? (
            normalAwardsData.map(({ title }, i) => <p key={i}>{title}</p>)
          ) : (
            <p>None</p>
          )}
        </div>
        <div className={styles.judge__feedback_awards}>
          <h2>Special Award:</h2>
          {editMode ? (
            <Input
              placeholder="Special Award"
              value={specialAwardName}
              onChange={event => setSpecialAwardName(event.target.value)}
            />
          ) : specialAwardData && specialAwardData.title ? (
            <p>{specialAwardData.title}</p>
          ) : (
            <p>None</p>
          )}
        </div>
      </div>
      <div className={styles.performance_summary__score_content}>
        <ScoreCard
          edit={editMode}
          title="Technical"
          score={technicalScore}
          setScore={setTechnicalScore}
        />
        <ScoreCard
          edit={editMode}
          title="Artistic"
          score={artisticScore}
          setScore={setArtisticScore}
        />
        <ScoreCard
          edit={editMode}
          title="Cumulative"
          score={cumulativeScore}
          setScore={setCumulativeScore}
          variant="grey"
        />
      </div>
    </>
  );
}
