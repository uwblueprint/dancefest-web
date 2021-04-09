import Checkmark from '@assets/checkmark.svg'; // Checkmark icon
import styles from '@styles/components/Checkbox.module.scss'; // Component styles

export default function Checkbox({ checked, onToggle = () => {} }) {
  return (
    <div className={`${styles.checkbox} ${checked ? styles.selected : undefined}`}>
      <div onClick={onToggle}>{checked && <img src={Checkmark} />}</div>
    </div>
  );
}
