import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User as UserIcon, RefreshCw, Sparkles, MessageCircle, Zap, HelpCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { streamChatResponse, hasApiKey } from '../../services/geminiApi';
import { toast } from '../ui/Toaster';

/**
 * ENHANCED CHAT INTERFACE
 * - Handles streaming responses
 * - Suggested questions
 * - Better UI/UX
 * - API key check
 */
export default function ChatInterface({ paperContext, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Suggested questions based on paper context
  const suggestedQuestions = [
    "What is the main contribution of this paper?",
    "Explain the methodology in simple terms",
    "What are the key limitations?",
    "How does this compare to previous work?",
    "What are potential future research directions?",
  ];

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0 && paperContext) {
      resetChat();
    }
  }, [paperContext]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const resetChat = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: `👋 Hi! I'm your Research Assistant.\n\nI've analyzed **"${paperContext?.title || 'this paper'}"** and I'm ready to answer your questions!\n\nTry asking about:\n• The methodology used\n• Key findings and their implications\n• Strengths and limitations\n• Future research directions`
    }]);
  };

  const handleSend = async (customInput = null) => {
    const userInput = (customInput || input).trim();
    if (!userInput || isLoading) return;

    // Check for API key
    if (!hasApiKey()) {
      toast.error('Please set your API key in Settings first!');
      return;
    }

    // 1. Add User Message
    const userMsg = { id: Date.now(), role: 'user', content: userInput };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // 2. Prepare Context & System Prompt
    const systemPrompt = buildSystemPrompt(paperContext);
    
    // 3. Prepare API Messages (History + Current)
    const history = messages
      .filter(m => m.id !== 'welcome' && !m.isError)
      .slice(-10)
      .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', content: m.content }));

    const apiMessages = [
      { role: 'user', content: systemPrompt },
      { role: 'model', content: 'I understand. I will answer questions based strictly on the provided paper context.' },
      ...history,
      { role: 'user', content: userInput }
    ];

    // 4. Create Placeholder for Assistant Response
    const assistantMsgId = Date.now() + 1;
    setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '' }]);

    try {
      let fullResponse = '';
      
      await streamChatResponse(apiMessages, (chunk) => {
        fullResponse += chunk;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMsgId ? { ...msg, content: fullResponse } : msg
          )
        );
      });

    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMsgId 
            ? { ...msg, content: '😔 Sorry, I encountered an error. This might be due to:\n\n• Invalid API key\n• Rate limiting\n• Network issues\n\nPlease check your API key in Settings and try again.', isError: true } 
            : msg
        )
      );
      toast.error('Failed to get response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (question) => {
    handleSend(question);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-end sm:p-6 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full sm:max-w-lg lg:max-w-xl h-[85vh] sm:h-[650px] bg-white sm:rounded-3xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Research Assistant</h3>
                <p className="text-white/80 text-xs line-clamp-1 max-w-[200px]">{paperContext?.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={resetChat}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
                title="Reset Chat"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-slate-50 to-white scroll-smooth">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                  : 'bg-gradient-to-br from-slate-700 to-slate-900 text-white'
              }`}>
                {msg.role === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div className={`flex-1 max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-tr-sm'
                    : msg.isError
                    ? 'bg-red-50 text-red-800 border border-red-200 rounded-tl-sm'
                    : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm'
                }`}>
                  <div className="whitespace-pre-wrap markdown-body">
                    {msg.content || <span className="animate-pulse flex items-center gap-2"><Sparkles className="w-4 h-4" /> Thinking...</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Suggested Questions (show only at start) */}
          {messages.length === 1 && !isLoading && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-3 h-3" />
                Suggested Questions
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 3).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="text-xs px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full border border-purple-200 hover:from-purple-100 hover:to-pink-100 hover:border-purple-300 transition-all hover:shadow-md"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2 items-end bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask anything about this paper..."
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none text-sm max-h-32 py-2 px-3 placeholder:text-slate-400"
              rows={1}
              style={{ minHeight: '44px' }}
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSend()} 
              disabled={isLoading || !input.trim()}
              size="sm"
              className={`mb-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl shadow-md ${!input.trim() ? 'opacity-50' : ''}`}
            >
              {isLoading ? <Spinner size="sm" className="text-white" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Powered by Gemini AI
            </p>
            <p className="text-[10px] text-slate-400">
              Press Enter to send
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to build the strict system prompt
function buildSystemPrompt(paper) {
  if (!paper) return "You are a helpful assistant.";

  const contextParts = [
    `TITLE: ${paper.title}`,
    `SUMMARY: ${paper.summary}`,
    `METHODOLOGY: ${paper.methodology}`,
  ];

  if (paper.keyFindings && Array.isArray(paper.keyFindings)) {
    const findings = paper.keyFindings.map(f => typeof f === 'string' ? f : f.finding).join('\n- ');
    contextParts.push(`KEY FINDINGS:\n- ${findings}`);
  }

  if (paper.strengths && Array.isArray(paper.strengths)) {
    const strengths = paper.strengths.map(s => typeof s === 'string' ? s : s.point).join('\n- ');
    contextParts.push(`STRENGTHS:\n- ${strengths}`);
  }

  if (paper.weaknesses && Array.isArray(paper.weaknesses)) {
    const weaknesses = paper.weaknesses.map(w => typeof w === 'string' ? w : w.point).join('\n- ');
    contextParts.push(`LIMITATIONS:\n- ${weaknesses}`);
  }

  if (paper.fullText) {
    // Truncate full text to ~10k chars
    contextParts.push(`FULL TEXT EXCERPT:\n${paper.fullText.substring(0, 10000)}...`);
  }

  return `
You are an expert research assistant helping a user understand the academic paper titled "${paper.title}".

CONTEXT:
${contextParts.join('\n\n')}

INSTRUCTIONS:
1. Answer questions ONLY based on the provided context.
2. If the answer is not in the context, say "I cannot find that information in the paper."
3. Be concise, professional, and helpful.
4. Do not hallucinate facts not present in the paper.
5. Use markdown for formatting (bold, lists, etc.).
6. Be conversational and friendly while maintaining accuracy.
7. When explaining complex concepts, use analogies when helpful.
`;
}
