import { TrendingUp, ShoppingCart, Package, AlertTriangle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { KPICard } from '@/components/Dashboard/KPICard';
import { LineChart } from '@/components/Charts/LineChart';
import { PieChart } from '@/components/Charts/PieChart';
import { BarChart } from '@/components/Charts/BarChart';
import { DataTable } from '@/components/Table/DataTable';
import { useDataStore } from '@/store/dataStore';
import { formatCurrency } from '@/utils/format';

export function Dashboard() {
  const dashboardStats = useDataStore((state) => state.dashboardStats);
  const monthlyStats = useDataStore((state) => state.monthlyStats);
  const categorySales = useDataStore((state) => state.categorySales);
  const sales = useDataStore((state) => state.sales);
  const warnings = useDataStore((state) => state.warnings);

  const topSales = [...sales]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  const warningColumns = [
    { key: 'materialCode', label: '物料编码', width: '120px' },
    { key: 'materialName', label: '物料名称', width: '200px' },
    { key: 'spec', label: '规格', width: '120px' },
    { key: 'warehouse', label: '仓库', width: '120px' },
    { key: 'quantity', label: '库存量', width: '100px', format: (v) => `${v} 袋` },
    { key: 'warningLevel', label: '预警等级', width: '100px', format: (v) => {
      const level = v as string;
      if (level === 'high') return <span className="text-red-600 font-medium">高</span>;
      if (level === 'medium') return <span className="text-orange-600 font-medium">中</span>;
      if (level === 'low') return <span className="text-yellow-600 font-medium">低</span>;
      return '-';
    }},
  ];

  return (
    <Layout title="库存商品进销存智能管理看板系统">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">看板总览</h2>
            <p className="text-gray-500 mt-1">实时查看销售、购进、库存核心数据</p>
          </div>
          <div className="text-sm text-gray-400">
            数据来源：用友网络系统 | 更新时间：{new Date().toLocaleDateString('zh-CN')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats && (
            <>
              <KPICard
                title="销售总额"
                value={dashboardStats.totalSales}
                growth={dashboardStats.salesGrowth}
                icon={<TrendingUp className="w-6 h-6 text-white" />}
                color="blue"
                prefix="¥"
              />
              <KPICard
                title="购进总额"
                value={dashboardStats.totalPurchase}
                growth={dashboardStats.purchaseGrowth}
                icon={<Package className="w-6 h-6 text-white" />}
                color="green"
                prefix="¥"
              />
              <KPICard
                title="库存总量"
                value={dashboardStats.totalInventory}
                growth={dashboardStats.inventoryGrowth}
                icon={<ShoppingCart className="w-6 h-6 text-white" />}
                color="orange"
                suffix=" 件"
              />
              <KPICard
                title="库存预警"
                value={dashboardStats.warningCount}
                growth={0}
                icon={<AlertTriangle className="w-6 h-6 text-white" />}
                color="red"
                suffix=" 项"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart data={monthlyStats} title="近12个月进销存趋势" />
          <PieChart data={categorySales} title="分类销售占比" valueKey="revenue" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart data={topSales} title="TOP10销售商品" valueKey="revenue" />
          <DataTable
            columns={warningColumns}
            data={warnings}
            title="库存预警列表"
          />
        </div>
      </div>
    </Layout>
  );
}
