import Link from 'next/link'; // Dynamic routing
import useLocalStorage from '@utils/useLocalStorage'; // Local storage hooks
import styles from '@styles/pages/Verify.module.scss'; // Component styles

export default function Verify() {
  // Collect email stored in localStorage
  const [localStorageEmail] = useLocalStorage('dancefest-email-redirect', '');

  return (
    // Verification email page
    <div className={styles.page__verify}>
      {/* Redirect to /login */}
      <div className={styles.page__verify_redirect}>
        <Link href="/login">
          <a>
            <img src="/vectors/back-arrow.svg" alt="Back" />
            Back to Login
          </a>
        </Link>
      </div>

      {/* Verification page content */}
      <div className={styles.page__verify_request}>
        <h3>
          An email has been sent to {localStorageEmail}! There should be a Dancefest link in your
          inbox to log in.
        </h3>
        <img src="/vectors/verify-email.svg" alt="Verify email" />
      </div>
    </div>
  );
}
