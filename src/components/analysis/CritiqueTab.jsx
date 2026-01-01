import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Sparkles, AlertTriangle, Quote, CheckCircle2 } from 'lucide-react';
import { SkeletonGroup } from '../ui/Skeleton';

export default function CritiqueTab({ analysis }) {
  if (!analysis?.strengths && !analysis?.weaknesses) {
    return (
      <div className="space-y-6 p-6">
        <SkeletonGroup count={5} variant="card" />
        <p className="text-center text-slate-600">Analyzing strengths and weaknesses...</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 md:p-8 space-y-12">
      {/* Hero Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 font-medium text-xs mb-3"
        >
          <Sparkles className="w-3 h-3" />
          AI-Powered Critical Analysis
        </motion.div>
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-pink-600 bg-clip-text text-transparent">
          Strengths & Weaknesses
        </h1>
        <p className="text-slate-500 text-sm mt-1 max-w-xl mx-auto">
          Evaluation of methodology, findings, and limitations
        </p>
      </div>

      {/* Strengths Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl blur-md opacity-30"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <ThumbsUp className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-800">Research Strengths</h2>
            <p className="text-slate-500 text-xs">Key methodological strengths</p>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span className="text-emerald-700 font-semibold text-xs">{analysis.strengths?.length || 0} identified</span>
          </div>
        </div>

        <div className="grid gap-4">
          {analysis.strengths?.map((strength, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -2 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden">
                {/* Gradient accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 via-green-500 to-teal-500 rounded-l-2xl"></div>
                
                <div className="flex gap-4 pl-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/30">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 font-semibold text-lg mb-3 leading-relaxed">
                      {strength.point}
                    </p>
                    <div className="flex items-start gap-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                      <Quote className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-emerald-700 italic leading-relaxed">
                        {strength.evidence}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-6 py-2 text-slate-400 text-sm font-medium rounded-full border border-slate-200">
            vs
          </span>
        </div>
      </div>

      {/* Weaknesses Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur-lg opacity-40"></div>
            <div className="relative w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <ThumbsDown className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Weaknesses & Limitations</h2>
            <p className="text-slate-500 text-sm">Areas for improvement and methodological concerns</p>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <span className="text-orange-700 font-semibold text-sm">{analysis.weaknesses?.length || 0} identified</span>
          </div>
        </div>

        <div className="grid gap-4">
          {analysis.weaknesses?.map((weakness, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -2 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-white/80 backdrop-blur-sm border border-orange-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 overflow-hidden">
                {/* Gradient accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 via-red-500 to-pink-500 rounded-l-2xl"></div>
                
                <div className="flex gap-4 pl-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/30">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 font-semibold text-lg mb-3 leading-relaxed">
                      {weakness.point}
                    </p>
                    <div className="flex items-start gap-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                      <Quote className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-orange-700 italic leading-relaxed">
                        {weakness.evidence}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Summary Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-6 bg-gradient-to-r from-slate-50 via-purple-50 to-pink-50 rounded-3xl border border-slate-200"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="text-slate-700 font-medium">Analysis Summary</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600">{analysis.strengths?.length || 0} Strengths</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
              <span className="text-sm text-slate-600">{analysis.weaknesses?.length || 0} Limitations</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
