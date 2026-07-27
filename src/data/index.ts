import { inventoryData, warehouseList } from './inventory';
import { salesData, categorySalesData, categoryList } from './sales';
import { purchaseData, supplierList } from './purchase';
import { monthlyStatsData } from './monthly';
import type { DashboardStats, WarehouseDistribution, WarningItem } from '@/types';

export function getDashboardStats(): DashboardStats {
  const totalSales = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalPurchase = purchaseData.reduce((sum, item) => sum + item.amount, 0);
  const totalInventory = inventoryData.reduce((sum, item) => sum + item.quantity, 0);
  const warningCount = inventoryData.filter(item => item.warningLevel).length;
  
  const lastMonthSales = 480000;
  const lastMonthPurchase = 590000;
  const lastMonthInventory = 790000;
  
  return {
    totalSales,
    totalPurchase,
    totalInventory,
    warningCount,
    salesGrowth: ((totalSales - lastMonthSales) / lastMonthSales * 100).toFixed(1) as unknown as number,
    purchaseGrowth: ((totalPurchase - lastMonthPurchase) / lastMonthPurchase * 100).toFixed(1) as unknown as number,
    inventoryGrowth: ((totalInventory - lastMonthInventory) / lastMonthInventory * 100).toFixed(1) as unknown as number,
  };
}

export function getInventoryList() {
  return inventoryData;
}

export function getInventoryWarnings(): WarningItem[] {
  return inventoryData
    .filter(item => item.warningLevel)
    .map(item => ({
      ...item,
      threshold: item.warningLevel === 'high' ? 2000 : item.warningLevel === 'medium' ? 4000 : 6000,
      ratio: ((item.quantity / (item.warningLevel === 'high' ? 2000 : item.warningLevel === 'medium' ? 4000 : 6000)) * 100).toFixed(1) as unknown as number,
    }));
}

export function getSalesSummary() {
  return salesData;
}

export function getPurchaseSummary() {
  return purchaseData;
}

export function getMonthlyTrend() {
  return monthlyStatsData;
}

export function getWarehouseDistribution(): WarehouseDistribution[] {
  const total = inventoryData.reduce((sum, item) => sum + item.quantity, 0);
  const grouped = inventoryData.reduce((acc, item) => {
    acc[item.warehouse] = (acc[item.warehouse] || 0) + item.quantity;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(grouped).map(([warehouse, quantity]) => ({
    warehouse,
    quantity,
    percentage: ((quantity / total) * 100).toFixed(1) as unknown as number,
  }));
}

export function getCategorySales() {
  return categorySalesData;
}

export {
  warehouseList,
  categoryList,
  supplierList,
};
