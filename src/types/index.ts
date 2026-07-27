export interface InventoryItem {
  id: string;
  materialCode: string;
  materialName: string;
  spec: string;
  warehouse: string;
  quantity: number;
  unit: string;
  warningLevel?: 'low' | 'medium' | 'high';
}

export interface SalesItem {
  id: string;
  category: string;
  productName: string;
  spec: string;
  quantity: number;
  revenue: number;
  unitPrice: number;
  date: string;
}

export interface PurchaseItem {
  id: string;
  category: string;
  productName: string;
  spec: string;
  quantity: number;
  amount: number;
  supplier?: string;
  date: string;
}

export interface MonthlyStats {
  month: string;
  sales: number;
  purchase: number;
  inventory: number;
}

export interface DashboardStats {
  totalSales: number;
  totalPurchase: number;
  totalInventory: number;
  warningCount: number;
  salesGrowth: number;
  purchaseGrowth: number;
  inventoryGrowth: number;
}

export interface CategorySales {
  category: string;
  revenue: number;
  quantity: number;
}

export interface WarehouseDistribution {
  warehouse: string;
  quantity: number;
  percentage: number;
}

export interface WarningItem extends InventoryItem {
  threshold: number;
  ratio: number;
}

export type PageName = 'dashboard' | 'sales' | 'purchase' | 'inventory' | 'analytics' | 'upload';
