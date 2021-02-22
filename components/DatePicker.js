import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import ReactDatePicker from 'react-datepicker'; // React DatePicker

import TextInput from '@components/Input'; // Input

function Calendar() {
  return <img src="/vectors/calendar.svg" />;
}

function ChevronLeft() {
  return <img src="/vectors/chevron-left.svg" />;
}

function ChevronRight() {
  return <img src="/vectors/chevron-right.svg" />;
}

export default function DatePicker({
  date = new Date(),
  setDate,
  calendarClassName = '',
  inputClassName = '',
  wrapperClassName = '',
  fullWidth,
}) {
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

DatePicker.propTypes = {
  calendarClassName: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  inputClassName: PropTypes.string,
  setDate: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string,
};
