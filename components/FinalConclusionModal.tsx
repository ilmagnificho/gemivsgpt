import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Copy, Check, Sparkles } from 'lucide-react';
import { ModelProvider } from '../types';

interface FinalConclusionModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  provider: ModelProvider;
  title: string;
}

export const FinalConclusionModal: React.FC<FinalConclusionModalProps> = ({
  isOpen, onClose, content, provider, title
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isGemini = provider === ModelProvider.GEMINI;
  // Dynamic Styles based on provider
  const themeColor = isGemini ? "blue" : "emerald";
  const bgGradient = isGemini 
    ? "from-blue-900/50 to-indigo-900/50" 
    : "from-emerald-900/50 to-teal-900/50";
  const borderColor = isGemini ? "border-blue-500/50" : "border-emerald-500/50";
  const textColor = isGemini ? "text-blue-400" : "text-emerald-400";

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 md:p-6 bg-black/95 backdrop-blur-xl animate-fade-in-up">
      <div className={`w-full h-full md:max-w-5xl md:max-h-[90vh] flex flex-col bg-zinc-950 md:border ${borderColor} md:rounded-3xl shadow-2xl relative overflow-hidden`}>
        
        {/* Background Effects */}
        <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-10 pointer-events-none`}></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10"></div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/50 bg-zinc-900/80 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-lg bg-${themeColor}-500/10 border border-${themeColor}-500/20`}>
                <Sparkles size={20} className={textColor} />
             </div>
             <h2 className={`text-xl font-bold uppercase tracking-wider ${textColor}`}>
               {title}
             </h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleCopy}
              className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors border border-transparent hover:border-zinc-700"
              title="Copy text"
            >
              {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            </button>
            <button 
              onClick={onClose}
              className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors border border-transparent hover:border-zinc-700"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 relative z-10 custom-scrollbar scroll-smooth">
           <div className="max-w-4xl mx-auto">
              <div className="prose prose-invert prose-lg md:prose-xl max-w-none 
                prose-headings:font-bold prose-headings:text-zinc-100 prose-headings:tracking-tight
                prose-p:text-zinc-300 prose-p:leading-8 prose-p:mb-6
                prose-li:text-zinc-300 prose-li:mb-2
                prose-strong:text-white prose-strong:font-extrabold
                prose-blockquote:border-l-4 prose-blockquote:border-zinc-700 prose-blockquote:bg-zinc-900/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-blue-300 prose-code:font-mono
                prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:p-6 prose-pre:rounded-xl prose-pre:shadow-inner
                prose-hr:border-zinc-800 prose-hr:my-10">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-md flex justify-end relative z-20">
          <button 
            onClick={onClose}
            className="px-8 py-3 rounded-xl font-bold text-sm bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all shadow-lg hover:shadow-xl border border-zinc-700/50"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};