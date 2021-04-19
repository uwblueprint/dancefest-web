import Checkmark from '@assets/checkmark.svg'; // Checkmark icon
import styles from '@styles/components/Checkbox.module.scss'; // Component styles

export default function Checkbox({ checked, onToggle }) {
  const handleToggle = () => {
    console.log('handle');
    onToggle(checked);
  };

  return (
    <div className={`${styles.checkbox} ${checked ? styles.selected : undefined}`}>
      <div onClick={handleToggle}>{checked && <img src={Checkmark} />}</div>
    </div>
  );
}
