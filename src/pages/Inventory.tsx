import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { PieChart } from '@/components/Charts/PieChart';
import { DataTable } from '@/components/Table/DataTable';
import { useDataStore } from '@/store/dataStore';
import { warehouseList } from '@/data';

export function Inventory() {
  const inventory = useDataStore((state) => state.inventory);
  const warehouseDistribution = useDataStore((state) => state.warehouseDistribution);
  const [selectedWarehouse, setSelectedWarehouse] = useState('全部');

  const filteredInventory = selectedWarehouse === '全部' 
    ? inventory 
    : inventory.filter(item => item.warehouse === selectedWarehouse);

  const warningDistribution = inventory.reduce((acc, item) => {
    if (item.warningLevel) {
      acc[item.warningLevel] = (acc[item.warningLevel] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const warningDistributionData = Object.entries(warningDistribution).map(([warehouse, quantity]) => ({
    warehouse,
    quantity,
    percentage: ((quantity / inventory.length) * 100).toFixed(1) as unknown as number,
  }));

  const inventoryColumns = [
    { key: 'materialCode', label: '物料编码', width: '120px' },
    { key: 'materialName', label: '物料名称', width: '200px' },
    { key: 'spec', label: '规格', width: '120px' },
    { key: 'warehouse', label: '仓库', width: '120px' },
    { key: 'quantity', label: '库存量', width: '100px', format: (v) => `${v} ${inventory[0]?.unit || ''}` },
    { key: 'warningLevel', label: '预警等级', width: '100px', format: (v) => {
      const level = v as string;
      if (level === 'high') return <span className="text-red-600 font-medium">高</span>;
      if (level === 'medium') return <span className="text-orange-600 font-medium">中</span>;
      if (level === 'low') return <span className="text-yellow-600 font-medium">低</span>;
      return <span className="text-green-600">正常</span>;
    }},
  ];

  return (
    <Layout title="库存管理">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">库存管理</h2>
            <p className="text-gray-500 mt-1">查看各仓库库存分布、实时库存预警、库存搜索</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">仓库筛选：</span>
          <select
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="全部">全部</option>
            {warehouseList.map(warehouse => (
              <option key={warehouse} value={warehouse}>{warehouse}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChart data={warehouseDistribution} title="仓库库存分布" valueKey="quantity" />
          <PieChart data={warningDistributionData} title="预警分布" valueKey="quantity" />
        </div>

        <DataTable
          columns={inventoryColumns}
          data={filteredInventory}
          title="库存明细表"
        />
      </div>
    </Layout>
  );
}
