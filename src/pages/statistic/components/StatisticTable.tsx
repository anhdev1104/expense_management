import PieChart from '@/components/charts/PieChart';
import React, { useState } from 'react';
import Chart, { CategoryScale } from 'chart.js/auto';
const Data = [
  {
    id: 1,
    price: 600000,
    spendName: 'Quần áo',
  },
  {
    id: 2,
    price: 500000,
    spendName: 'Ăn uống',
  },
];

Chart.register(CategoryScale);

const StatisticTable = () => {
  const [tabActive, setTabActive] = useState<number>(1);
  const [chartData, setChartData] = useState({
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
  console.log(setChartData);

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
        <PieChart chartData={chartData} />
      </div>
    </div>
  );
};

export default StatisticTable;
