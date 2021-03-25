import React from 'react';
import Dropdown from '@components/Dropdown';
import styles from '@styles/components/DropdownGrid.module.scss';

/**
 * @param {Object[]} options - The options to render in each dropdown
 * @param {Object[]} values - The selected values
 * @param setValues - A function that sets the values
 */
export default function DropdownGrid({ placeholder, options, values = [], setValues = () => {} }) {
  const onSelectValue = (value, i) => {
    const newValues = [...values];
    newValues[i] = value;
    setValues(newValues);
  };

  const onAddAward = () => {
    setValues([...values, null]);
  };

  return (
    <div className={styles.dropdownGrid}>
      {values.map((value, i) => (
        <Dropdown
          key={i}
          placeholder={placeholder}
          options={options}
          selected={value}
          onChange={value => {
            onSelectValue(value, i);
          }}
        />
      ))}
      <button className={styles.button} onClick={onAddAward}>{`+ Add Award`}</button>
    </div>
  );
}
