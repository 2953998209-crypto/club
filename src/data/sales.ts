import type { SalesItem, CategorySales } from '@/types';

export const salesData: SalesItem[] = [
  { id: '1', category: '食用盐', productName: '精制食用盐(加碘)', spec: '500g/袋', quantity: 32000, revenue: 96000, unitPrice: 3.00, date: '2026-07' },
  { id: '2', category: '食用盐', productName: '精制食用盐(无碘)', spec: '500g/袋', quantity: 21000, revenue: 63000, unitPrice: 3.00, date: '2026-07' },
  { id: '3', category: '特种盐', productName: '低钠盐', spec: '500g/袋', quantity: 8500, revenue: 34000, unitPrice: 4.00, date: '2026-07' },
  { id: '4', category: '特种盐', productName: '海藻碘盐', spec: '400g/袋', quantity: 12000, revenue: 48000, unitPrice: 4.00, date: '2026-07' },
  { id: '5', category: '工业盐', productName: '工业盐', spec: '50kg/袋', quantity: 5200, revenue: 62400, unitPrice: 12.00, date: '2026-07' },
  { id: '6', category: '腌制盐', productName: '腌制盐', spec: '25kg/袋', quantity: 3800, revenue: 30400, unitPrice: 8.00, date: '2026-07' },
  { id: '7', category: '畜牧盐', productName: '畜牧盐', spec: '50kg/袋', quantity: 1500, revenue: 12000, unitPrice: 8.00, date: '2026-07' },
  { id: '8', category: '调味盐', productName: '调味盐(麻辣)', spec: '200g/袋', quantity: 9200, revenue: 23000, unitPrice: 2.50, date: '2026-07' },
  { id: '9', category: '调味盐', productName: '调味盐(鲜味)', spec: '200g/袋', quantity: 6800, revenue: 17000, unitPrice: 2.50, date: '2026-07' },
  { id: '10', category: '高端盐', productName: '竹盐', spec: '250g/袋', quantity: 4500, revenue: 27000, unitPrice: 6.00, date: '2026-07' },
  { id: '11', category: '高端盐', productName: '雪花盐', spec: '300g/袋', quantity: 3200, revenue: 19200, unitPrice: 6.00, date: '2026-07' },
  { id: '12', category: '食用盐', productName: '深井岩盐', spec: '500g/袋', quantity: 15000, revenue: 45000, unitPrice: 3.00, date: '2026-07' },
];

export const categorySalesData: CategorySales[] = [
  { category: '食用盐', revenue: 204000, quantity: 68000 },
  { category: '特种盐', revenue: 82000, quantity: 20500 },
  { category: '工业盐', revenue: 62400, quantity: 5200 },
  { category: '腌制盐', revenue: 30400, quantity: 3800 },
  { category: '畜牧盐', revenue: 12000, quantity: 1500 },
  { category: '调味盐', revenue: 40000, quantity: 16000 },
  { category: '高端盐', revenue: 46200, quantity: 7700 },
];

export const categoryList = ['食用盐', '特种盐', '工业盐', '腌制盐', '畜牧盐', '调味盐', '高端盐'];
