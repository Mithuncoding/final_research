import { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Card } from '../ui/Card';
import { Type, AlignLeft, Search } from 'lucide-react';

export default function ReaderTab({ fullText }) {
  const [fontSize, setFontSize] = useState(16);
  const [searchTerm, setSearchTerm] = useState('');
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: contentRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Highlight search terms
  const getHighlightedText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <span key={i} className="bg-yellow-200 text-slate-900 font-semibold px-1 rounded">{part}</span> : part
    );
  };

  // Estimate reading time
  const readingTime = Math.ceil((fullText?.split(/\s+/).length || 0) / 200);

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200 -mx-6 px-6 py-4 rounded-t-xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Reading Mode</h2>
          <span className="text-xs text-slate-400">{readingTime} min read</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-prism-600 to-purple-600 origin-left"
            style={{ scaleX }}
          />
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              className="p-1 hover:bg-white rounded transition-colors text-slate-600"
            >
              <Type className="w-3 h-3" />
            </button>
            <span className="text-xs font-mono w-6 text-center">{fontSize}</span>
            <button 
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              className="p-1 hover:bg-white rounded transition-colors text-slate-600"
            >
              <Type className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Find in text..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-prism-500 w-48"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <Card className="p-8 md:p-12 min-h-[500px] bg-white">
        <div 
          ref={contentRef}
          className="h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
        >
          <div 
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-serif"
            style={{ fontSize: `${fontSize}px` }}
          >
            {fullText ? (
              fullText.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4 text-justify">
                  {getHighlightedText(paragraph, searchTerm)}
                </p>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <AlignLeft className="w-12 h-12 mb-4 opacity-50" />
                <p>No text content available</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
