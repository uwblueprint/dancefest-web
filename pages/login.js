import { useState } from "react"; // State management
import Layout from "@components/Layout"; // Layout wrapper
import { TextInput } from "@components/Inputs"; // Text Input field
import { FilledButton } from "@components/Buttons"; // FilledButton
import styles from "@styles/pages/Login.module.scss"; // Component styles
import { getSession, signIn } from "next-auth/client"; // Session management

export default function Login() {
  const [email, setEmail] = useState(""); // Store user inputted email

  /**
   * Process user sign in with inputted email
   */
  const signInWithEmail = () => {
    // Call Next-Auth sign in, passing email state
    signIn("email", { email: email });
  };

  return (
    <Layout>
      <div className={styles.page__login}>
        {/* Dancefest logo */}
        <img src="/vectors/logo.svg" alt="Dancefest logo" />

        {/* Login card */}
        <div className={styles.page__login_card}>
          {/* Login card: text */}
          <h3>Log in to your account</h3>
          <p>
            Please enter your email address to sign up or login to the Dancefest
            Adjudication portal.
          </p>

          {/* Login card: input */}
          <TextInput
            type="text"
            placeholder="email@address.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            // Process sign in if user presses enter after email input
            onEnter={signInWithEmail}
          />

          {/* Login card: button */}
          <FilledButton fullWidth onClick={signInWithEmail}>
            Sign In
          </FilledButton>
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
        destination: "/",
        permanent: false,
      },
    };
  }

  // Else, return standard page
  return {
    props: {},
  };
}
