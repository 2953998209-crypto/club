import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { BarChart } from '@/components/Charts/BarChart';
import { PieChart } from '@/components/Charts/PieChart';
import { DataTable } from '@/components/Table/DataTable';
import { useDataStore } from '@/store/dataStore';
import { categoryList } from '@/data';
import { formatCurrency } from '@/utils/format';

export function Sales() {
  const sales = useDataStore((state) => state.sales);
  const categorySales = useDataStore((state) => state.categorySales);
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredSales = selectedCategory === '全部' 
    ? sales 
    : sales.filter(item => item.category === selectedCategory);

  const salesColumns = [
    { key: 'category', label: '物料分类', width: '120px' },
    { key: 'productName', label: '商品名称', width: '200px' },
    { key: 'spec', label: '规格', width: '120px' },
    { key: 'quantity', label: '销量', width: '100px', format: (v) => `${v} 件` },
    { key: 'unitPrice', label: '单价(元)', width: '120px', format: (v) => `¥${Number(v).toFixed(2)}` },
    { key: 'revenue', label: '销售收入(元)', width: '150px', format: (v) => `¥${formatCurrency(Number(v))}` },
    { key: 'date', label: '日期', width: '100px' },
  ];

  return (
    <Layout title="销售管理">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">销售管理</h2>
            <p className="text-gray-500 mt-1">查看分类销售统计、商品销售明细、销售额排名</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">分类筛选：</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="全部">全部</option>
            {categoryList.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart data={categorySales} title="分类销售对比" valueKey="revenue" />
          <PieChart data={categorySales} title="销售结构占比" valueKey="revenue" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart data={filteredSales} title="商品销量排行" valueKey="quantity" />
          <DataTable
            columns={salesColumns}
            data={filteredSales}
            title="销售明细表"
          />
        </div>
      </div>
    </Layout>
  );
}
