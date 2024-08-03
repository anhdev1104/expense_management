import DatePickerCustom from '@/components/date/DatePickerCustom';
import Field from '@/components/field';
import formatMoneyUtils from '@/helpers/formatMoneyUtils';
import { getTransaction } from '@/services/transactionService';
import { ITransaction } from '@/types/transaction.type';
import { useEffect, useState } from 'react';

const StatisticDate = ({ control }: { control: any }) => {
  const [statisticExpense, setStatisticExpense] = useState<ITransaction[]>([]);
  const [statisticIncome, setStatisticIncome] = useState<ITransaction[]>([]);
  const [totalMoneyExpense, setTotalMoneyExpense] = useState(0);
  const [totalMoneyIncome, setTotalMoneyIncome] = useState(0);

  useEffect(() => {
    (async () => {
      const dataExpense = await getTransaction('expense');
      dataExpense && setStatisticExpense(dataExpense);

      const dataIncome = await getTransaction('income');
      dataIncome && setStatisticIncome(dataIncome);
    })();
  }, []);

  useEffect(() => {
    const total = statisticExpense.reduce((acc, curr) => acc + curr.money, 0);
    setTotalMoneyExpense(total);

    const totalIncome = statisticIncome.reduce((acc, curr) => acc + curr.money, 0);
    setTotalMoneyIncome(totalIncome);
  }, [statisticExpense, statisticIncome]);

  return (
    <>
      <Field>
        <DatePickerCustom control={control} isDefaultValue />
      </Field>
      <Field>
        <div className="grid grid-cols-2 gap-7">
          <div className="flex border border-borderColor p-3 items-center justify-between rounded-md">
            <span className="text-sm">Chi tiêu</span>
            <span className="text-red-500 font-bold">-{formatMoneyUtils(totalMoneyExpense)}</span>
          </div>
          <div className="flex border border-borderColor p-3 items-center justify-between rounded-md">
            <span className="text-sm">Thu nhập</span>
            <span className="text-green-500 font-bold">+{formatMoneyUtils(totalMoneyIncome)}</span>
          </div>
        </div>
      </Field>
      <Field>
        <div className="flex border border-borderColor p-3 items-center justify-between rounded-md">
          <span>Thu chi</span>
          <span className="text-xl font-bold">+{formatMoneyUtils(totalMoneyExpense + totalMoneyIncome)}</span>
        </div>
      </Field>
    </>
  );
};

export default StatisticDate;
