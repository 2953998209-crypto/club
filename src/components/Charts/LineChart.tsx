import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { MonthlyStats } from '@/types';
import { formatCurrency } from '@/utils/format';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  data: MonthlyStats[];
  title: string;
}

export function LineChart({ data, title }: LineChartProps) {
  const chartData = {
    labels: data.map(item => item.month.slice(5)),
    datasets: [
      {
        label: '销售额',
        data: data.map(item => item.sales),
        borderColor: '#1e40af',
        backgroundColor: 'rgba(30, 64, 175, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: '购进额',
        data: data.map(item => item.purchase),
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: '库存量',
        data: data.map(item => item.inventory),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
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
          label: (context: { dataset: { label?: string }; parsed: { y: number } }) => {
            return `${context.dataset.label}: ¥${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: string | number) => `¥${formatCurrency(Number(value))}`,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <Line data={chartData} options={options} />
    </div>
  );
}
