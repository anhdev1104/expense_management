import { getStatistic } from '@/redux/slices/statisticSlice';
import StatisticDate from './components/StatisticDate';
import StatisticTable from './components/StatisticTable';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RootState, useAppDispatch } from '@/redux/store';
import formatMonthUtils from '@/helpers/formatMonthUtils';
import { useSelector } from 'react-redux';

const StatisticPage = () => {
  const { control, watch } = useForm({
    mode: 'onChange',
  });
  const watchedValue = watch('date');

  const dispatch = useAppDispatch();
  const statisticData = useSelector((state: RootState) => state.statistic.data);

  useEffect(() => {
    if (watchedValue) {
      const newDate = new Date(watchedValue);
      const selectDate = {
        month: formatMonthUtils(newDate.getMonth() + 1),
        year: newDate.getFullYear(),
      };
      dispatch(getStatistic(selectDate));
    }
  }, [dispatch, watchedValue]);

  useEffect(() => {
    const currentDate = {
      month: formatMonthUtils(new Date().getMonth() + 1),
      year: new Date().getFullYear(),
    };
    dispatch(getStatistic(currentDate));
  }, [dispatch]);

  return (
    <div className="mt-[120px] mb-20 w-[700px] px-10 mx-auto">
      <StatisticDate statisticData={statisticData} control={control} />
      <StatisticTable />
    </div>
  );
};

export default StatisticPage;
