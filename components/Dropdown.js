import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes

import Select, { components } from 'react-select'; // React Select
import ChevronDownGrey from '@assets/chevron-down-grey.svg'; // Chevron Down Icon
import styles from '@styles/components/Dropdown.module.scss'; // Component styles (local)

const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <img src={ChevronDownGrey} />
  </components.DropdownIndicator>
);

const Option = props => <components.Option className={styles.dropdown__option} {...props} />;

export default function Dropdown({
  className = '',
  wrapperClassName = '',
  isDisabled = false,
  options,
  placeholder = 'placeholder',
  selected,
  onChange = () => {}, // selectedValue => setSelectedValue(selectedValue.value)
}) {
  return (
    <div className={`${styles.dropdown__wrapper} ${wrapperClassName}`}>
      <Select
        components={{
          DropdownIndicator,
          IndicatorSeparator: null,
          Option,
        }}
        className={className}
        classNamePrefix="dropdown"
        defaultValue={selected}
        isDisabled={isDisabled}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#f5f6f7',
          },
        })}
      />
    </div>
  );
}

Dropdown.propTypes = {
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    }).isRequired
  ).isRequired,
  placeholder: PropTypes.string,
  selected: PropTypes.any.required,
  setSelected: PropTypes.func.required,
  wrapperClassName: PropTypes.string,
};

/**
 * Formats an iterable of objects into the required format for the `options` parameter for the Dropdown component
 * @param  {Object[]} iterable - An iterable of objects to format
 * @param  {string} {value - The object field to set as the value of each Dropdown option
 * @param  {string} label} - The object field to set as the label of each Dropdown option
 * @returns {Object[]} A list of options that can be passed to the Dropdown component as `options`
 */
export const formatDropdownOptions = (iterable, { value, label }) => {
  return iterable.map(x => ({
    value: x[value],
    label: x[label],
  }));
};
