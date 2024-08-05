import { useMemo, useState } from 'react';
import Chart, { CategoryScale } from 'chart.js/auto';
import { PieChart } from '@/components/charts';
import { TransactionType } from '@/constants/transaction';
import formatMoneyUtils from '@/helpers/formatMoneyUtils';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

Chart.register(CategoryScale);

const StatisticTable = () => {
  const statisticData = useSelector((state: RootState) => state.statistic.data);
  const dataExpense = useMemo(
    () => statisticData.filter(item => item.type === TransactionType.EXPENSE),
    [statisticData]
  );

  const dataIncome = useMemo(() => statisticData.filter(item => item.type === TransactionType.INCOME), [statisticData]);

  const [tabActive, setTabActive] = useState<string>('expense');

  const chartSpendData = useMemo(
    () => ({
      labels: dataExpense.map(data => data.category.name),
      datasets: [
        {
          label: 'Chi',
          data: dataExpense.map(data => data.money),
          backgroundColor: [
            '#f3ba2f',
            '#2a71d0',
            '#f55fa0',
            '#c0c0c0',
            '#9c4422',
            '#368734',
            '#18896d',
            '#4f2f99',
            '#c0a822',
          ],
          borderColor: 'gray',
          borderWidth: 1,
        },
      ],
    }),
    [dataExpense]
  );

  const chartIncomeData = useMemo(
    () => ({
      labels: dataIncome.map(data => data.category.name),
      datasets: [
        {
          label: 'Thu',
          data: dataIncome.map(data => data.money),
          backgroundColor: ['#2dd340', '#2ad0cd'],
          borderColor: 'gray',
          borderWidth: 1,
        },
      ],
    }),
    [dataIncome]
  );

  const resultStatistic = tabActive === 'expense' ? dataExpense : dataIncome;
  const chartData = tabActive === 'expense' ? chartSpendData : chartIncomeData;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex-1 cursor-pointer" onClick={() => setTabActive('expense')}>
          <span
            className={`border-b-2 ${
              tabActive === 'expense' ? 'border-primary text-primary' : 'text-gray-400'
            } text-center py-2 inline-block w-full font-medium`}
          >
            Chi tiêu
          </span>
        </div>
        <div data-id={2} className="flex-1 cursor-pointer" onClick={() => setTabActive('income')}>
          <span
            className={`border-b-2 ${
              tabActive === 'income' ? 'border-primary text-primary' : 'text-gray-400'
            } text-center py-2 inline-block w-full font-medium`}
          >
            Thu nhập
          </span>
        </div>
      </div>
      <div className="mt-4">
        {chartData.labels.length <= 0 ? (
          <div className="p-5 rounded-md bg-primary text-white text-center font-bold my-10">Chưa có dữ liệu</div>
        ) : (
          <PieChart tab={tabActive} chartData={chartData} />
        )}
      </div>

      <div className="border-t border-gray-300 mt-5">
        {resultStatistic.map(item => (
          <div
            className="flex justify-between items-center py-2 px-5 border border-t-transparent border-borderColor"
            key={item._id}
          >
            <div className="flex items-center gap-5">
              <img src={`/icon/${item.category.icon}`} alt={`icon ${item.category}`} className="w-10" />
              <span className="font-medium">{item.category.name}</span>
            </div>
            <span className="font-medium">{formatMoneyUtils(item.money) || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticTable;
