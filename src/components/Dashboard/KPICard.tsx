import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatNumber, formatPercent } from '@/utils/format';

interface KPICardProps {
  title: string;
  value: number;
  growth: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'orange' | 'red';
  prefix?: string;
  suffix?: string;
}

const colorMap = {
  blue: {
    bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    light: 'bg-blue-50',
    text: 'text-blue-600',
  },
  green: {
    bg: 'bg-gradient-to-br from-green-500 to-green-600',
    light: 'bg-green-50',
    text: 'text-green-600',
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    light: 'bg-orange-50',
    text: 'text-orange-600',
  },
  red: {
    bg: 'bg-gradient-to-br from-red-500 to-red-600',
    light: 'bg-red-50',
    text: 'text-red-600',
  },
};

export function KPICard({ title, value, growth, icon, color, prefix = '', suffix = '' }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const isCurrency = prefix === '¥';

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  const colors = colorMap[color];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 animate-fadeIn">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 ${colors.light} rounded-full`}>
          {growth >= 0 ? (
            <TrendingUp className={`w-4 h-4 ${colors.text}`} />
          ) : (
            <TrendingDown className={`w-4 h-4 ${colors.text}`} />
          )}
          <span className={`text-sm font-medium ${colors.text}`}>
            {formatPercent(growth)}
          </span>
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-800">
          {prefix}
          {isCurrency ? formatCurrency(displayValue) : formatNumber(displayValue)}
          {suffix}
        </p>
      </div>
    </div>
  );
}
