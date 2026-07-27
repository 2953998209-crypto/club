import { useState, useCallback } from 'react';
import { Upload, X, Check, FileText } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (data: Record<string, unknown>[]) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
      file.type.includes('csv') || file.type.includes('excel') || file.name.endsWith('.csv') || file.name.endsWith('.xlsx')
    );
    if (droppedFiles.length > 0) {
      setFiles(prev => [...prev, ...droppedFiles]);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter(file =>
      file.type.includes('csv') || file.type.includes('excel') || file.name.endsWith('.csv') || file.name.endsWith('.xlsx')
    );
    if (selectedFiles.length > 0) {
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const parseCSV = (content: string): Record<string, unknown>[] => {
    const lines = content.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const row: Record<string, unknown> = {};
      headers.forEach((header, index) => {
        row[header] = values[index]?.trim();
      });
      return row;
    });
  };

  const handleUpload = useCallback(async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const allData: Record<string, unknown>[] = [];
    for (const file of files) {
      const content = await file.text();
      const data = parseCSV(content);
      allData.push(...data);
    }

    onFileUpload(allData);
    setUploading(false);
    setUploaded(true);
    setFiles([]);
    
    setTimeout(() => setUploaded(false), 3000);
  }, [files, onFileUpload]);

  return (
    <div className="space-y-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
      >
        <input
          id="file-input"
          type="file"
          accept=".csv,.xlsx,.xls"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isDragging ? 'bg-primary-100' : 'bg-gray-100'
          }`}>
            <Upload className={`w-8 h-8 ${isDragging ? 'text-primary-600' : 'text-gray-400'}`} />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              {isDragging ? '松开鼠标上传文件' : '拖拽CSV/Excel文件到此处'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              或点击选择文件
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">已选择文件</h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-6 h-6 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-6 w-full py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-lg hover:from-primary-700 hover:to-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                上传中...
              </span>
            ) : uploaded ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                上传成功
              </span>
            ) : (
              '开始上传'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
