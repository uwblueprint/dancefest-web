import React, { useState, useEffect } from 'react'; // React
import axios from 'axios'; // axios
import { useRouter } from 'next/router';
import { useS3Upload } from 'next-s3-upload'; // Upload files to S3
import Event from '@containers/Event'; // Event state

import Button from '@components/Button'; // Button
import Input from '@components/Input'; // Input
import { formatDropdownOptions } from '@components/Dropdown'; // Dropdown
import ScoreCard from '@components/ScoreCard'; // Score Card
import DropdownGrid from '@components/DropdownGrid'; // Dropdown Grid
import FeedbackAudio from '@components/performance-details/FeedbackAudio'; // Feedback audio
import styles from '@styles/components/performance-details/JudgeFeedback.module.scss'; // Component styles

import useSnackbar from '@utils/useSnackbar'; // Snackbar
import { calculateAverageScore } from '@utils/performances'; // Calculate average score util

const SPECIAL_AWARD_TYPE = 'SPECIAL';
const DANCE_ARTISTRY_AWARD_TYPE = 'DANCE_ARTISTRY';

export default function NewJudgeFeedback({
  getPerformance = () => {},
  setLoading = () => {},
  awardsDict,
  nominations: initialNominations,
  judgeID,
}) {
  const { snackbarError } = useSnackbar();
  const [event] = Event.useContainer();
  const router = useRouter();
  const { id: performanceId } = router.query;
  const { id: eventId } = event;
  const { uploadToS3 } = useS3Upload();

  // Get valid Award options
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

  const [editMode, setEditMode] = useState(true);
  const [notes, setNotes] = useState('');
  const [technicalScore, setTechnicalScore] = useState(0);
  const [artisticScore, setArtisticScore] = useState(0);
  const [cumulativeScore, setCumulativeScore] = useState(0);
  const [normalAwards, setNormalAwards] = useState(initialNormalAwards);
  const [specialAward, setSpecialAward] = useState(initialSpecialAward); // Existing special award
  const [specialAwardName, setSpecialAwardName] = useState(
    initialSpecialAward ? initialSpecialAward.label : ''
  ); // New/existing special award

  // Audio state
  const [recordingChanged, setRecordingChanged] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);

  useEffect(() => {
    setNormalAwards(initialNormalAwards);
    setSpecialAward(initialSpecialAward);
  }, [initialNominations]);

  // Upload audio blob to S3
  const uploadAudio = async () => {
    if (recordedBlob) {
      const file = new File(
        [recordedBlob.blob],
        `performance-${performanceId}-judge-${judgeID}-feedback.mp3`,
        {
          type: 'audio/mp3',
          lastModified: Date.now(),
        }
      );
      const { url } = await uploadToS3(file);
      return url;
    } else {
      throw new Error('Missing audio recording blob');
    }
  };

  // Submit new feedback
  const createFeedback = async () => {
    setLoading(true);

    try {
      // Create adjudication
      await axios({
        method: 'put',
        url: `/api/adjudications/create`,
        data: {
          artisticMark: artisticScore,
          technicalMark: technicalScore,
          cumulativeMark: cumulativeScore,
          notes,
          audioUrl: recordingChanged ? await uploadAudio() : undefined,
          performanceID: parseInt(performanceId),
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
    } catch (err) {
      snackbarError(err);
    } finally {
      // Reset audio state
      if (recordingChanged) {
        setRecordingChanged(false);
        setRecordedBlob(false);
      }
    }

    setLoading(false);
  };

  // Discard changes
  const cancelUpdate = async () => {
    setLoading(true);
    getPerformance(); // Re-sync data with server
    setLoading(false);
  };

  useEffect(() => {
    setCumulativeScore(calculateAverageScore([parseInt(technicalScore), parseInt(artisticScore)]));
  }, [technicalScore, artisticScore]);

  return (
    <>
      <div className={styles.judge__feedback_container}>
        <div className={styles.judge__feedback_header}>
          <h2>Notes</h2>
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
                createFeedback();
                setEditMode(false);
              }}
            >
              Submit
            </Button>
          </span>
        </div>
        <div className={styles.judge__feedback_notes_wrapper}>
          <div className={styles.judge__feedback_notes_input}>
            <textarea
              onChange={e => {
                setNotes(e.target.value);
              }}
            >
              {notes}
            </textarea>
          </div>
        </div>
        <div className={styles.judge__feedback_audio_player_wrapper}>
          <FeedbackAudio
            audioUrl={null}
            edit={editMode}
            setRecordingChanged={setRecordingChanged}
            recording={recording}
            setRecording={setRecording}
            recordedBlob={recordedBlob}
            setRecordedBlob={setRecordedBlob}
          />
        </div>
        <div className={styles.judge__feedback_nominations}>
          <h2>Nominated for:</h2>
          <DropdownGrid
            placeholder="Select Award"
            options={normalAwardsOptions}
            values={normalAwards}
            setValues={setNormalAwards}
          />
        </div>
        <div className={styles.judge__feedback_awards}>
          <h2>Special Award:</h2>
          <Input
            placeholder="Special Award"
            value={specialAwardName}
            onChange={event => setSpecialAwardName(event.target.value)}
          />
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
        <ScoreCard title="Cumulative" score={cumulativeScore} variant="grey" />
      </div>
    </>
  );
}
