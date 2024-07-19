import PieChart from '@/components/charts/PieChart';
import React, { useState } from 'react';
import Chart, { CategoryScale } from 'chart.js/auto';
const Data = [
  {
    id: 1,
    price: 600000,
    spendName: 'Quần áo',
    icon: 'clothes-icon.svg',
  },
  {
    id: 2,
    price: 500000,
    spendName: 'Ăn uống',
    icon: 'food-icon.svg',
  },
];
const Data2 = [
  {
    id: 1,
    price: 600000,
    spendName: 'Thu nhập phụ',
    icon: 'money-icon.svg',
  },
  {
    id: 2,
    price: 5000000,
    spendName: 'Đầu tư',
    icon: 'coin-icon.svg',
  },
];

Chart.register(CategoryScale);

const StatisticTable = () => {
  const [tabActive, setTabActive] = useState<number>(1);
  const [chartSpendData, setChartData] = useState({
    labels: Data.map(data => data.spendName),
    datasets: [
      {
        label: 'Chi',
        data: Data.map(data => data.price),
        backgroundColor: ['#f3ba2f', '#2a71d0'],
        borderColor: 'gray',
        borderWidth: 1,
      },
    ],
  });
  const [chartIncomeData, setChartIncomeData] = useState({
    labels: Data2.map(data => data.spendName),
    datasets: [
      {
        label: 'Chi',
        data: Data2.map(data => data.price),
        backgroundColor: ['#2dd340', '#2ad0cd'],
        borderColor: 'gray',
        borderWidth: 1,
      },
    ],
  });

  const fakeData = tabActive === 1 ? Data : Data2;

  const handleTabActive = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = Number(e.currentTarget.dataset.id);
    setTabActive(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div data-id={1} className="flex-1 cursor-pointer" onClick={handleTabActive}>
          <span
            className={`border-b-2 ${
              tabActive === 1 ? 'border-primary text-primary' : 'text-gray-400'
            } text-center py-2 inline-block w-full font-medium`}
          >
            Chi tiêu
          </span>
        </div>
        <div data-id={2} className="flex-1 cursor-pointer" onClick={handleTabActive}>
          <span
            className={`border-b-2 ${
              tabActive === 2 ? 'border-primary text-primary' : 'text-gray-400'
            } text-center py-2 inline-block w-full font-medium`}
          >
            Thu nhập
          </span>
        </div>
      </div>
      <div className="mt-4">
        {tabActive === 1 ? (
          <PieChart tab={tabActive} chartData={chartSpendData} />
        ) : (
          <PieChart tab={tabActive} chartData={chartIncomeData} />
        )}
      </div>

      <div className="border-t border-gray-300 mt-5">
        {fakeData.map(item => (
          <div
            className="flex justify-between items-center py-2 px-5 border border-t-transparent border-borderColor"
            key={item.id}
          >
            <div className="flex items-center gap-5">
              <img src={`/icon/${item.icon}`} alt={`icon ${item.spendName}`} className="w-10" />
              <span className="font-medium">{item.spendName}</span>
            </div>
            <span className="font-medium">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticTable;
