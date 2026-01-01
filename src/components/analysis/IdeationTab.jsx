import { motion } from 'framer-motion';
import { Lightbulb, FlaskConical, Target, Sparkles, Rocket, Beaker, ArrowRight } from 'lucide-react';
import { SkeletonGroup } from '../ui/Skeleton';

export default function IdeationTab({ analysis }) {
  if (!analysis?.hypotheses) {
    return (
      <div className="space-y-6 p-6">
        <SkeletonGroup count={3} variant="card" />
        <p className="text-center text-slate-600">Generating novel hypotheses and experimental designs...</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <div className="p-6 md:p-8 space-y-10">
      {/* Hero Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative inline-block mb-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-30 animate-pulse"></div>
          <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white rounded-xl shadow-lg shadow-purple-500/20">
            <Lightbulb className="w-4 h-4" />
            <span className="font-semibold text-sm">AI Research Ideation Lab</span>
            <Sparkles className="w-3 h-3 animate-pulse" />
          </div>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-xl mx-auto text-sm"
        >
          Novel hypotheses with experimental designs and expected outcomes
        </motion.p>
      </div>

      {/* Hypotheses Grid */}
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {analysis.hypotheses?.map((hyp, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="group relative"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Card */}
            <div className="relative bg-white/90 backdrop-blur-sm border-2 border-purple-100 hover:border-purple-300 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
              {/* Header with Gradient */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-inner">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                      <Rocket className="w-4 h-4" />
                      Research Hypothesis
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      {hyp.hypothesis}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {/* Experimental Design */}
                <motion.div 
                  className="relative group/section"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-full"></div>
                  <div className="pl-6 py-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <FlaskConical className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-800 text-lg">Experimental Design</h4>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100">
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line">{hyp.experimentalDesign}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Expected Outcome */}
                {hyp.expectedOutcome && (
                  <motion.div 
                    className="relative group/section"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-green-500 rounded-full"></div>
                    <div className="pl-6 py-2">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-bold text-slate-800 text-lg">Expected Outcome</h4>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-5 border border-emerald-100">
                        <p className="text-slate-700 leading-relaxed">{hyp.expectedOutcome}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Beaker className="w-4 h-4" />
                    AI-Generated Research Proposal
                  </div>
                  <div className="flex items-center gap-1 text-purple-600 font-medium text-sm group-hover:gap-2 transition-all">
                    Explore Further <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 rounded-3xl border border-purple-100 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <span className="text-slate-700 font-semibold">Research Ideation Summary</span>
        </div>
        <p className="text-slate-600">
          {analysis.hypotheses?.length || 0} novel hypotheses generated with experimental designs
        </p>
      </motion.div>
    </div>
  );
}
