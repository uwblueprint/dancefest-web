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
  onChange = () => {},
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
