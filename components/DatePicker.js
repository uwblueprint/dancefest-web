import PropTypes from 'prop-types'; // PropTypes
import TextInput from '@components/Input'; // Input
import ReactDatePicker from 'react-datepicker'; // React DatePicker

/**
 * DatePicker
 * @param {Date} date default selected date
 * @param {Function} setDate update handler
 * @param {String} calendarClassName optional
 * @param {String} inputClassName optional
 * @param {String} wrapperClassName optional
 * @param {Boolean} fullWidth if takes up 100% of width of container
 * @returns {HTMLElement} DatePicker component
 */
function DatePicker({
  date = new Date(),
  setDate,
  calendarClassName = '',
  inputClassName = '',
  wrapperClassName = '',
  fullWidth,
}) {
  // DatePicker Custom Input handler
  const DatePickerInput = ({ onClick, value }) => (
    <TextInput
      className={inputClassName}
      icon={Calendar}
      onIconClick={onClick}
      onClick={onClick}
      value={value}
      fullWidth={fullWidth}
    />
  );

  return (
    // Date Picker with Custom Input handler
    <ReactDatePicker
      customInput={<DatePickerInput />}
      calendarClassName={calendarClassName}
      wrapperClassName={wrapperClassName} // Wraps input component
      nextMonthButtonLabel={<ChevronRight />}
      previousMonthButtonLabel={<ChevronLeft />}
      selected={date}
      onChange={date => setDate(date)}
      useWeekdaysShort
    />
  );
}

// DatePicker PropTypes
DatePicker.propTypes = {
  calendarClassName: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  inputClassName: PropTypes.string,
  setDate: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string,
};

/**
 * Calendar icon
 * @returns {HTMLElement} image
 */
function Calendar() {
  return <img src="/vectors/calendar.svg" />;
}

/**
 * Chevron Left icon
 * @returns {HTMLElement} image
 */
function ChevronLeft() {
  return <img src="/vectors/chevron-left.svg" />;
}

/**
 * Chevron Right icon
 * @returns {HTMLElement} image
 */
function ChevronRight() {
  return <img src="/vectors/chevron-right.svg" />;
}

// Export datepicker
export { DatePicker };
