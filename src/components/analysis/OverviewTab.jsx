import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, FileText, Target, Microscope, Lightbulb, Quote, ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SkeletonGroup } from '../ui/Skeleton';
import { regenerateSummary } from '../../services/analysisService';
import { toast } from '../ui/Toaster';

export default function OverviewTab({ analysis }) {
  const [customSummary, setCustomSummary] = useState(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [summaryParams, setSummaryParams] = useState({
    persona: 'Engineer',
    length: 'medium',
    depth: 'balanced'
  });

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const result = await regenerateSummary(
        analysis.summary, 
        summaryParams.persona,
        summaryParams.length,
        summaryParams.depth
      );
      setCustomSummary(result.summary);
      toast.success('Summary regenerated!');
    } catch (error) {
      toast.error('Failed to regenerate summary');
    } finally {
      setIsRegenerating(false);
    }
  };

  if (!analysis) {
    return <SkeletonGroup count={10} variant="text" />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-6 md:p-8 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-700 font-medium text-xs mb-3"
        >
          <BookOpen className="w-3 h-3" />
          Complete Research Overview
        </motion.div>
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-purple-600 bg-clip-text text-transparent">
          Paper Analysis
        </h1>
      </div>

      {/* Summary Controls - Compact Design */}
      <motion.div variants={itemVariants}>
        <Card className="p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border border-blue-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">AI Summary Generator</h3>
                <p className="text-xs text-slate-500">Customize the summary for your needs</p>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-3">
              <select 
                className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={summaryParams.persona}
                onChange={(e) => setSummaryParams({...summaryParams, persona: e.target.value})}
              >
                <option value="Student">🎓 Student</option>
                <option value="Engineer">⚙️ Engineer</option>
                <option value="Expert">🔬 Expert</option>
              </select>
              <select 
                className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={summaryParams.length}
                onChange={(e) => setSummaryParams({...summaryParams, length: e.target.value})}
              >
                <option value="short">📝 Short</option>
                <option value="medium">📄 Medium</option>
                <option value="long">📚 Long</option>
              </select>
              <select 
                className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={summaryParams.depth}
                onChange={(e) => setSummaryParams({...summaryParams, depth: e.target.value})}
              >
                <option value="high_level">🌐 High Level</option>
                <option value="balanced">⚖️ Balanced</option>
                <option value="technical">🔧 Technical</option>
              </select>
              <Button 
                onClick={handleRegenerate} 
                disabled={isRegenerating}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
                Generate
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Summary Section */}
      <motion.div variants={itemVariants}>
        <Section 
          title="Executive Summary" 
          icon={<FileText className="w-6 h-6" />}
          gradient="from-blue-500 to-blue-600"
        >
          <p className="text-slate-700 leading-relaxed">
            {customSummary || analysis.summary}
          </p>
        </Section>
      </motion.div>

      {/* Problem Statement */}
      <motion.div variants={itemVariants}>
        <Section 
          title="Problem Statement" 
          icon={<Target className="w-6 h-6" />}
          gradient="from-red-500 to-orange-500"
        >
          <p className="text-slate-700 leading-relaxed">
            {analysis.problemStatement}
          </p>
        </Section>
      </motion.div>

      {/* Methodology */}
      <motion.div variants={itemVariants}>
        <Section 
          title="Research Methodology" 
          icon={<Microscope className="w-6 h-6" />}
          gradient="from-green-500 to-emerald-500"
        >
          <p className="text-slate-700 leading-relaxed">
            {analysis.methodology}
          </p>
        </Section>
      </motion.div>

      {/* Key Findings */}
      <motion.div variants={itemVariants}>
        <Section 
          title="Key Findings" 
          icon={<Lightbulb className="w-6 h-6" />}
          gradient="from-amber-500 to-yellow-500"
        >
          <div className="grid gap-4">
            {analysis.keyFindings?.map((finding, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white border border-amber-100 rounded-2xl p-5 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-amber-500/30">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 text-lg mb-3 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-amber-500" />
                        {typeof finding === 'string' ? finding : finding.finding}
                      </h4>
                      {finding.evidence && (
                        <div className="flex items-start gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-100">
                          <Quote className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-amber-700 italic leading-relaxed">
                            {finding.evidence}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </motion.div>
    </motion.div>
  );
}

function Section({ title, icon, gradient, children }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-lg opacity-40`}></div>
          <div className={`relative w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
            {icon}
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{title}</h2>
      </div>
      <div className="ml-0 md:ml-[4.5rem]">
        {children}
      </div>
    </div>
  );
}
