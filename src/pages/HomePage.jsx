import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Sparkles, Brain, ArrowRight, Play, Shield, Star, MessageSquare, BookOpen, Lightbulb, Download } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useMetricsStore } from '../store/useMetricsStore';
import { parseFile, validateFile } from '../services/fileParser';
import { validateDocument } from '../services/geminiApi';
import { LoadingOverlay } from '../components/ui/Spinner';
import { toast } from '../components/ui/Toaster';
import SettingsModal from '../components/ui/SettingsModal';
import { DEMO_PAPER, DEMO_CORE_ANALYSIS, DEMO_ADVANCED_ANALYSIS, DEMO_REFERENCES, DEMO_GLOSSARY, DEMO_KNOWLEDGE_GRAPH, DEMO_RELATED_QUERIES, enableDemoMode } from '../services/demoData';

// Animated Counter
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return count;
}

export default function HomePage() {
  const navigate = useNavigate();
  const { addUploadedFile, clearUploadedFiles, setCurrentAnalysis, isSettingsOpen, setIsSettingsOpen } = useAppStore();
  const { incrementMetric } = useMetricsStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');

  const paperCount = useCountUp(10000, 2500);
  const userCount = useCountUp(5000, 2500);

  const handleDemoMode = () => {
    enableDemoMode();
    clearUploadedFiles();
    addUploadedFile({ name: DEMO_PAPER.name, parsedData: { text: DEMO_PAPER.text, images: [] }, uploadedAt: new Date().toISOString() });
    setCurrentAnalysis({
      paperHash: 'demo-paper-hash', fileName: DEMO_PAPER.name, title: DEMO_CORE_ANALYSIS.title,
      ...DEMO_CORE_ANALYSIS, ...DEMO_ADVANCED_ANALYSIS, advancedAnalysis: DEMO_ADVANCED_ANALYSIS,
      references: DEMO_REFERENCES.references, glossary: DEMO_GLOSSARY.terms,
      knowledgeGraph: DEMO_KNOWLEDGE_GRAPH, relatedQueries: DEMO_RELATED_QUERIES,
      fullText: DEMO_PAPER.text, analyzedAt: new Date().toISOString(), isDemo: true,
    });
    toast.success('🎯 Demo Mode Activated!');
    navigate('/analysis');
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = async (e) => { e.preventDefault(); setIsDragging(false); await processFiles(Array.from(e.dataTransfer.files)); };
  const handleFileSelect = async (e) => { if (e.target.files.length) { await processFiles(Array.from(e.target.files)); e.target.value = ''; } };

  const processFiles = async (files) => {
    setIsProcessing(true);
    clearUploadedFiles();
    try {
      for (const file of files) {
        setProcessingMessage(`Processing ${file.name}...`);
        const validation = validateFile(file);
        if (!validation.valid) { toast.error(validation.error); continue; }
        const parsed = await parseFile(file);
        const docValidation = await validateDocument(parsed.text);
        if (!docValidation.isValid) { toast.error(`${file.name}: ${docValidation.reason}`); continue; }
        addUploadedFile({ name: file.name, parsedData: parsed, uploadedAt: new Date().toISOString() });
        incrementMetric('papersUploaded');
      }
      toast.success(`Processed ${files.length} file(s)`);
      navigate(files.length === 1 ? '/analysis' : '/multi-paper');
    } catch (error) { toast.error(error.message); }
    finally { setIsProcessing(false); setProcessingMessage(''); }
  };

  return (
    <div className="min-h-screen bg-white">
      {isProcessing && <LoadingOverlay message={processingMessage} />}
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/icon.svg" alt="Prism" className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">PRISM</h1>
              <p className="text-xs text-white/80">AI Research Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/competitive')} className="text-white/90 hover:text-white text-sm font-medium hidden md:block">Why PRISM?</button>
            <button onClick={() => navigate('/about')} className="text-white/90 hover:text-white text-sm font-medium hidden md:block">Team</button>
            <button onClick={() => navigate('/history')} className="text-white/90 hover:text-white text-sm font-medium hidden md:block">History</button>
            <button onClick={() => setIsSettingsOpen(true)} className="text-white/90 hover:text-white text-sm font-medium hidden md:block">Settings</button>
            <button onClick={handleDemoMode} className="px-5 py-2 bg-white text-slate-900 font-semibold rounded-full text-sm hover:bg-slate-100 transition-all shadow-lg">
              Try Demo
            </button>
          </div>
        </div>
      </header>

      {/* HERO - Full Screen Beautiful Image */}
      <section className="relative h-screen">
        <img 
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop&q=90" 
          alt="Library" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">Powered by Gemini AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
              Research
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              Transform complex academic papers into clear, actionable insights in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleDemoMode} className="group px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center gap-3">
                <Play className="w-5 h-5" />
                Try Interactive Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{paperCount.toLocaleString()}+</div>
            <div className="text-slate-400">Papers Analyzed</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{userCount.toLocaleString()}+</div>
            <div className="text-slate-400">Researchers</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">99%</div>
            <div className="text-slate-400">Accuracy</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">&lt;5s</div>
            <div className="text-slate-400">Analysis Time</div>
          </div>
        </div>
      </section>

      {/* Features with Clean Images */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-600">Everything you need for smarter research</p>
          </div>

          {/* Feature 1 - Image Left */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop&q=85" alt="Deep Analysis" className="w-full h-80 object-cover" />
            </div>
            <div>
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Deep Analysis</h3>
              <p className="text-lg text-slate-600 mb-6">Our AI understands academic context. Extract methodology, findings, key contributions, and evidence with precision.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700"><span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span> Key Takeaways</li>
                <li className="flex items-center gap-3 text-slate-700"><span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span> Methodology Breakdown</li>
                <li className="flex items-center gap-3 text-slate-700"><span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span> Evidence Extraction</li>
              </ul>
            </div>
          </div>

          {/* Feature 2 - Image Right */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">AI Chat Assistant</h3>
              <p className="text-lg text-slate-600 mb-6">Ask questions about any paper and get instant, contextual answers based on the content.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700"><span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span> Context-Aware Responses</li>
                <li className="flex items-center gap-3 text-slate-700"><span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span> Citation Support</li>
                <li className="flex items-center gap-3 text-slate-700"><span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span> Follow-up Questions</li>
              </ul>
            </div>
            <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=85" alt="AI Chat" className="w-full h-80 object-cover" />
            </div>
          </div>

          {/* Feature 3 - Image Left */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop&q=85" alt="Export" className="w-full h-80 object-cover" />
            </div>
            <div>
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <Download className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Smart Export</h3>
              <p className="text-lg text-slate-600 mb-6">Export your analysis in multiple formats. Perfect for presentations, notes, and sharing.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700"><span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span> PDF Reports</li>
                <li className="flex items-center gap-3 text-slate-700"><span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span> Markdown Notes</li>
                <li className="flex items-center gap-3 text-slate-700"><span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span> PowerPoint Slides</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* More Features Grid */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lightbulb, title: 'Hypothesis Lab', desc: 'Generate novel research ideas', color: 'emerald', img: 'photo-1532619675605-1ede6c2ed2b0' },
              { icon: BookOpen, title: 'Smart Glossary', desc: 'Auto-extract technical terms', color: 'rose', img: 'photo-1497633762265-9d179a990aa6' },
              { icon: Shield, title: 'Privacy First', desc: 'Your data stays private', color: 'indigo', img: 'photo-1563986768609-322da13575f3' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src={`https://images.unsplash.com/${f.img}?w=600&h=300&fit=crop&q=85`} alt={f.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className={`w-12 h-12 bg-${f.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                    <f.icon className={`w-6 h-6 text-${f.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-slate-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Start Analyzing</h2>
          <p className="text-lg md:text-xl text-slate-600 mb-8 md:mb-12">Drop your research paper and let AI do the rest</p>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
            className={`cursor-pointer border-2 border-dashed rounded-3xl p-8 md:p-16 transition-all ${
              isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-slate-300 hover:border-blue-400 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Upload className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Drop your file here</h3>
            <p className="text-slate-600 mb-4 md:mb-6">PDF, DOCX, or TXT up to 50MB</p>
            
            {/* Hidden file input */}
            <input 
              id="file-upload" 
              type="file" 
              multiple 
              accept=".pdf,.docx,.doc,.txt" 
              onChange={handleFileSelect} 
              className="hidden" 
            />
            
            {/* Visible button */}
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('file-upload').click();
              }}
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
            >
              <FileText className="w-5 h-5" />
              <span>Choose Files</span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial with Image Background */}
      <section className="relative py-24 px-6">
        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=800&fit=crop&q=85" alt="Students" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />)}
          </div>
          <blockquote className="text-2xl md:text-4xl font-medium mb-8 leading-relaxed">
            &ldquo;PRISM has completely transformed how I approach literature reviews. What used to take days now takes hours.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80" alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-white" />
            <div className="text-left">
              <div className="font-bold">Dr. Research User</div>
              <div className="text-white/70">PhD Researcher</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-10">Try the demo or upload your first paper. No sign-up required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleDemoMode} className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl">
              <Play className="w-5 h-5" /> Try Demo Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/icon.svg" alt="Prism" className="w-10 h-10" />
            <span className="text-white font-bold text-xl">PRISM</span>
          </div>
          <div className="text-slate-400 text-center">
            Built with 💜 by Mithun, Damodar, Kaifulla & Ranjith
          </div>
          <div className="flex gap-6">
            <button onClick={() => navigate('/about')} className="text-slate-400 hover:text-white">Team</button>
            <button onClick={() => navigate('/history')} className="text-slate-400 hover:text-white">History</button>
            <button onClick={() => setIsSettingsOpen(true)} className="text-slate-400 hover:text-white">Settings</button>
          </div>
        </div>
      </footer>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
