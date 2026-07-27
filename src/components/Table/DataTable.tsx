import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { getWarningTextColor } from '@/utils/format';

interface Column {
  key: string;
  label: string;
  width?: string;
  format?: (value: unknown) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  title?: string;
  searchable?: boolean;
}

export function DataTable({ columns, data, title, searchable = true }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    return Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      
      {searchable && (
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  style={column.width ? { width: column.width } : {}}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 transition-colors ${
                  row.warningLevel ? getWarningTextColor(row.warningLevel as string).replace('text-', 'bg-') + '/30' : ''
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 text-sm ${
                      row.warningLevel && column.key === 'materialName'
                        ? getWarningTextColor(row.warningLevel as string)
                        : 'text-gray-800'
                    }`}
                  >
                    {column.format ? column.format(row[column.key]) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length > pageSize && (
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            显示 {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredData.length)} 条，共 {filteredData.length} 条
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-lg">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
