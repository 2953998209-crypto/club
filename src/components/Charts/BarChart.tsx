import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { CategorySales, PurchaseItem, SalesItem } from '@/types';
import { formatCurrency } from '@/utils/format';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: CategorySales[] | SalesItem[] | PurchaseItem[];
  title: string;
  valueKey: 'revenue' | 'quantity' | 'amount';
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

export function BarChart({ data, title, valueKey }: BarChartProps) {
  const chartData = {
    labels: data.map(item => {
      if ('category' in item) {
        return item.category;
      }
      return item.productName.length > 8 ? item.productName.slice(0, 8) + '...' : item.productName;
    }),
    datasets: [
      {
        label: valueKey === 'revenue' ? '销售额' : valueKey === 'amount' ? '购进额' : '数量',
        data: data.map(item => item[valueKey]),
        backgroundColor: colors.slice(0, data.length),
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 14,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { dataset: { label?: string }; parsed: { x: number } }) => {
            const label = context.dataset.label;
            if (label === '销售额' || label === '购进额') {
              return `${label}: ¥${formatCurrency(context.parsed.x)}`;
            }
            return `${label}: ${context.parsed.x}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value: string | number) => {
            const num = Number(value);
            if (num >= 10000) {
              return (num / 10000).toFixed(1) + '万';
            }
            return num;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <Bar data={chartData} options={options} />
    </div>
  );
}
