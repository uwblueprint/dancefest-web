import React from 'react'; // React
import { Link } from 'react-router-dom'; // Dynamic routing
import styles from 'styles/components/Layout.module.css'; // Component styles

// Layout wrapper
export default function Layout({ children }) {
  return (
    <div>
      {/* Layout: Header */}
      <Header />

      {/* Layout: Content */}
      <div className={styles.layout__content}>{children}</div>
    </div>
  );
}

// Header
function Header() {
  return (
    <div className={styles.layout__header}>
      {/* Right aligned logo */}
      <div className={styles.layout__header_logo}>
        <Link to="/">
          <h1>DANCEFEST</h1>
        </Link>
      </div>

      {/* Left aligned menu */}
      <div className={styles.layout__header_menu}>
        <ul>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/">Log Out</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
