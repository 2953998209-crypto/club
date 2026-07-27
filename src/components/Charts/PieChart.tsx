import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type { CategorySales, WarehouseDistribution } from '@/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: CategorySales[] | WarehouseDistribution[];
  title: string;
  valueKey: 'revenue' | 'quantity';
}

const colors = [
  '#1e40af',
  '#06b6d4',
  '#22c55e',
  '#f97316',
  '#ef4444',
  '#8b5cf6',
  '#0ea5e9',
];

export function PieChart({ data, title, valueKey }: PieChartProps) {
  const chartData = {
    labels: data.map(item => 'category' in item ? item.category : item.warehouse),
    datasets: [
      {
        data: data.map(item => item[valueKey]),
        backgroundColor: colors,
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 14,
          weight: 'bold' as const,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <Pie data={chartData} options={options} />
    </div>
  );
}
