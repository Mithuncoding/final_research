import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRightLeft, Check, Plus } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { formatDate } from '../utils/helpers';

export default function ComparePage() {
  const navigate = useNavigate();
  const { analysisHistory } = useAppStore();
  const [selectedPapers, setSelectedPapers] = useState([]);

  const togglePaper = (hash) => {
    if (selectedPapers.includes(hash)) {
      setSelectedPapers(prev => prev.filter(h => h !== hash));
    } else {
      if (selectedPapers.length < 2) {
        setSelectedPapers(prev => [...prev, hash]);
      }
    }
  };

  const getPaper = (hash) => analysisHistory.find(h => h.paperHash === hash);

  const paper1 = selectedPapers[0] ? getPaper(selectedPapers[0]) : null;
  const paper2 = selectedPapers[1] ? getPaper(selectedPapers[1]) : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate('/')} variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <h1 className="text-xl font-bold text-slate-800">Compare Analysis</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Selection Area */}
        {selectedPapers.length < 2 && (
          <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-2xl font-bold mb-6 text-center">Select 2 Papers to Compare</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysisHistory.map((paper) => (
                <Card 
                  key={paper.paperHash}
                  onClick={() => togglePaper(paper.paperHash)}
                  className={`cursor-pointer transition-all hover:scale-102 ${
                    selectedPapers.includes(paper.paperHash) 
                      ? 'ring-2 ring-prism-500 bg-prism-50' 
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedPapers.includes(paper.paperHash) ? 'bg-prism-500 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {selectedPapers.includes(paper.paperHash) ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                      </div>
                      <span className="text-xs text-slate-400 bg-white px-2 py-1 rounded-full border border-slate-100">
                        {formatDate(paper.analyzedAt)}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 line-clamp-2 mb-2">{paper.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{paper.summary}</p>
                  </div>
                </Card>
              ))}
            </div>
            {analysisHistory.length < 2 && (
              <div className="text-center py-12 text-slate-500 bg-slate-100 rounded-3xl mt-6 border-2 border-dashed border-slate-200">
                You need at least 2 analyzed papers in history to compare.
                <br />
                <Button onClick={() => navigate('/')} className="mt-4" variant="outline">Analyze More Papers</Button>
              </div>
            )}
          </div>
        )}

        {/* Comparison View */}
        {selectedPapers.length === 2 && paper1 && paper2 && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-prism-600">{paper1.title.substring(0, 20)}...</span>
                <ArrowRightLeft className="w-6 h-6 text-slate-400" />
                <span className="text-purple-600">{paper2.title.substring(0, 20)}...</span>
              </h2>
              <Button onClick={() => setSelectedPapers([])} variant="outline">
                Change Selection
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Paper 1 Column */}
              <div className="space-y-8">
                <ComparisonCard paper={paper1} color="prism" />
              </div>

              {/* Paper 2 Column */}
              <div className="space-y-8">
                <ComparisonCard paper={paper2} color="purple" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ComparisonCard({ paper, color }) {
  const gradient = color === 'prism' ? 'from-prism-600 to-prism-500' : 'from-purple-600 to-purple-500';

  return (
    <div className="space-y-6">
      <Card className={`p-6 border-t-4 ${color === 'prism' ? 'border-t-prism-500' : 'border-t-purple-500'}`}>
        <h3 className="font-bold text-lg mb-4">Summary</h3>
        <p className="text-slate-600 leading-relaxed text-sm">{paper.summary}</p>
      </Card>

      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4">Methodology</h3>
        <p className="text-slate-600 leading-relaxed text-sm">{paper.methodology}</p>
      </Card>

      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4">Key Findings</h3>
        <ul className="space-y-3">
          {paper.keyFindings?.slice(0, 5).map((f, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-700">
              <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-xs`}>
                {i + 1}
              </span>
              <span>{typeof f === 'string' ? f : f.finding}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4">Critique</h3>
        <div className="grid gap-4">
          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <h4 className="font-semibold text-green-800 mb-2">Strengths</h4>
            <ul className="list-disc list-inside text-xs text-green-700 space-y-1">
              {paper.strengths?.slice(0, 3).map((s, i) => <li key={i}>{s}</li>) || 'Not available'}
            </ul>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <h4 className="font-semibold text-red-800 mb-2">Weaknesses</h4>
            <ul className="list-disc list-inside text-xs text-red-700 space-y-1">
              {paper.weaknesses?.slice(0, 3).map((w, i) => <li key={i}>{w}</li>) || 'Not available'}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
