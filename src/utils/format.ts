export function formatCurrency(value: number): string {
  if (value >= 10000) {
    return (value / 10000).toFixed(2) + ' 万';
  }
  return value.toLocaleString('zh-CN');
}

export function formatNumber(value: number): string {
  return value.toLocaleString('zh-CN');
}

export function formatPercent(value: number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return num >= 0 ? '+' + num + '%' : num + '%';
}

export function formatMonth(month: string): string {
  const [year, m] = month.split('-');
  return `${year}年${parseInt(m)}月`;
}

export function getWarningColor(level?: string): string {
  switch (level) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-orange-500';
    case 'low':
      return 'bg-yellow-500';
    default:
      return 'bg-green-500';
  }
}

export function getWarningTextColor(level?: string): string {
  switch (level) {
    case 'high':
      return 'text-red-500';
    case 'medium':
      return 'text-orange-500';
    case 'low':
      return 'text-yellow-500';
    default:
      return 'text-green-500';
  }
}

export function getWarningBgColor(level?: string): string {
  switch (level) {
    case 'high':
      return 'bg-red-50';
    case 'medium':
      return 'bg-orange-50';
    case 'low':
      return 'bg-yellow-50';
    default:
      return 'bg-green-50';
  }
}
