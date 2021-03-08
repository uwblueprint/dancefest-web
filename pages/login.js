import { useState } from 'react'; // State management
import Layout from '@components/Layout'; // Layout wrapper
import TextInput from '@components/Input'; // Text Input field
import Button from '@components/Button';
import styles from '@styles/pages/Login.module.scss'; // Component styles
import { getSession, signIn } from 'next-auth/client'; // Session management
import LoginDancers from '@assets/login-dancers.svg';
import useLocalStorage from '@utils/useLocalStorage'; // Local storage hooks

export default function Login() {
  const [email, setEmail] = useState(''); // Store user inputted email
  const [, setLocalStorageEmail] = useLocalStorage('dancefest-email-redirect', ''); // Store email in local storage

  /**
   * Process user sign in with inputted email
   */
  const signInWithEmail = () => {
    // Update email in local storage
    setLocalStorageEmail(email);
    // Call Next-Auth sign in, passing email state
    signIn('email', { email: email });
  };

  return (
    <Layout>
      <div className={styles.page__login}>
        <div className={styles.page__login_row}>
          {/* Dancefest logo */}
          <div className={styles.page__login_col}>
            <img src="/vectors/logo.svg" alt="Dancefest logo" />

            {/* Login card */}
            <div className={styles.page__login_card}>
              {/* Login card: text */}
              <h3>PLEASE LOG IN WITH YOUR EMAIL</h3>
              {/* Login card: input */}
              <TextInput
                type="text"
                placeholder="email@address.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                // Process sign in if user presses enter after email input
                onEnter={signInWithEmail}
              />

              {/* Login card: button */}
              <Button onClick={signInWithEmail}>Log In</Button>
            </div>
          </div>
          <img src={LoginDancers} className={styles.page__login_illustration} />
        </div>
      </div>
    </Layout>
  );
}

// Run: server side
export async function getServerSideProps(context) {
  // Collect session
  const session = await getSession(context);

  // If session exists (user authenticated)
  if (session) {
    return {
      // Always redirect "/login"
      redirect: {
        // To events page
        destination: '/',
        permanent: false,
      },
    };
  }

  // Else, return standard page
  return {
    props: {},
  };
}
