import Checkmark from '@assets/checkmark.svg'; // Checkmark icon
import styles from '@styles/components/Checkbox.module.scss'; // Component styles

export default function Checkbox({ checked, disabled = false, onToggle }) {
  const handleToggle = () => {
    onToggle(checked);
  };

  return (
    <div
      className={`${styles.checkbox} ${checked ? styles.selected : ''} ${
        disabled ? styles.disabled : ''
      }`}
    >
      <div onClick={disabled ? () => {} : handleToggle}>{checked && <img src={Checkmark} />}</div>
    </div>
  );
}
