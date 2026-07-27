import { Bell, Settings, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useDataStore } from '@/store/dataStore';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshData = useDataStore((state) => state.refreshData);
  const warningCount = useDataStore((state) => state.dashboardStats?.warningCount || 0);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    refreshData();
    setIsRefreshing(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">盐</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            <p className="text-sm text-gray-500">湖北盐业集团有限公司荆州分公司 · 市场营销中心</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="刷新数据"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="text-sm">刷新</span>
        </button>

        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          {warningCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {warningCount}
            </span>
          )}
        </button>

        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        <div className="ml-4 pl-4 border-l border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">李</span>
            </div>
            <div className="text-sm">
              <p className="text-gray-800 font-medium">李付强</p>
              <p className="text-gray-500">市场营销中心</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
