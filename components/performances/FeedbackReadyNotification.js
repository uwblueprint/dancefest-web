/**
 * Not in use
 */
import Link from 'next/link'; // Link
import Button from '@components/Button'; // Button
import styles from '@styles/components/performances/FeedbackReadyNotification.module.scss'; // Component styles

export default function FeedbackReadyNotification() {
  return (
    <div className={styles.feedbackReadyNotification}>
      <span>All performances have received feedback.</span>
      <Link href="/feedback">
        <Button variant="warning">Share Feedback</Button>
      </Link>
    </div>
  );
}
