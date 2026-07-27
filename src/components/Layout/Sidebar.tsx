import { LayoutDashboard, ShoppingCart, Package, Warehouse, BarChart3, Upload, Github } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { PageName } from '@/types';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems: { path: string; name: string; icon: typeof LayoutDashboard }[] = [
  { path: '/', name: '看板总览', icon: LayoutDashboard },
  { path: '/sales', name: '销售管理', icon: ShoppingCart },
  { path: '/purchase', name: '购进管理', icon: Package },
  { path: '/inventory', name: '库存管理', icon: Warehouse },
  { path: '/analytics', name: '数据分析', icon: BarChart3 },
  { path: '/upload', name: '数据上传', icon: Upload },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = location.pathname as PageName;

  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {!collapsed && (
                  <span className={`text-sm font-medium whitespace-nowrap ${isActive ? 'text-white' : ''}`}>
                    {item.name}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-gray-200 p-3">
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          onClick={() => window.open('https://github.com/2953998209-crypto/club', '_blank')}
        >
          <Github className="w-5 h-5 text-gray-400" />
          {!collapsed && (
            <span className="text-sm font-medium whitespace-nowrap">GitHub</span>
          )}
        </button>
      </div>

      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 shadow-sm transition-colors"
      >
        <span className="text-xs">{collapsed ? '→' : '←'}</span>
      </button>
    </aside>
  );
}
