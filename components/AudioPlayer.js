import styles from '@styles/components/AudioPlayer.module.scss';

export default function AudioPlayer({ audioUrl }) {
  return audioUrl ? (
    <audio className={styles.audioPlayer} controls controlsList="nodownload">
      <source src={audioUrl} />
    </audio>
  ) : (
    <p className={styles.noAudioFileMessage}>No audio file</p>
  );
}
