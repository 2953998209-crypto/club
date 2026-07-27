import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header title={title} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
