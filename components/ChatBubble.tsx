
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ModelProvider } from '../types';
import { User, Sparkles, Bot } from 'lucide-react';

interface ChatBubbleProps {
  content: string;
  provider: ModelProvider;
  isLoading?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ content, provider, isLoading }) => {
  const isUser = provider === ModelProvider.USER;

  if (isLoading) {
    return (
      <div className="w-full bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-8 animate-pulse flex flex-col space-y-4">
        <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
        <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
        <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
      </div>
    );
  }

  // Common Styles for Markdown Content
  // Optimized for readability: Larger font, wider line-height, distinct headers
  const markdownStyles = `
    prose prose-invert max-w-none
    prose-p:text-[16px] md:prose-p:text-[17px] prose-p:leading-[1.8] prose-p:text-zinc-300 prose-p:mb-6
    prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight prose-headings:mt-8 prose-headings:mb-4
    prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
    prose-strong:text-white prose-strong:font-extrabold prose-strong:bg-white/5 prose-strong:px-1 prose-strong:rounded
    prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
    prose-li:text-zinc-300 prose-li:mb-2 prose-li:marker:text-zinc-500
    prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-emerald-300 prose-code:font-mono prose-code:text-sm
    prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:p-5 prose-pre:rounded-xl prose-pre:shadow-inner prose-pre:my-6
    prose-blockquote:border-l-4 prose-blockquote:border-zinc-700 prose-blockquote:bg-zinc-900/30 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:text-zinc-400 prose-blockquote:italic
    prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
    prose-hr:border-zinc-800 prose-hr:my-8
  `;

  if (isUser) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-12 animate-fade-in-up">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
            <User size={20} className="text-zinc-400" />
          </div>
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden group">
            {/* Subtle glow effect */}
            <div className="absolute top-0 left-0 w-1 h-full bg-zinc-700"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-zinc-800/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
            
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              User Question
            </h3>
            <div className="text-lg md:text-xl font-medium text-white leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AI Response Styles (Report Card Style)
  const isGemini = provider === ModelProvider.GEMINI;
  const borderColor = isGemini ? "border-blue-500/30" : "border-emerald-500/30";
  const accentColor = isGemini ? "bg-blue-500" : "bg-emerald-500";
  const shadowColor = isGemini ? "shadow-blue-900/5" : "shadow-emerald-900/5";

  return (
    <div className={`w-full h-full animate-fade-in-up flex flex-col`}>
      <div className={`flex-1 bg-zinc-900/40 backdrop-blur-sm border ${borderColor} border-t-0 rounded-xl shadow-xl ${shadowColor} overflow-hidden relative group`}>
        {/* Top Accent Bar */}
        <div className={`absolute top-0 left-0 w-full h-1 ${accentColor} opacity-70`}></div>
        
        {/* Background Hover Effect */}
        <div className={`absolute inset-0 bg-gradient-to-b ${isGemini ? 'from-blue-900/5' : 'from-emerald-900/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

        <div className="p-6 md:p-8">
           <div className={markdownStyles}>
             <ReactMarkdown>{content}</ReactMarkdown>
           </div>
        </div>
      </div>
    </div>
  );
};
