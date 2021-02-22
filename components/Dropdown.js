import PropTypes from 'prop-types'; // PropTypes
import Select, { components } from 'react-select'; // React Select
import styles from '@styles/components/Dropdown.module.scss'; // Component styles (local)

/**
 * Dropdown
 * @param {String} className optional classes to pass
 * @param {String} wrapperClassName optional wrapper classes to pass
 * @param {Boolean} isDisabled dropdown status
 * @param {Object} options custom options
 * @param {String} placeholder text
 * @param {Number} selected currently selected option
 * @param {Fucntion} onChange handler
 * @returns {HTMLElement} of dropdown
 */
function Dropdown({
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

// Dropdown PropTypes
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
 * Dropdown Indicator component
 * @param {Object} props to pass
 * @returns {HTMLElement} of indicator
 */
const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <img src="/vectors/chevron-down-grey.svg" />
  </components.DropdownIndicator>
);

/**
 * Dropdown Option
 * @param {Object} props to pass
 * @returns {HTMLElement} individual option
 */
const Option = props => <components.Option className={styles.dropdown__option} {...props} />;

// Export Dropdown
export { Dropdown };
