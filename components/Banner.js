import InfoIcon from '@assets/info.svg'; // Info icon
import styles from '@styles/components/Banner.module.scss'; // Component styles

export default function Banner({ visible = true, children }) {
  // TODO: Change visible to false
  return visible ? (
    <div className={styles.banner}>
      <img src={InfoIcon} />
      <span>{children}</span>
    </div>
  ) : null;
}
