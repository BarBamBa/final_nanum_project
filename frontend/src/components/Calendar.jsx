import { useState } from 'react'
import DatePicker, { registerLocale } from'react-datepicker'
import ko from 'date-fns/locale/ko';
import '/src/scss/DatePicker.scss'

registerLocale('ko', ko);

function Calendar({ params, setParams }) {

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      locale="ko"
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
    />
  );
}

export default Calendar