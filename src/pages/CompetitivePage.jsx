import { useNavigate } from 'react-router-dom';
import { Shield, Brain, Sparkles, Star, ArrowLeft } from 'lucide-react';

export default function CompetitivePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <img src="/icon.svg" alt="Prism" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold text-slate-900">Competitive Advantage</h1>
                <p className="text-xs text-slate-600">Why PRISM Leads the Market</p>
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full text-sm hover:shadow-lg transition-all">
            Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
              <Star className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">Competitive Analysis</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Why PRISM is the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Clear Winner</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Don&apos;t settle for generic tools. See how PRISM outperforms every competitor in the market.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <th className="py-6 px-6 text-left text-lg font-bold">Feature</th>
                    <th className="py-6 px-4 text-center">
                      <div className="flex flex-col items-center">
                        <div className="text-xl font-bold mb-1">PRISM</div>
                        <div className="text-xs opacity-90">(Our Solution)</div>
                      </div>
                    </th>
                    <th className="py-6 px-4 text-center border-l border-white/20">
                      <div className="text-base font-semibold">ChatGPT</div>
                    </th>
                    <th className="py-6 px-4 text-center border-l border-white/20">
                      <div className="text-base font-semibold">Elicit AI</div>
                    </th>
                    <th className="py-6 px-4 text-center border-l border-white/20">
                      <div className="text-base font-semibold">Semantic Scholar</div>
                    </th>
                    <th className="py-6 px-4 text-center border-l border-white/20">
                      <div className="text-base font-semibold">Google Scholar</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Evidence-Grounded Analysis', prism: true, chatgpt: false, elicit: 'partial', semantic: false, scholar: false },
                    { feature: 'Multi-Paper Synthesis', prism: true, chatgpt: false, elicit: true, semantic: 'partial', scholar: false },
                    { feature: 'Privacy-First (Client-Side)', prism: true, chatgpt: false, elicit: false, semantic: false, scholar: true },
                    { feature: 'AI Chat with Citations', prism: true, chatgpt: 'partial', elicit: false, semantic: false, scholar: false },
                    { feature: 'Hypothesis Generation Lab', prism: true, chatgpt: false, elicit: false, semantic: false, scholar: false },
                    { feature: 'Automated Glossary Extraction', prism: true, chatgpt: false, elicit: false, semantic: false, scholar: false },
                    { feature: 'Peer Review Critique', prism: true, chatgpt: 'partial', elicit: false, semantic: false, scholar: false },
                    { feature: 'Figure Analysis (Multimodal)', prism: true, chatgpt: true, elicit: false, semantic: false, scholar: false },
                    { feature: 'Export to PPTX/PDF/Markdown', prism: true, chatgpt: false, elicit: false, semantic: false, scholar: false },
                    { feature: 'Adaptive Expertise Levels', prism: true, chatgpt: false, elicit: false, semantic: false, scholar: false },
                    { feature: 'Reference Auto-Formatting (APA/BibTeX)', prism: true, chatgpt: 'partial', elicit: false, semantic: true, scholar: 'partial' },
                    { feature: 'Speed (<5 seconds)', prism: true, chatgpt: 'partial', elicit: 'partial', semantic: true, scholar: true },
                    { feature: 'No Sign-Up Required', prism: true, chatgpt: false, elicit: false, semantic: true, scholar: true },
                    { feature: 'Works Offline (After Load)', prism: true, chatgpt: false, elicit: false, semantic: false, scholar: false },
                    { feature: 'Scientific Hallucination Prevention', prism: true, chatgpt: false, elicit: 'partial', semantic: false, scholar: true },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'} hover:bg-blue-50/30 transition-colors`}>
                      <td className="py-5 px-6 font-semibold text-slate-800">{row.feature}</td>
                      
                      {/* PRISM Column - Always green checkmark */}
                      <td className="py-5 px-4 text-center bg-green-50">
                        <div className="flex justify-center">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">✓</span>
                          </div>
                        </div>
                      </td>
                      
                      {/* Competitor columns */}
                      {['chatgpt', 'elicit', 'semantic', 'scholar'].map((competitor, idx) => (
                        <td key={idx} className="py-5 px-4 text-center border-l border-slate-100">
                          <div className="flex justify-center">
                            {row[competitor] === true ? (
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">✓</span>
                              </div>
                            ) : row[competitor] === 'partial' ? (
                              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">~</span>
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-red-500 font-bold text-lg">✕</span>
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
              <div className="flex flex-wrap gap-6 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span className="text-slate-700 font-medium">Fully Supported</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">~</span>
                  </div>
                  <span className="text-slate-700 font-medium">Partially Supported</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-500 font-bold">✕</span>
                  </div>
                  <span className="text-slate-700 font-medium">Not Supported</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Differentiators */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">100% Privacy</h3>
              <p className="text-slate-600">Your research papers never leave your device. All processing happens client-side.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Zero Hallucinations</h3>
              <p className="text-slate-600">Every claim is backed by direct quotes from the paper. No AI-generated fiction.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Complete Workflow</h3>
              <p className="text-slate-600">From reading to ideation to presentation. One tool for your entire research journey.</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of researchers who&apos;ve already made the switch to PRISM
            </p>
            <button onClick={() => navigate('/')} className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all shadow-xl">
              Try PRISM Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
