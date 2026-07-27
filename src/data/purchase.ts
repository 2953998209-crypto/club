import type { PurchaseItem } from '@/types';

export const purchaseData: PurchaseItem[] = [
  { id: '1', category: '食用盐', productName: '精制食用盐(加碘)', spec: '500g/袋', quantity: 40000, amount: 100000, supplier: '湖北盐业集团', date: '2026-07' },
  { id: '2', category: '食用盐', productName: '精制食用盐(无碘)', spec: '500g/袋', quantity: 25000, amount: 62500, supplier: '湖北盐业集团', date: '2026-07' },
  { id: '3', category: '食用盐', productName: '深井岩盐', spec: '500g/袋', quantity: 18000, amount: 45000, supplier: '湖北盐业集团', date: '2026-07' },
  { id: '4', category: '特种盐', productName: '低钠盐', spec: '500g/袋', quantity: 10000, amount: 35000, supplier: '武汉盐业公司', date: '2026-07' },
  { id: '5', category: '特种盐', productName: '海藻碘盐', spec: '400g/袋', quantity: 15000, amount: 52500, supplier: '武汉盐业公司', date: '2026-07' },
  { id: '6', category: '工业盐', productName: '工业盐', spec: '50kg/袋', quantity: 6000, amount: 54000, supplier: '应城盐矿', date: '2026-07' },
  { id: '7', category: '腌制盐', productName: '腌制盐', spec: '25kg/袋', quantity: 5000, amount: 35000, supplier: '应城盐矿', date: '2026-07' },
  { id: '8', category: '畜牧盐', productName: '畜牧盐', spec: '50kg/袋', quantity: 2000, amount: 14000, supplier: '云梦盐矿', date: '2026-07' },
  { id: '9', category: '调味盐', productName: '调味盐(麻辣)', spec: '200g/袋', quantity: 12000, amount: 24000, supplier: '宜昌盐业公司', date: '2026-07' },
  { id: '10', category: '调味盐', productName: '调味盐(鲜味)', spec: '200g/袋', quantity: 8000, amount: 16000, supplier: '宜昌盐业公司', date: '2026-07' },
  { id: '11', category: '高端盐', productName: '竹盐', spec: '250g/袋', quantity: 5000, amount: 25000, supplier: '进口贸易商', date: '2026-07' },
  { id: '12', category: '高端盐', productName: '雪花盐', spec: '300g/袋', quantity: 4000, amount: 20000, supplier: '进口贸易商', date: '2026-07' },
];

export const supplierList = ['湖北盐业集团', '武汉盐业公司', '应城盐矿', '云梦盐矿', '宜昌盐业公司', '进口贸易商'];
