import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { BarChart } from '@/components/Charts/BarChart';
import { PieChart } from '@/components/Charts/PieChart';
import { DataTable } from '@/components/Table/DataTable';
import { useDataStore } from '@/store/dataStore';
import { supplierList } from '@/data';
import { formatCurrency } from '@/utils/format';

export function Purchase() {
  const purchase = useDataStore((state) => state.purchase);
  const [selectedSupplier, setSelectedSupplier] = useState('全部');

  const filteredPurchase = selectedSupplier === '全部' 
    ? purchase 
    : purchase.filter(item => item.supplier === selectedSupplier);

  const categoryPurchase = purchase.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryPurchaseData = Object.entries(categoryPurchase).map(([category, amount]) => ({
    category,
    amount,
  }));

  const purchaseColumns = [
    { key: 'category', label: '物料分类', width: '120px' },
    { key: 'productName', label: '商品名称', width: '200px' },
    { key: 'spec', label: '规格', width: '120px' },
    { key: 'quantity', label: '购进量', width: '100px', format: (v) => `${v} 件` },
    { key: 'amount', label: '购进额(元)', width: '150px', format: (v) => `¥${formatCurrency(Number(v))}` },
    { key: 'supplier', label: '供应商', width: '150px' },
    { key: 'date', label: '日期', width: '100px' },
  ];

  return (
    <Layout title="购进管理">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">购进管理</h2>
            <p className="text-gray-500 mt-1">查看采购分类统计、购进结构分析、供应商管理</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">供应商筛选：</span>
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="全部">全部</option>
            {supplierList.map(supplier => (
              <option key={supplier} value={supplier}>{supplier}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart data={categoryPurchaseData} title="分类购进对比" valueKey="amount" />
          <PieChart data={categoryPurchaseData} title="购进结构占比" valueKey="amount" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart data={filteredPurchase} title="供应商购进排行" valueKey="amount" />
          <DataTable
            columns={purchaseColumns}
            data={filteredPurchase}
            title="购进明细表"
          />
        </div>
      </div>
    </Layout>
  );
}
