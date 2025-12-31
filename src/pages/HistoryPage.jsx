import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { ArrowLeft, FileText, Search, Plus, X, BookOpen, Sparkles, Clock, Tag } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { analysisHistory, setCurrentAnalysis, setUploadedFiles, updateAnalysis } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [editingTags, setEditingTags] = useState(null);
  const [newTagInput, setNewTagInput] = useState('');

  const allTags = Array.from(new Set(analysisHistory.flatMap(item => item.tags || [])));

  const filteredHistory = analysisHistory.filter(item => {
    const matchesSearch = (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.fileName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.summary || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? (item.tags || []).includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleViewAnalysis = (analysis) => {
    setCurrentAnalysis(analysis);
    setUploadedFiles([{
      name: analysis.fileName,
      type: 'application/pdf',
      parsedData: { text: analysis.fullText || '', images: [] }
    }]);
    navigate('/analysis');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleAddTag = (paperHash) => {
    if (!newTagInput.trim()) return;
    const item = analysisHistory.find(h => h.paperHash === paperHash);
    if (item) {
      const currentTags = item.tags || [];
      if (!currentTags.includes(newTagInput.trim())) {
        updateAnalysis(paperHash, { tags: [...currentTags, newTagInput.trim()] });
      }
    }
    setNewTagInput('');
  };

  const removeTag = (paperHash, tagToRemove) => {
    const item = analysisHistory.find(h => h.paperHash === paperHash);
    if (item) {
      updateAnalysis(paperHash, { tags: (item.tags || []).filter(t => t !== tagToRemove) });
    }
  };

  // Color palette for papers
  const gradients = [
    'from-blue-500 to-cyan-400',
    'from-purple-500 to-pink-500',
    'from-amber-500 to-orange-500',
    'from-emerald-500 to-teal-500',
    'from-rose-500 to-red-500',
    'from-indigo-500 to-violet-500',
    'from-fuchsia-500 to-pink-500',
    'from-cyan-500 to-blue-500',
    'from-lime-500 to-green-500',
    'from-orange-500 to-red-500',
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/compare')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all backdrop-blur-sm border border-white/10 hover:border-white/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Compare Papers</span>
            </button>
            <div className="flex items-center gap-3">
              <img src="/icon.svg" alt="Prism" className="w-10 h-10" />
              <span className="text-xl font-bold">PRISM</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 py-12 text-center px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-white/80">Your Research Library</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-black mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Research Library
          </span>
        </h1>
        
        <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
          All your analyzed papers, organized and ready to explore
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-white">{analysisHistory.length}</div>
            <div className="text-white/60 text-sm">Papers</div>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <div className="text-4xl font-bold text-white">{allTags.length}</div>
            <div className="text-white/60 text-sm">Tags</div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-lg mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search your papers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
          />
        </div>
      </section>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <section className="relative z-10 px-6 pb-8">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !selectedTag ? 'bg-white text-slate-900' : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              All Papers
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                  selectedTag === tag ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Papers Grid */}
      <section className="relative z-10 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {analysisHistory.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
                <BookOpen className="w-12 h-12 text-white/40" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Papers Yet</h3>
              <p className="text-white/60 mb-8">Start by uploading your first research paper</p>
              <button 
                onClick={handleBackToHome}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                Upload Paper
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredHistory.slice(0, 10).map((analysis, index) => (
                <div 
                  key={analysis.paperHash || index}
                  className="group relative"
                >
                  {/* Glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  {/* Card */}
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
                    <div className="flex">
                      {/* Color Bar */}
                      <div 
                        onClick={() => handleViewAnalysis(analysis)}
                        className={`w-2 bg-gradient-to-b ${gradients[index % gradients.length]} cursor-pointer`}
                      />
                      
                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-xl flex items-center justify-center shadow-lg`}>
                              <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 
                                onClick={() => handleViewAnalysis(analysis)}
                                className="text-lg font-bold text-white hover:text-cyan-400 cursor-pointer line-clamp-1 transition-colors"
                              >
                                {analysis.title || analysis.fileName}
                              </h3>
                              <div className="flex items-center gap-2 text-white/50 text-xs">
                                <Clock className="w-3 h-3" />
                                {formatDate(analysis.analyzedAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-white/60 text-sm mb-4 line-clamp-2">
                          {analysis.summary || 'No summary available'}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2">
                          {(analysis.tags || []).map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs">
                              #{tag}
                              <button onClick={() => removeTag(analysis.paperHash, tag)} className="hover:text-red-400">
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                          
                          {editingTags === analysis.paperHash ? (
                            <input
                              autoFocus
                              type="text"
                              placeholder="Tag..."
                              className="w-20 px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500"
                              value={newTagInput}
                              onChange={(e) => setNewTagInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') { handleAddTag(analysis.paperHash); setEditingTags(null); }
                                if (e.key === 'Escape') setEditingTags(null);
                              }}
                              onBlur={() => setEditingTags(null)}
                            />
                          ) : (
                            <button
                              onClick={() => setEditingTags(analysis.paperHash)}
                              className="px-3 py-1 rounded-full bg-white/5 text-white/50 text-xs hover:bg-white/10 transition-colors flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" /> Tag
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredHistory.length === 0 && searchQuery && (
            <div className="text-center py-12 text-white/60">
              No papers found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10 mt-12">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/icon.svg" alt="Prism" className="w-8 h-8" />
            <span className="font-bold">PRISM</span>
          </div>
          <p className="text-sm text-white/40">© 2025 PRISM Team</p>
        </div>
      </footer>
    </div>
  );
}
