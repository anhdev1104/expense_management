import StatisticDate from './components/StatisticDate';
import StatisticTable from './components/StatisticTable';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import dayjs, { Dayjs } from 'dayjs';
// import { useState } from 'react';

const StatisticPage = () => {
  // const defaultDate = dayjs();
  // const [selectedDate, setSelectedDate] = useState<Dayjs | null>(defaultDate);

  // const handleDateChange = (newDate: Dayjs | null) => {
  //   setSelectedDate(newDate);
  //   console.log(newDate);
  // };

  const { control, watch } = useForm({
    mode: 'onChange',
  });
  const watchedValue = watch('date');

  useEffect(() => {
    if (watchedValue) {
      console.log('Giá trị mới của date: ', watchedValue);
      const newDate = new Date(watchedValue).toLocaleDateString('vi-VI');
      console.log('🚀 ~ useEffect ~ newDate:', newDate);
    }
  }, [watchedValue]);

  return (
    <div className="mt-[120px] mb-20 w-[700px] px-10 mx-auto">
      <StatisticDate control={control} />
      <StatisticTable />
    </div>
  );
};

export default StatisticPage;
