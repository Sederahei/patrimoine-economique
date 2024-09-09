import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePickerComponent({ dateSelectionnee, surChangement }) {
  return (
    <DatePicker
      selected={dateSelectionnee}
      onChange={surChangement}
      dateFormat="yyyy-MM-dd"
      className="DatePicker"
    />
  );
}

export default DatePickerComponent;
