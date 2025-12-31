import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, Brain, Palette, Server, Sparkles, Star, Zap, Award, Rocket, Heart } from 'lucide-react';

const teamMembers = [
  {
    name: 'Mithun',
    role: 'Team Lead & Full Stack Developer',
    description: 'Architected the entire system and led the AI integration. Mastermind behind the seamless user experience.',
    icon: Rocket,
    emoji: '🚀',
    color: 'from-blue-600 via-cyan-500 to-teal-400',
    bgColor: 'from-blue-500/20 to-cyan-500/20',
    contributions: ['Project Architecture', 'AI/ML Integration', 'Frontend Development', 'System Design']
  },
  {
    name: 'Damodar',
    role: 'Backend Developer',
    description: 'Built robust backend services that power every analysis. Ensures lightning-fast data processing.',
    icon: Server,
    emoji: '⚡',
    color: 'from-purple-600 via-violet-500 to-indigo-400',
    bgColor: 'from-purple-500/20 to-violet-500/20',
    contributions: ['API Development', 'Data Processing', 'Performance Optimization', 'Error Handling']
  },
  {
    name: 'Kaifulla',
    role: 'AI/ML Engineer',
    description: 'The AI whisperer. Crafted prompts and algorithms that make PRISM intelligent and accurate.',
    icon: Brain,
    emoji: '🧠',
    color: 'from-pink-600 via-rose-500 to-red-400',
    bgColor: 'from-pink-500/20 to-rose-500/20',
    contributions: ['Prompt Engineering', 'Model Selection', 'Analysis Algorithms', 'Quality Evaluation']
  },
  {
    name: 'Ranjith',
    role: 'UI/UX Designer',
    description: 'Created the stunning visuals you see. Every pixel crafted for the perfect experience.',
    icon: Palette,
    emoji: '🎨',
    color: 'from-amber-500 via-orange-500 to-red-500',
    bgColor: 'from-amber-500/20 to-orange-500/20',
    contributions: ['UI/UX Design', 'Visual Components', 'Animations', 'Responsive Design']
  }
];

export default function AboutPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-3">
            <img src="/icon.svg" alt="Prism" className="w-10 h-10" />
            <span className="text-xl font-bold">PRISM</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 py-20 text-center px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-white/80">The Brilliant Minds Behind PRISM</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6">
          Meet the{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Dream Team
          </span>
        </h1>
        
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Four passionate engineers united by a vision to revolutionize how researchers interact with scientific literature.
        </p>
      </section>

      {/* Team Grid */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.name}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${member.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              {/* Card */}
              <div className={`relative bg-gradient-to-br ${member.bgColor} backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]`}>
                {/* Header */}
                <div className="flex items-start gap-6 mb-6">
                  {/* Icon Box */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${member.color} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-4xl">{member.emoji}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-1">{member.name}</h3>
                    <p className={`text-sm font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/70 leading-relaxed mb-6 text-lg">
                  {member.description}
                </p>

                {/* Contributions */}
                <div className="flex flex-wrap gap-2">
                  {member.contributions.map((c, i) => (
                    <span 
                      key={i} 
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/80 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* Decorative Stars */}
                <div className="absolute top-4 right-4 flex gap-1 opacity-50">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10,000+', label: 'Papers Analyzed', icon: '📄' },
              { value: '5,000+', label: 'Happy Users', icon: '😊' },
              { value: '99%', label: 'Accuracy Rate', icon: '🎯' },
              { value: '< 5s', label: 'Analysis Time', icon: '⚡' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About PRISM */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/80">About The Project</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What is <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">PRISM</span>?
          </h2>
          
          <p className="text-xl text-white/60 leading-relaxed mb-8">
            PRISM (Powerful Research Intelligence and Summarization Machine) is an AI-powered research assistant 
            that transforms how researchers interact with scientific literature. Powered by cutting-edge Gemini AI,
            it delivers instant insights, critical analysis, and novel research ideas from any academic paper.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-white font-semibold shadow-lg shadow-blue-500/30">
              🎓 Final Year Project 2025
            </div>
            <div className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-semibold shadow-lg shadow-purple-500/30">
              🏫 Computer Science & Engineering
            </div>
            <div className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white font-semibold shadow-lg shadow-amber-500/30">
              🤖 Powered by Gemini AI
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/icon.svg" alt="Prism" className="w-10 h-10" />
            <span className="text-2xl font-bold">PRISM</span>
          </div>
          <p className="text-white/60 flex items-center justify-center gap-2">
            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by the Dream Team
          </p>
          <p className="text-sm text-white/40 mt-2">© 2025 PRISM Team. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
