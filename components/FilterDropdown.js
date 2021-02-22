import PropTypes from 'prop-types'; // PropTypes
import { Button } from '@components/Button'; // Button
import { useState, useCallback } from 'react'; // State management
import styles from '@styles/components/FilterDropdown.module.scss'; // Component styles

export default function FilterDropdown({
  buttonText = '',
  options = {},
  setOptions,
  onSubmit = () => {},
}) {
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    if (open) {
      onSubmit();
    }
    setOpen(!open);
  };

  const handleCloseOptions = () => {
    onSubmit();
    setOpen(false);
  };

  const handleClearFilter = () => {
    const newOptions = {};
    Object.keys(options).map(option => {
      newOptions[option] = {
        ...options[option],
        selected: false,
      };
    });
    setOptions(newOptions);
  };

  const toggleOption = useCallback(
    option => () =>
      setOptions(options => ({
        ...options,
        [option]: {
          ...options[option],
          selected: !options[option].selected,
        },
      })),
    []
  );

  // option parameter is the key of the option to render
  const Option = ({ option }) => {
    const {
      [option]: { selected },
    } = options;
    return (
      <div
        className={`${styles.filterDropdown__option} ${
          selected && styles.filterDropdown__optionSelected
        }`}
      >
        <div onClick={toggleOption(option)}>{selected && <img src="/vectors/checkmark.svg" />}</div>
        <div>{options[option].label}</div>
      </div>
    );
  };

  return (
    <div className={styles.filterDropdown__wrapper}>
      {open && <div className={styles.filterDropdown__overlay} onClick={handleCloseOptions} />}
      <button
        className={`${styles.filterDropdown__button} ${
          open && `${styles.filterDropdown__buttonOpen} ${styles.bringToFront}`
        }`}
        onClick={handleButtonClick}
      >
        {buttonText}
        <span className={styles.filterDropdown__button_iconWrapper}>
          <img src={open ? '/vectors/chevron-down.svg' : '/vectors/chevron-down-grey.svg'} />
        </span>
      </button>
      {open && (
        <div className={`${styles.filterDropdown__options__container} ${styles.bringToFront}`}>
          <div className={styles.filterDropdown__options}>
            {Object.keys(options).map((option, i) => (
              <Option key={i} option={option} />
            ))}
          </div>
          <Button
            className={styles.filterDropdown__clearFilterButton}
            variant="contained"
            onClick={handleClearFilter}
          >
            Clear Filter
          </Button>
        </div>
      )}
    </div>
  );
}

FilterDropdown.propTypes = {
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
  options: PropTypes.object.isRequired,
  setOptions: PropTypes.func.isRequired,
};
