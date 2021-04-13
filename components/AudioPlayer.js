import styles from '@styles/components/AudioPlayer.module.scss';

export default function AudioPlayer({ audioUrl }) {
  return audioUrl ? (
    <audio
      className={styles.audioPlayer}
      src={audioUrl}
      type="audio/mp3"
      controls
      controlsList="nodownload"
    />
  ) : (
    <p className={styles.noAudioFileMessage}>No audio file</p>
  );
}
