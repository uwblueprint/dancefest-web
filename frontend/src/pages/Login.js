import React from 'react'; // React
import welcome from 'assets/welcome.svg';
import logo from 'assets/dancefest.svg';

import styles from 'styles/components/Login.module.css';

// Page: Welcome
export default function Welcome() {
  return (
    <div className={styles.row}>
      <div className={styles.logo__div}>
        <img src={logo} className={styles.logo} />
        {/* <form> */}
        <label style={{ marginTop: '60px' }}>Email</label>
        <input type="text" placeholder="example@email.org" />

        <label style={{ marginTop: '16px' }}>Password</label>
        <input type="password" />

        <span>
          <input type="checkbox" />
          <label> Remember Me </label>
        </span>

        <button>Log In</button>
        {/* </form> */}
      </div>
      <div className={styles.welcome_illustration__div}>
        <img src={welcome} className={styles.welcome_illustration} />
      </div>
    </div>
  );
}
