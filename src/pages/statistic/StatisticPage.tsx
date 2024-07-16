import StatisticDate from './components/StatisticDate';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import StatisticTable from './components/StatisticTable';

const StatisticPage = () => {
  const defaultDate = dayjs();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(defaultDate);

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    console.log(newDate);
  };

  return (
    <div className="mt-[120px] mb-20 w-[700px] px-10 mx-auto">
      <StatisticDate selectedDate={selectedDate} onChange={handleDateChange} />
      <StatisticTable />
    </div>
  );
};

export default StatisticPage;
