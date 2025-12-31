import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import MultiPaperPage from './pages/MultiPaperPage';
import HistoryPage from './pages/HistoryPage';
import ComparePage from './pages/ComparePage';
import MetricsPage from './pages/MetricsPage';
import AboutPage from './pages/AboutPage';
import CommandPalette from './components/ui/CommandPalette';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/multi-paper" element={<MultiPaperPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/metrics" element={<MetricsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <CommandPalette />
      <Toaster />
    </div>
  );
}

export default App;

