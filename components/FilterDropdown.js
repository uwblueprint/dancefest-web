import React, { useState, useCallback, useEffect } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes

import Button from '@components/Button'; // Button
import ChevronDown from '@assets/chevron-down.svg'; // Chevron Down Icon
import ChevronDownGrey from '@assets/chevron-down-grey.svg'; // Chevron Down Icon Grey
import Checkmark from '@assets/checkmark.svg'; // Checkmark Icon
import styles from '@styles/components/FilterDropdown.module.scss'; // Component styles

export default function FilterDropdown({
  buttonText = '',
  options,
  setOptions,
  onSubmit = () => {},
  // updateFilters,
  // field,
}) {
  const [open, setOpen] = useState(false);
  const [lastUpdatedOption, setLastUpdatedOption] = useState({});

  useEffect(() => {
    console.log('Options to start off with');
    console.log(options);
  }, []);

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

  useEffect(() => {
    console.log('Something changed inside the dropdown');
    console.log(options);
    // if (!lastUpdatedOption.selected) {
    //   updateFilters(filters => [
    //     ...filters,
    //     {
    //       id: field,
    //       value: lastUpdatedOption.label,
    //     },
    //   ]);
    // } else {
    //   console.log('Calling else');
    //   updateFilters(oldFilters => {
    //     console.log(oldFilters);
    //     return oldFilters.filter(item => item.value != lastUpdatedOption.label);
    //   });
    // }
  }, [options]);

  useEffect(() => {
    console.log('Text changed');
    console.log(lastUpdatedOption);
  }, [lastUpdatedOption]);

  const toggleOption = useCallback(
    option => () => {
      setLastUpdatedOption({ label: options[option].label, selected: options[option].selected });
      setOptions(options => ({
        ...options,
        [option]: {
          ...options[option],
          selected: !options[option].selected,
        },
      }));
    },
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
