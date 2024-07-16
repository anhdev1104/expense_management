import { ChartData } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  chartData: ChartData<'pie'>;
}

const PieChart: React.FC<PieChartProps> = ({ chartData }) => {
  return (
    <div className="w-[400px] mx-auto">
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Thống kê chi tiêu trong tháng',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const total = (context.dataset.data as number[]).reduce((acc, value) => acc + value, 0);
                  const value = context.raw as number;
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${context.label}: ${value} (${percentage}%)`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
