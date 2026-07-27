import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { FileUpload } from '@/components/Upload/FileUpload';
import { useDataStore } from '@/store/dataStore';
import type { InventoryItem, SalesItem, PurchaseItem } from '@/types';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

export function Upload() {
  const [uploadType, setUploadType] = useState<'inventory' | 'sales' | 'purchase'>('inventory');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  
  const setInventory = useDataStore((state) => state.setInventory);
  const setSales = useDataStore((state) => state.setSales);
  const setPurchase = useDataStore((state) => state.setPurchase);

  const handleFileUpload = (data: Record<string, unknown>[]) => {
    try {
      switch (uploadType) {
        case 'inventory':
          const inventoryData: InventoryItem[] = data.map((item, index) => ({
            id: `upload-${Date.now()}-${index}`,
            materialCode: String(item['物料编码'] || item['materialCode'] || ''),
            materialName: String(item['物料名称'] || item['materialName'] || item['productName'] || ''),
            spec: String(item['规格'] || item['spec'] || ''),
            warehouse: String(item['仓库'] || item['warehouse'] || ''),
            quantity: Number(item['结存主数量'] || item['quantity'] || 0),
            unit: String(item['单位'] || item['unit'] || '袋'),
          }));
          setInventory(inventoryData);
          break;
        case 'sales':
          const salesData: SalesItem[] = data.map((item, index) => ({
            id: `upload-${Date.now()}-${index}`,
            category: String(item['物料分类'] || item['category'] || ''),
            productName: String(item['商品名称'] || item['productName'] || item['materialName'] || ''),
            spec: String(item['规格'] || item['spec'] || ''),
            quantity: Number(item['销量'] || item['quantity'] || 0),
            revenue: Number(item['销售收入'] || item['revenue'] || 0),
            unitPrice: Number(item['单价'] || item['unitPrice'] || 0),
            date: String(item['日期'] || item['date'] || new Date().toISOString().slice(0, 7)),
          }));
          setSales(salesData);
          break;
        case 'purchase':
          const purchaseData: PurchaseItem[] = data.map((item, index) => ({
            id: `upload-${Date.now()}-${index}`,
            category: String(item['物料分类'] || item['category'] || ''),
            productName: String(item['商品名称'] || item['productName'] || item['materialName'] || ''),
            spec: String(item['规格'] || item['spec'] || ''),
            quantity: Number(item['购进量'] || item['quantity'] || 0),
            amount: Number(item['购进额'] || item['amount'] || 0),
            supplier: String(item['供应商'] || item['supplier'] || ''),
            date: String(item['日期'] || item['date'] || new Date().toISOString().slice(0, 7)),
          }));
          setPurchase(purchaseData);
          break;
      }
      
      setMessage({ type: 'success', text: `成功上传 ${data.length} 条数据！` });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: '数据解析失败，请检查文件格式！' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <Layout title="数据上传">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">数据上传</h2>
            <p className="text-gray-500 mt-1">上传CSV/Excel文件，智能识别字段，手动录入数据</p>
          </div>
        </div>

        {message && (
          <div className={`flex items-center gap-3 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-700' :
            message.type === 'error' ? 'bg-red-50 text-red-700' :
            'bg-blue-50 text-blue-700'
          }`}>
            {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
             message.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
             <Info className="w-5 h-5" />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <span className="text-sm text-gray-600">上传类型：</span>
          <div className="flex gap-2">
            <button
              onClick={() => setUploadType('inventory')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                uploadType === 'inventory'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              库存数据
            </button>
            <button
              onClick={() => setUploadType('sales')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                uploadType === 'sales'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              销售数据
            </button>
            <button
              onClick={() => setUploadType('purchase')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                uploadType === 'purchase'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              购进数据
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {uploadType === 'inventory' && '库存数据格式说明'}
            {uploadType === 'sales' && '销售数据格式说明'}
            {uploadType === 'purchase' && '购进数据格式说明'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">字段名</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">说明</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">示例</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {uploadType === 'inventory' && (
                  <>
                    <tr><td className="px-4 py-2">物料编码</td><td className="px-4 py-2">用友系统物料编码</td><td className="px-4 py-2">YL001</td></tr>
                    <tr><td className="px-4 py-2">物料名称</td><td className="px-4 py-2">商品全称</td><td className="px-4 py-2">精制食用盐(加碘)</td></tr>
                    <tr><td className="px-4 py-2">规格</td><td className="px-4 py-2">包装规格</td><td className="px-4 py-2">500g/袋</td></tr>
                    <tr><td className="px-4 py-2">仓库</td><td className="px-4 py-2">仓库/货位</td><td className="px-4 py-2">荆州仓库</td></tr>
                    <tr><td className="px-4 py-2">结存主数量</td><td className="px-4 py-2">库存量</td><td className="px-4 py-2">12500</td></tr>
                  </>
                )}
                {uploadType === 'sales' && (
                  <>
                    <tr><td className="px-4 py-2">物料分类</td><td className="px-4 py-2">一级分类</td><td className="px-4 py-2">食用盐</td></tr>
                    <tr><td className="px-4 py-2">商品名称</td><td className="px-4 py-2">产品名</td><td className="px-4 py-2">精制食用盐(加碘)</td></tr>
                    <tr><td className="px-4 py-2">规格</td><td className="px-4 py-2">包装规格</td><td className="px-4 py-2">500g/袋</td></tr>
                    <tr><td className="px-4 py-2">销量</td><td className="px-4 py-2">本期销售数量</td><td className="px-4 py-2">32000</td></tr>
                    <tr><td className="px-4 py-2">销售收入</td><td className="px-4 py-2">本期销售额</td><td className="px-4 py-2">96000</td></tr>
                  </>
                )}
                {uploadType === 'purchase' && (
                  <>
                    <tr><td className="px-4 py-2">物料分类</td><td className="px-4 py-2">一级分类</td><td className="px-4 py-2">食用盐</td></tr>
                    <tr><td className="px-4 py-2">商品名称</td><td className="px-4 py-2">产品名</td><td className="px-4 py-2">精制食用盐(加碘)</td></tr>
                    <tr><td className="px-4 py-2">规格</td><td className="px-4 py-2">包装规格</td><td className="px-4 py-2">500g/袋</td></tr>
                    <tr><td className="px-4 py-2">购进量</td><td className="px-4 py-2">采购数量</td><td className="px-4 py-2">40000</td></tr>
                    <tr><td className="px-4 py-2">购进额</td><td className="px-4 py-2">采购金额</td><td className="px-4 py-2">100000</td></tr>
                    <tr><td className="px-4 py-2">供应商</td><td className="px-4 py-2">供应商名称</td><td className="px-4 py-2">湖北盐业集团</td></tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <FileUpload onFileUpload={handleFileUpload} />
      </div>
    </Layout>
  );
}
