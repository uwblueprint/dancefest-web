import Button from '@components/Button'; // Button
import AudioPlayer from '@components/AudioPlayer'; // Audio player
import AudioRecorder from '@components/AudioRecorder'; // Audio recorder
import MicrophoneIcon from '@assets/record.svg'; // Microphone icon
import styles from '@styles/components/performance-details/FeedbackAudio.module.scss'; // Component styles

export default function FeedbackAudio({
  audioUrl,
  edit = false,
  setRecordingChanged,
  recording,
  setRecording,
  recordedBlob,
  setRecordedBlob,
}) {
  const onStopRecording = blob => {
    setRecordingChanged(true);
    setRecording(false);
    setRecordedBlob(blob);
  };

  return edit ? (
    <div>
      <div className={`${styles.audioRecorder__wrapper} ${recording ? undefined : styles.hidden}`}>
        <AudioRecorder
          className={`${styles.audioRecorder}`}
          recording={recording}
          onStopRecording={onStopRecording}
        />
      </div>
      {recording ? (
        <Button
          className={styles.stopButton}
          variant="outlined"
          onClick={() => setRecording(false)}
        >
          Stop
        </Button>
      ) : recordedBlob || audioUrl ? (
        <>
          <AudioPlayer audioUrl={recordedBlob ? recordedBlob.blobURL : audioUrl} />
          <div className={styles.rerecordButton__wrapper}>
            <button
              onClick={() => {
                setRecordedBlob(null);
                setRecording(true);
              }}
            >
              <img src={MicrophoneIcon} />
              Rerecord
            </button>
          </div>
        </>
      ) : (
        <Button
          className={styles.recordButton}
          variant="outlined"
          onClick={() => setRecording(true)}
        >
          <img src={MicrophoneIcon} />
          Record Notes
        </Button>
      )}
    </div>
  ) : (
    <AudioPlayer audioUrl={audioUrl} />
  );
}
