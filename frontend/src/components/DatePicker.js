import React from 'react'; // React
import PropTypes from 'prop-types'; // PropTypes
import ReactDatePicker from 'react-datepicker'; // React DatePicker

import Input from 'components/Input'; // Input
import { ReactComponent as Calendar } from 'assets/calendar.svg'; // Calendar Icon
import { ReactComponent as ChevronLeft } from 'assets/chevron-left.svg'; // Chevron Left Icon
import { ReactComponent as ChevronRight } from 'assets/chevron-right.svg'; // Chevron Right Icon
import 'styles/components/DatePicker.module.css'; // Component styles

export default function DatePicker({
  date = new Date(),
  setDate,
  calendarClassName = '',
  inputClassName = '',
  wrapperClassName = '',
}) {
  const DatePickerInput = ({ onClick, value }) => (
    <Input
      className={inputClassName}
      icon={Calendar}
      onIconClick={onClick}
      onClick={onClick}
      value={value}
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
