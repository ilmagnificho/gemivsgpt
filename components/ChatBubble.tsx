
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ModelProvider } from '../types';

interface ChatBubbleProps {
  content: string;
  provider: ModelProvider;
  isLoading?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ content, provider, isLoading }) => {
  const isUser = provider === ModelProvider.USER;

  if (isLoading) {
    return (
      <div className="flex space-x-2 p-6 animate-pulse opacity-70">
        <div className="w-2.5 h-2.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2.5 h-2.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2.5 h-2.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    );
  }

  // Styles based on provider - Using Zinc for neutral styling
  // Increased padding, text size, and line height for better readability
  let containerClass = "p-5 md:p-6 rounded-2xl leading-loose text-[15px] md:text-[16px] break-words shadow-sm transition-all duration-300";
  let wrapperClass = "animate-fade-in-up";

  switch (provider) {
    case ModelProvider.USER:
      wrapperClass += " flex justify-end w-full mb-8";
      containerClass += " bg-zinc-700 text-zinc-50 max-w-[85%] rounded-tr-sm border border-zinc-600 shadow-md";
      break;
    case ModelProvider.GEMINI:
      wrapperClass += " w-full mb-6";
      // Neutral card with slight blue hint on hover/border only
      containerClass += " bg-zinc-800/90 text-zinc-200 border border-zinc-700/60 hover:border-blue-500/40 hover:bg-zinc-800 shadow-md";
      break;
    case ModelProvider.GPT:
      wrapperClass += " w-full mb-6";
      // Neutral card with slight green hint on hover/border only
      containerClass += " bg-zinc-800/90 text-zinc-200 border border-zinc-700/60 hover:border-emerald-500/40 hover:bg-zinc-800 shadow-md";
      break;
    case ModelProvider.SYSTEM:
      wrapperClass += " w-full mt-6 p-2";
      containerClass += " bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-xl shadow-lg";
      break;
  }

  return (
    <div className={wrapperClass}>
      <div className={containerClass}>
        {isUser ? (
          <div className="whitespace-pre-wrap">{content}</div>
        ) : (
          <div className="relative">
            <div className="prose prose-invert prose-base max-w-none 
              prose-p:my-3 prose-p:leading-8
              prose-headings:text-zinc-100 prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-4
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-ul:my-4 prose-li:my-1
              prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-emerald-300 prose-code:font-normal
              prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl prose-pre:shadow-inner">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};