import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Dashboard } from '@/pages/Dashboard';
import { Sales } from '@/pages/Sales';
import { Purchase } from '@/pages/Purchase';
import { Inventory } from '@/pages/Inventory';
import { Analytics } from '@/pages/Analytics';
import { Upload } from '@/pages/Upload';

function App() {
  return (
    <BrowserRouter basename="/club">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
