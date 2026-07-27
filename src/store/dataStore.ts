import { create } from 'zustand';
import type { InventoryItem, SalesItem, PurchaseItem, MonthlyStats, DashboardStats, CategorySales, WarehouseDistribution, WarningItem } from '@/types';

interface DataStore {
  inventory: InventoryItem[];
  sales: SalesItem[];
  purchase: PurchaseItem[];
  monthlyStats: MonthlyStats[];
  dashboardStats: DashboardStats | null;
  categorySales: CategorySales[];
  warehouseDistribution: WarehouseDistribution[];
  warnings: WarningItem[];
  
  setInventory: (data: InventoryItem[]) => void;
  setSales: (data: SalesItem[]) => void;
  setPurchase: (data: PurchaseItem[]) => void;
  setDashboardStats: (data: DashboardStats) => void;
  refreshData: () => void;
}

const STORAGE_KEY = 'club_dashboard_data';

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

import { getDashboardStats, getInventoryList, getSalesSummary, getPurchaseSummary, getMonthlyTrend, getCategorySales, getWarehouseDistribution, getInventoryWarnings } from '@/data';

const initialInventory = loadFromStorage<InventoryItem[]>('inventory', getInventoryList());
const initialSales = loadFromStorage<SalesItem[]>('sales', getSalesSummary());
const initialPurchase = loadFromStorage<PurchaseItem[]>('purchase', getPurchaseSummary());

export const useDataStore = create<DataStore>((set) => ({
  inventory: initialInventory,
  sales: initialSales,
  purchase: initialPurchase,
  monthlyStats: getMonthlyTrend(),
  dashboardStats: getDashboardStats(),
  categorySales: getCategorySales(),
  warehouseDistribution: getWarehouseDistribution(),
  warnings: getInventoryWarnings(),

  setInventory: (data) => {
    saveToStorage('inventory', data);
    set({ inventory: data, dashboardStats: getDashboardStats(), warehouseDistribution: getWarehouseDistribution(), warnings: getInventoryWarnings() });
  },

  setSales: (data) => {
    saveToStorage('sales', data);
    set({ sales: data, dashboardStats: getDashboardStats(), categorySales: getCategorySales() });
  },

  setPurchase: (data) => {
    saveToStorage('purchase', data);
    set({ purchase: data, dashboardStats: getDashboardStats() });
  },

  setDashboardStats: (data) => set({ dashboardStats: data }),

  refreshData: () => {
    const newInventory = getInventoryList();
    const newSales = getSalesSummary();
    const newPurchase = getPurchaseSummary();
    saveToStorage('inventory', newInventory);
    saveToStorage('sales', newSales);
    saveToStorage('purchase', newPurchase);
    set({
      inventory: newInventory,
      sales: newSales,
      purchase: newPurchase,
      monthlyStats: getMonthlyTrend(),
      dashboardStats: getDashboardStats(),
      categorySales: getCategorySales(),
      warehouseDistribution: getWarehouseDistribution(),
      warnings: getInventoryWarnings(),
    });
  },
}));
