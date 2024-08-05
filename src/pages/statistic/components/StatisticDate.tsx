import DatePickerCustom from '@/components/date/DatePickerCustom';
import Field from '@/components/field';
import { TransactionType } from '@/constants/transaction';
import formatMoneyUtils from '@/helpers/formatMoneyUtils';
import { ITransaction } from '@/types/transaction.type';
import { useEffect, useMemo, useState } from 'react';

interface IStatistic {
  statisticData: ITransaction[];
  control: any;
}

const StatisticDate = ({ statisticData, control }: IStatistic) => {
  const [totalMoneyExpense, setTotalMoneyExpense] = useState(0);
  const [totalMoneyIncome, setTotalMoneyIncome] = useState(0);

  const dataExpense = useMemo(
    () => statisticData.filter(item => item.type === TransactionType.EXPENSE),
    [statisticData]
  );

  const dataIncome = useMemo(() => statisticData.filter(item => item.type === TransactionType.INCOME), [statisticData]);

  useEffect(() => {
    const totalExpense = dataExpense.reduce((acc, curr) => acc + curr.money, 0);
    const totalIncome = dataIncome.reduce((acc, curr) => acc + curr.money, 0);

    setTotalMoneyExpense(totalExpense);
    setTotalMoneyIncome(totalIncome);
  }, [dataExpense, dataIncome]);

  return (
    <>
      <Field>
        <DatePickerCustom control={control} isDefaultValue isView />
      </Field>
      <Field>
        <div className="grid grid-cols-2 gap-7">
          <div className="flex border border-borderColor p-3 items-center justify-between rounded-md">
            <span className="text-sm">Chi tiêu</span>
            <span className="text-red-500 font-bold">-{formatMoneyUtils(totalMoneyExpense) || 0}</span>
          </div>
          <div className="flex border border-borderColor p-3 items-center justify-between rounded-md">
            <span className="text-sm">Thu nhập</span>
            <span className="text-green-500 font-bold">+{formatMoneyUtils(totalMoneyIncome) || 0}</span>
          </div>
        </div>
      </Field>
      <Field>
        <div className="flex border border-borderColor p-3 items-center justify-between rounded-md">
          <span>Thu chi</span>
          <span className="text-xl font-bold">{formatMoneyUtils(totalMoneyIncome - totalMoneyExpense) || 0}</span>
        </div>
      </Field>
    </>
  );
};

export default StatisticDate;
