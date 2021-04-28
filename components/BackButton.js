import Link from 'next/link'; // Link

import Button from '@components/Button'; // Button
import BackArrow from '@assets/back-arrow.svg'; // Back arrow icon
import styles from '@styles/components/BackButton.module.scss'; // Component styles

export default function BackButton({ href, children }) {
  return (
    <Link href={href}>
      <Button className={styles.backButton} variant="outlined">
        <img src={BackArrow} />
        {children}
      </Button>
    </Link>
  );
}
