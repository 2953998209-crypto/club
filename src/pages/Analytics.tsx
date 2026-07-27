import { Layout } from '@/components/Layout';
import { LineChart } from '@/components/Charts/LineChart';
import { BarChart } from '@/components/Charts/BarChart';
import { DataTable } from '@/components/Table/DataTable';
import { useDataStore } from '@/store/dataStore';
import { formatCurrency } from '@/utils/format';

export function Analytics() {
  const monthlyStats = useDataStore((state) => state.monthlyStats);
  const categorySales = useDataStore((state) => state.categorySales);
  const sales = useDataStore((state) => state.sales);
  const purchase = useDataStore((state) => state.purchase);
  const inventory = useDataStore((state) => state.inventory);

  const ledgerData = categorySales.map(item => {
    const categoryPurchase = purchase
      .filter(p => p.category === item.category)
      .reduce((sum, p) => sum + p.amount, 0);
    const categoryInventory = inventory
      .filter(i => i.materialName.includes(item.category))
      .reduce((sum, i) => sum + i.quantity, 0);
    
    return {
      category: item.category,
      sales: item.revenue,
      purchase: categoryPurchase,
      inventory: categoryInventory,
      balance: categoryPurchase - item.revenue,
    };
  });

  const ledgerColumns = [
    { key: 'category', label: '物料分类', width: '120px' },
    { key: 'sales', label: '销售额(元)', width: '150px', format: (v) => `¥${formatCurrency(Number(v))}` },
    { key: 'purchase', label: '购进额(元)', width: '150px', format: (v) => `¥${formatCurrency(Number(v))}` },
    { key: 'inventory', label: '库存量', width: '120px', format: (v) => `${v}` },
    { key: 'balance', label: '余额(元)', width: '150px', format: (v) => {
      const num = Number(v);
      return <span className={num >= 0 ? 'text-green-600' : 'text-red-600'}>
        {num >= 0 ? '+' : ''}¥{formatCurrency(num)}
      </span>;
    }},
  ];

  const topProducts = [...sales]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 15);

  return (
    <Layout title="数据分析">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">数据分析</h2>
            <p className="text-gray-500 mt-1">进销存对比分析、库存趋势、分类经营台账</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart data={monthlyStats} title="进销存趋势分析" />
          <BarChart data={topProducts} title="商品销售排行" valueKey="revenue" />
        </div>

        <DataTable
          columns={ledgerColumns}
          data={ledgerData}
          title="分类经营台账"
        />

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">数据概览</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-600 text-sm">总销售额</p>
              <p className="text-2xl font-bold text-gray-800">¥{formatCurrency(sales.reduce((sum, s) => sum + s.revenue, 0))}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-600 text-sm">总购进额</p>
              <p className="text-2xl font-bold text-gray-800">¥{formatCurrency(purchase.reduce((sum, p) => sum + p.amount, 0))}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-orange-600 text-sm">总库存量</p>
              <p className="text-2xl font-bold text-gray-800">{inventory.reduce((sum, i) => sum + i.quantity, 0)} 件</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-purple-600 text-sm">商品种类</p>
              <p className="text-2xl font-bold text-gray-800">{inventory.length} 种</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
