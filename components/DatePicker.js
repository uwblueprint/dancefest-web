import React, { useRef } from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import ReactDatePicker from 'react-datepicker'; // React DatePicker

import TextInput from '@components/Input'; // Input
import CalendarSVG from '@assets/calendar.svg'; // Calendar Icon
import ChevronLeftSVG from '@assets/chevron-left.svg'; // Chevron Left Icon
import ChevronRightSVG from '@assets/chevron-right.svg'; // Chevron Right Icon

function Calendar() {
  return <img src={CalendarSVG} />;
}

function ChevronLeft() {
  return <img src={ChevronLeftSVG} />;
}

function ChevronRight() {
  return <img src={ChevronRightSVG} />;
}

export default function DatePicker({
  date = new Date(),
  setDate,
  calendarClassName = '',
  inputClassName = '',
  wrapperClassName = '',
  fullWidth,
}) {
  const datePickerInputRef = useRef(null);

  const DatePickerInput = ({ onClick, value }) => (
    <TextInput
      className={inputClassName}
      icon={Calendar}
      onIconClick={onClick}
      onClick={onClick}
      value={value}
      fullWidth={fullWidth}
      inputRef={datePickerInputRef}
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
      onCalendarOpen={() => {
        if (datePickerInputRef && datePickerInputRef.current) {
          datePickerInputRef.current.focus();
        }
      }}
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
