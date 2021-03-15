import React, { useState, useCallback } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes

import Button from '@components/Button'; // Button
import ChevronDown from '@assets/chevron-down.svg'; // Chevron Down Icon
import ChevronDownGrey from '@assets/chevron-down-grey.svg'; // Chevron Down Icon Grey
import Checkmark from '@assets/checkmark.svg'; // Checkmark Icon
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
        <div onClick={toggleOption(option)}>{selected && <img src={Checkmark} />}</div>
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
          <img src={open ? ChevronDown : ChevronDownGrey} />
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
            <span>Clear Filter</span>
          </Button>
        </div>
      )}
    </div>
  );
}

FilterDropdown.propTypes = {
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
  options: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setOptions: PropTypes.func.isRequired,
};

/**
 * Formats an iterable of objects into the required format for the `options` parameter for the FilterDropdown component
 * @param  {Object[]} iterable - An iterable of objects to format
 * @param  {string} {value - The object field to set as the value of each FilterDropdown option
 * @param  {string} label} - The object field to set as the label of each FilterDropdown option
 * @returns {Object} An object of options that can be passed to the FilterDropdown component as `options`
 */
export const formatFilterDropdownOptions = (iterable, { value: valueField, label: labelField }) => {
  const dropdownOptions = {};
  iterable.forEach(({ [valueField]: value, [labelField]: label }) => {
    dropdownOptions[value] = {
      label,
      selected: false,
    };
  });
  return dropdownOptions;
};
