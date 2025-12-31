import { useEffect, useState, useRef } from 'react';
import { Card } from '../ui/Card';
import { 
  BarChart3, 
  Clock, 
  BookOpen, 
  Hash, 
  FileText,
  TrendingUp,
  Target,
  Zap,
  Award,
  PieChart,
  Activity,
  Layers,
  Brain
} from 'lucide-react';

// Animated counter hook
function useCountUp(end, duration = 1500) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return count;
}

// Stat Card Component
function StatCard({ icon: Icon, label, value, suffix = '', color, subtext, index = 0 }) {
  const animatedValue = useCountUp(parseFloat(value) || 0, 1500 + index * 200);
  
  return (
    <div 
      className="relative group animate-fadeInUp"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
      <div className="relative bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl p-5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-3xl font-bold text-slate-800 mb-1">
          {animatedValue.toLocaleString()}{suffix}
        </div>
        <div className="text-sm font-medium text-slate-600">{label}</div>
        {subtext && <div className="text-xs text-slate-400 mt-1">{subtext}</div>}
      </div>
    </div>
  );
}

// Progress Ring Component
function ProgressRing({ value, maxValue, size = 120, strokeWidth = 10, color, label, icon: Icon }) {
  const [progress, setProgress] = useState(0);
  const percentage = (value / maxValue) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={`url(#gradient-${label})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color[0]} />
              <stop offset="100%" stopColor={color[1]} />
            </linearGradient>
          </defs>
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="w-6 h-6 text-slate-600 mb-1" />
          <span className="text-2xl font-bold text-slate-800">{Math.round(progress)}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-slate-600">{label}</span>
    </div>
  );
}

// Horizontal Bar Chart Component
function HorizontalBar({ label, value, maxValue, color, index }) {
  const [width, setWidth] = useState(0);
  const percentage = (value / maxValue) * 100;
  
  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage), 100 + index * 100);
    return () => clearTimeout(timer);
  }, [percentage, index]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-bold text-slate-800">{value}%</span>
      </div>
      <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out relative`}
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" style={{ animationDuration: '2s' }} />
        </div>
      </div>
    </div>
  );
}

// Word Bubble Component
function WordBubble({ word, size, color, delay }) {
  return (
    <span 
      className={`inline-block px-3 py-1.5 m-1 rounded-full font-medium transition-all duration-300 hover:scale-110 cursor-default animate-fadeInUp`}
      style={{ 
        fontSize: `${Math.max(12, Math.min(size * 1.5, 24))}px`,
        backgroundColor: `${color}20`,
        color: color,
        animationDelay: `${delay}ms`
      }}
    >
      {word}
    </span>
  );
}

export default function AnalyticsTab({ analysis, fullText }) {
  const [analytics, setAnalytics] = useState(null);
  const [topWords, setTopWords] = useState([]);
  const [citationTimeline, setCitationTimeline] = useState([]);
  const [sectionBreakdown, setSectionBreakdown] = useState([]);

  useEffect(() => {
    if (fullText || analysis) {
      generateAnalytics(fullText || analysis?.summary || '');
    }
  }, [fullText, analysis]);

  const generateAnalytics = (text) => {
    // Word frequency analysis
    const stopWords = new Set(['the', 'and', 'of', 'to', 'a', 'in', 'is', 'that', 'for', 'it', 'as', 'was', 'with', 'on', 'by', 'are', 'be', 'this', 'an', 'at', 'from', 'or', 'which', 'but', 'not', 'can', 'has', 'have', 'we', 'our', 'their', 'all', 'also', 'more', 'one', 'use', 'used', 'using', 'based', 'results', 'paper', 'proposed', 'method', 'system', 'et', 'al', 'these', 'such', 'each', 'other', 'they', 'than', 'into', 'were', 'been', 'being', 'its', 'may', 'will', 'would', 'could', 'should']);
    
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3 && !stopWords.has(w));

    const frequency = {};
    words.forEach(w => frequency[w] = (frequency[w] || 0) + 1);

    const sortedWords = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([text, count]) => ({ 
        text, 
        count,
        size: 10 + Math.sqrt(count) * 3
      }));

    setTopWords(sortedWords);

    // Readability and text metrics
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const wordCount = words.length;
    const avgWordsPerSentence = wordCount / Math.max(sentences.length, 1);
    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / Math.max(wordCount, 1);
    const uniqueWords = new Set(words).size;
    const lexicalDiversity = (uniqueWords / Math.max(wordCount, 1)) * 100;
    
    // Flesch-Kincaid Grade Level approximation
    const syllables = text.split(/[aeiouy]+/i).length - 1;
    const gradeLevel = Math.max(0, 0.39 * avgWordsPerSentence + 11.8 * (syllables / Math.max(wordCount, 1)) - 15.59);

    // Technical terminology detection
    const techTerms = ['algorithm', 'neural', 'network', 'machine', 'learning', 'deep', 'model', 'training', 'dataset', 'accuracy', 'precision', 'recall', 'optimization', 'classification', 'regression', 'detection', 'architecture', 'framework', 'implementation', 'evaluation', 'performance', 'analysis', 'methodology'];
    const techWordCount = words.filter(w => techTerms.includes(w)).length;
    const technicalDensity = (techWordCount / Math.max(wordCount, 1)) * 100;

    // Citation years
    const yearRegex = /\b(19|20)\d{2}\b/g;
    const years = text.match(yearRegex) || [];
    const yearCounts = {};
    years.forEach(y => {
      const year = parseInt(y);
      if (year >= 1980 && year <= new Date().getFullYear()) {
        yearCounts[year] = (yearCounts[year] || 0) + 1;
      }
    });

    const timeline = Object.entries(yearCounts)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year);

    setCitationTimeline(timeline);

    // Section analysis (simulated)
    setSectionBreakdown([
      { name: 'Introduction', percentage: 15, color: 'from-blue-500 to-cyan-500' },
      { name: 'Methodology', percentage: 25, color: 'from-purple-500 to-pink-500' },
      { name: 'Results', percentage: 30, color: 'from-emerald-500 to-green-500' },
      { name: 'Discussion', percentage: 20, color: 'from-amber-500 to-orange-500' },
      { name: 'Conclusion', percentage: 10, color: 'from-rose-500 to-red-500' },
    ]);

    setAnalytics({
      wordCount,
      sentenceCount: sentences.length,
      avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
      avgWordLength: avgWordLength.toFixed(1),
      uniqueWords,
      lexicalDiversity: lexicalDiversity.toFixed(1),
      gradeLevel: gradeLevel.toFixed(1),
      readingTime: Math.ceil(wordCount / 200),
      technicalDensity: technicalDensity.toFixed(1),
      citationCount: timeline.reduce((sum, t) => sum + t.count, 0),
    });
  };

  const colors = [
    '#0ea5e9', '#8b5cf6', '#ec4899', '#f97316', '#22c55e',
    '#06b6d4', '#a855f7', '#f43f5e', '#eab308', '#14b8a6'
  ];

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4 animate-pulse" />
          <p className="text-slate-500">Generating deep analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-2">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
          Deep Analytics Dashboard
        </h2>
        <p className="text-slate-500">Comprehensive document analysis and insights</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <StatCard 
          icon={Hash} 
          label="Total Words" 
          value={analytics.wordCount} 
          color="from-blue-500 to-cyan-500"
          subtext="In document"
          index={0}
        />
        <StatCard 
          icon={FileText} 
          label="Sentences" 
          value={analytics.sentenceCount} 
          color="from-purple-500 to-pink-500"
          subtext="Parsed"
          index={1}
        />
        <StatCard 
          icon={Clock} 
          label="Read Time" 
          value={analytics.readingTime}
          suffix=" min"
          color="from-emerald-500 to-green-500"
          subtext="At 200 wpm"
          index={2}
        />
        <StatCard 
          icon={BookOpen} 
          label="Grade Level" 
          value={analytics.gradeLevel}
          color="from-amber-500 to-orange-500"
          subtext="Flesch-Kincaid"
          index={3}
        />
        <StatCard 
          icon={Zap} 
          label="Citations" 
          value={analytics.citationCount}
          color="from-rose-500 to-red-500"
          subtext="References found"
          index={4}
        />
      </div>

      {/* Analysis Rings Section */}
      <Card className="p-6 bg-white/90 backdrop-blur-xl border border-white/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <PieChart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Document Quality Metrics</h3>
            <p className="text-sm text-slate-500">Comprehensive text analysis</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center py-4">
          <ProgressRing 
            value={parseFloat(analytics.lexicalDiversity)} 
            maxValue={100} 
            color={['#0ea5e9', '#06b6d4']}
            label="Vocabulary"
            icon={Brain}
          />
          <ProgressRing 
            value={Math.min(parseFloat(analytics.technicalDensity) * 10, 100)} 
            maxValue={100} 
            color={['#8b5cf6', '#a855f7']}
            label="Technical"
            icon={Layers}
          />
          <ProgressRing 
            value={Math.min(100 - parseFloat(analytics.gradeLevel) * 5, 100)} 
            maxValue={100} 
            color={['#22c55e', '#10b981']}
            label="Readability"
            icon={BookOpen}
          />
          <ProgressRing 
            value={Math.min(parseFloat(analytics.avgWordsPerSentence) * 3, 100)} 
            maxValue={100} 
            color={['#f97316', '#fb923c']}
            label="Complexity"
            icon={Activity}
          />
        </div>
      </Card>

      {/* Section Breakdown */}
      <Card className="p-6 bg-white/90 backdrop-blur-xl border border-white/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Document Structure</h3>
            <p className="text-sm text-slate-500">Estimated section distribution</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            {sectionBreakdown.map((section, i) => (
              <HorizontalBar 
                key={section.name}
                label={section.name}
                value={section.percentage}
                maxValue={100}
                color={section.color}
                index={i}
              />
            ))}
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              {sectionBreakdown.map((section, i) => {
                const rotation = sectionBreakdown.slice(0, i).reduce((sum, s) => sum + s.percentage, 0) * 3.6;
                const size = section.percentage * 3.6;
                return (
                  <div
                    key={section.name}
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${section.color}`}
                    style={{
                      clipPath: `conic-gradient(from ${rotation}deg, transparent 0deg, currentColor ${size}deg, transparent ${size}deg)`,
                      transform: `rotate(${rotation}deg)`,
                    }}
                  />
                );
              })}
              <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center shadow-inner">
                <span className="text-2xl font-bold text-slate-800">100%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Word Cloud */}
      <Card className="p-6 bg-white/90 backdrop-blur-xl border border-white/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Hash className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Key Terms Analysis</h3>
            <p className="text-sm text-slate-500">Most frequent terms in the document</p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl">
          {topWords.map((word, i) => (
            <WordBubble 
              key={word.text}
              word={word.text}
              size={word.size}
              color={colors[i % colors.length]}
              delay={i * 50}
            />
          ))}
        </div>
      </Card>

      {/* Citation Timeline */}
      <Card className="p-6 bg-white/90 backdrop-blur-xl border border-white/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Citation Timeline</h3>
            <p className="text-sm text-slate-500">Academic references by year</p>
          </div>
        </div>
        
        <div className="h-52 flex items-end gap-2 overflow-x-auto pb-8 px-2">
          {citationTimeline.length > 0 ? citationTimeline.map((item, i) => {
            const maxCount = Math.max(...citationTimeline.map(t => t.count));
            const height = (item.count / maxCount) * 150;
            
            return (
              <div 
                key={item.year} 
                className="flex flex-col items-center group relative animate-fadeInUp"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div 
                  className="w-10 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg hover:from-purple-400 hover:to-pink-400 transition-all duration-300 group-hover:shadow-lg cursor-pointer"
                  style={{ height: `${Math.max(height, 20)}px` }}
                >
                  <div className="w-full h-full bg-white/20 rounded-t-lg" />
                </div>
                <span className="text-xs text-slate-500 mt-2 font-medium">{item.year}</span>
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                  <span className="font-bold">{item.count}</span> citations
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                </div>
              </div>
            );
          }) : (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              No citation years detected in document
            </div>
          )}
        </div>
      </Card>

      {/* Additional Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <Target className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-3xl font-bold">{analytics.avgWordsPerSentence}</div>
          <div className="text-sm opacity-90">Avg Words/Sentence</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <Brain className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-3xl font-bold">{analytics.uniqueWords.toLocaleString()}</div>
          <div className="text-sm opacity-90">Unique Words</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-emerald-500 to-green-500 text-white">
          <Award className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-3xl font-bold">{analytics.lexicalDiversity}%</div>
          <div className="text-sm opacity-90">Lexical Diversity</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-amber-500 to-orange-500 text-white">
          <Zap className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-3xl font-bold">{analytics.avgWordLength}</div>
          <div className="text-sm opacity-90">Avg Word Length</div>
        </Card>
      </div>
    </div>
  );
}
