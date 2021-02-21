import Link from 'next/link'; // Dynamic routing
import Head from 'next/head'; // HTML head handling
import { signOut, useSession } from 'next-auth/client'; // Authentication
import styles from '@styles/components/Layout.module.scss'; // Component styles

export default function Layout({ children }) {
  return (
    <div>
      {/* Layout: Meta */}
      <Meta />

      {/* Layout: Header */}
      <Header />

      {/* Layout: Content */}
      <div className={styles.layout__content}>
        <div className={styles.layout__content_sizer}>{children}</div>
      </div>

      {/* Layout: Footer */}
      <Footer />
    </div>
  );
}

// Meta
function Meta() {
  return (
    // HTML Head
    <Head>
      {/* Primary meta tags */}
      <title>Dancefest Adjudication Portal</title>
      <meta name="title" content="Dancefest Adjudication Portal" />
      <meta name="description" content="Explore and assess performances at Dancefest!" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://dancefest.dev/" />
      <meta property="og:title" content="Dancefest Adjudication Portal" />
      <meta property="og:description" content="Explore and assess performances at Dancefest!" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://dancefest.dev/" />
      <meta property="twitter:title" content="Dancefest Adjudication Portal" />
      <meta
        property="twitter:description"
        content="Explore and assess performances at Dancefest!"
      />

      {/* Imports: Google fonts */}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}

// Header
function Header() {
  // Collect auth status
  const [session] = useSession();

  return (
    <div className={styles.layout__header}>
      {/* Header: Left logo */}
      <div className={styles.layout__header_logo}>
        <Link href="/">
          <a>
            <h1>DANCEFEST</h1>
          </a>
        </Link>
      </div>

      {/* Header: Right menu */}
      <div className={styles.layout__header_menu}>
        <ul>
          {session ? (
            // If user is authenticated, display links
            <>
              <li>
                <Link href="/">
                  <a>Events</a>
                </Link>
              </li>
              <li>
                <Link href="/settings">
                  <a>Settings</a>
                </Link>
              </li>
              <li>
                <button onClick={() => signOut()}>Log Out</button>
              </li>
            </>
          ) : (
            // Else, display login button
            <li>
              <Link href="/login">
                <a>Log In</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

// Footer
function Footer() {
  return (
    // Standard footer content
    <div className={styles.layout__footer}>
      <p>&copy; 2020 Dancefest Adjudication Portal. v0.0.1.</p>
      <p>
        A project by{' '}
        <a
          // Open-in-new-tab link to UWBlueprint
          href="https://uwblueprint.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          UWBlueprint
        </a>
        .
      </p>
    </div>
  );
}
