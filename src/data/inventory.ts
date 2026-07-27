import type { InventoryItem } from '@/types';

export const inventoryData: InventoryItem[] = [
  { id: '1', materialCode: 'YL001', materialName: '精制食用盐(加碘)', spec: '500g/袋', warehouse: '荆州仓库', quantity: 12500, unit: '袋', warningLevel: 'low' },
  { id: '2', materialCode: 'YL002', materialName: '精制食用盐(无碘)', spec: '500g/袋', warehouse: '荆州仓库', quantity: 8200, unit: '袋', warningLevel: 'medium' },
  { id: '3', materialCode: 'YL003', materialName: '低钠盐', spec: '500g/袋', warehouse: '沙市仓库', quantity: 4500, unit: '袋', warningLevel: 'high' },
  { id: '4', materialCode: 'YL004', materialName: '海藻碘盐', spec: '400g/袋', warehouse: '沙市仓库', quantity: 6800, unit: '袋' },
  { id: '5', materialCode: 'YL005', materialName: '深井岩盐', spec: '500g/袋', warehouse: '江陵仓库', quantity: 9200, unit: '袋' },
  { id: '6', materialCode: 'YL006', materialName: '腌制盐', spec: '25kg/袋', warehouse: '江陵仓库', quantity: 3200, unit: '袋', warningLevel: 'medium' },
  { id: '7', materialCode: 'YL007', materialName: '畜牧盐', spec: '50kg/袋', warehouse: '公安仓库', quantity: 1800, unit: '袋', warningLevel: 'high' },
  { id: '8', materialCode: 'YL008', materialName: '工业盐', spec: '50kg/袋', warehouse: '公安仓库', quantity: 5600, unit: '袋' },
  { id: '9', materialCode: 'YL009', materialName: '软水盐', spec: '10kg/袋', warehouse: '石首仓库', quantity: 2800, unit: '袋' },
  { id: '10', materialCode: 'YL010', materialName: '调味盐(麻辣)', spec: '200g/袋', warehouse: '石首仓库', quantity: 7500, unit: '袋' },
  { id: '11', materialCode: 'YL011', materialName: '调味盐(鲜味)', spec: '200g/袋', warehouse: '监利仓库', quantity: 5200, unit: '袋' },
  { id: '12', materialCode: 'YL012', materialName: '竹盐', spec: '250g/袋', warehouse: '监利仓库', quantity: 3800, unit: '袋', warningLevel: 'medium' },
  { id: '13', materialCode: 'YL013', materialName: '大颗粒海盐', spec: '1kg/袋', warehouse: '洪湖仓库', quantity: 4100, unit: '袋' },
  { id: '14', materialCode: 'YL014', materialName: '雪花盐', spec: '300g/袋', warehouse: '洪湖仓库', quantity: 6300, unit: '袋' },
  { id: '15', materialCode: 'YL015', materialName: '日晒盐', spec: '50kg/袋', warehouse: '松滋仓库', quantity: 2400, unit: '袋', warningLevel: 'high' },
];

export const warehouseList = ['荆州仓库', '沙市仓库', '江陵仓库', '公安仓库', '石首仓库', '监利仓库', '洪湖仓库', '松滋仓库'];
