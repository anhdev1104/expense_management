import StatisticDate from './components/StatisticDate';
import StatisticTable from './components/StatisticTable';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import formatMonthUtils from '@/helpers/formatMonthUtils';
import { ITransaction } from '@/types/transaction.type';
import { getTransactionByDate } from '@/services/transactionService';

const StatisticPage = () => {
  const { control, watch } = useForm({
    mode: 'onChange',
  });
  const watchedValue = watch('date');
  const [statisticData, setStatisticData] = useState<ITransaction[]>([]);

  useEffect(() => {
    if (watchedValue) {
      const newDate = new Date(watchedValue);
      const selectDate = {
        month: formatMonthUtils(newDate.getMonth() + 1),
        year: newDate.getFullYear(),
      };
      (async () => {
        const data = await getTransactionByDate(selectDate.month, selectDate.year);
        data && setStatisticData(data);
      })();
    }
  }, [watchedValue]);

  useEffect(() => {
    const currentDate = {
      month: formatMonthUtils(new Date().getMonth() + 1),
      year: new Date().getFullYear(),
    };
    (async () => {
      const data = await getTransactionByDate(currentDate.month, currentDate.year);
      data && setStatisticData(data);
    })();
  }, []);

  return (
    <div className="mt-[120px] mb-20 w-[700px] px-10 mx-auto">
      <StatisticDate statisticData={statisticData} control={control} />
      <StatisticTable statisticData={statisticData} />
    </div>
  );
};

export default StatisticPage;
