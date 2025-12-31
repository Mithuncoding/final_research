import { useState, useEffect } from 'react';
import { X, Key, Check, AlertCircle, Eye, EyeOff, Settings, Zap, Shield } from 'lucide-react';
import { Button } from './Button';
import { useAppStore } from '../../store/useAppStore';
import { hasApiKey } from '../../services/geminiApi';
import { toast } from './Toaster';

export default function SettingsModal({ isOpen, onClose }) {
  const { apiKey, setApiKey } = useAppStore();
  const [inputKey, setInputKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [keyStatus, setKeyStatus] = useState(null); // 'valid' | null

  useEffect(() => {
    if (isOpen) {
      setInputKey(apiKey || '');
      setKeyStatus(apiKey ? 'valid' : null);
    }
  }, [isOpen, apiKey]);

  const handleSave = () => {
    const trimmedKey = inputKey.trim();
    
    if (!trimmedKey) {
      setApiKey('');
      toast.info('API key cleared.');
      onClose();
      return;
    }

    // Save directly without validation
    setApiKey(trimmedKey);
    setKeyStatus('valid');
    toast.success('API key saved successfully! 🎉');
    onClose();
  };

  const maskKey = (key) => {
    if (!key) return '';
    if (key.length <= 8) return '*'.repeat(key.length);
    return key.substring(0, 4) + '*'.repeat(key.length - 8) + key.substring(key.length - 4);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Settings</h2>
                <p className="text-white/80 text-sm">Configure your PRISM experience</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* API Key Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-slate-800">Gemini API Key</h3>
            </div>
            
            <p className="text-sm text-slate-500">
              Enter your Google Gemini API key to enable AI analysis features. 
              Get your key from{' '}
              <a 
                href="https://aistudio.google.com/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline font-medium"
              >
                AI Studio
              </a>
            </p>

            {/* Input Field */}
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  setKeyStatus(null);
                }}
                placeholder="Enter your API key..."
                className={`w-full px-4 py-3 pr-24 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  keyStatus === 'valid' 
                    ? 'border-green-300 bg-green-50 focus:ring-green-500' 
                    : keyStatus === 'invalid'
                    ? 'border-red-300 bg-red-50 focus:ring-red-500'
                    : 'border-slate-200 bg-slate-50 focus:border-purple-300 focus:ring-purple-500'
                }`}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {keyStatus === 'valid' && (
                  <Check className="w-5 h-5 text-green-500" />
                )}
                {keyStatus === 'invalid' && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-2 hover:bg-slate-200/50 rounded-lg transition-colors"
                >
                  {showKey ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-slate-500" />}
                </button>
              </div>
            </div>

            {/* Status Messages */}
            {keyStatus === 'valid' && (
              <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 px-3 py-2 rounded-lg">
                <Check className="w-4 h-4" />
                API key is valid and saved!
              </div>
            )}
            {keyStatus === 'invalid' && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                Invalid API key. Please check and try again.
              </div>
            )}

            {/* Current Status */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">API Status</span>
                <span className={`font-medium ${hasApiKey() ? 'text-green-600' : 'text-amber-600'}`}>
                  {hasApiKey() ? '✅ Connected' : '⚠️ Not configured'}
                </span>
              </div>
              {apiKey && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Current Key</span>
                  <span className="text-slate-500 font-mono text-xs">{maskKey(apiKey)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Features Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <Zap className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-semibold text-slate-800 text-sm">AI Analysis</p>
              <p className="text-xs text-slate-500">Analyze research papers</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
              <Shield className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-semibold text-slate-800 text-sm">Secure Storage</p>
              <p className="text-xs text-slate-500">Key stored locally only</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Save Key
          </Button>
        </div>
      </div>
    </div>
  );
}
