
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ModelProvider } from '../types';

interface ChatBubbleProps {
  content: string;
  provider: ModelProvider;
  isLoading?: boolean;
}

// Reuse SVG components (Inline for portability in this file setup)
const GeminiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3C16 3 17 9 21 12C17 15 16 21 16 21C16 21 15 15 11 12C15 9 16 3 16 3Z" fill="#4b90ff" />
    <path d="M8 8C8 8 8.5 11 10.5 12.5C8.5 14 8 17 8 17C8 17 7.5 14 5.5 12.5C7.5 11 8 8 8 8Z" fill="#ff5546" opacity="0.8" />
  </svg>
);

const GPTIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
     <path d="M20.2 12.0001C20.2 11.2376 20.0625 10.5126 19.8125 9.83762C20.6625 9.11262 21.2 8.01262 21.2 6.80012C21.2 4.47512 19.325 2.60012 17 2.60012C15.825 2.60012 14.775 3.08762 14 3.86262C13.2375 2.91262 12.1 2.30012 10.825 2.22512C10.7 2.21262 10.5875 2.20012 10.45 2.20012C7.9625 2.20012 5.95 4.21262 5.95 6.70012C5.95 6.78762 5.95 6.86262 5.9625 6.95012C4.525 7.15012 3.325 8.08762 2.725 9.38762C1.65 9.81262 0.9 10.8626 0.9 12.1001C0.9 13.8251 2.1 15.2626 3.7125 15.6126C3.7 15.7376 3.7 15.8751 3.7 16.0001C3.7 18.5251 5.75 20.5751 8.275 20.5751C9.625 20.5751 10.8375 19.9626 11.6625 19.0126C12.35 19.7876 13.35 20.2751 14.4625 20.4001L14.725 20.4126C17.1875 20.4126 19.2 18.4251 19.2 15.9626C19.2 15.8251 19.1875 15.6876 19.1625 15.5501C20.5875 15.3126 21.7625 14.3376 22.3375 13.0126C23.1125 11.4376 22.1875 9.61262 20.2 12.0001ZM11.1625 17.5126C9.9 17.5126 8.875 16.4876 8.875 15.2251C8.875 15.0501 8.9 14.8876 8.9375 14.7251L9.6125 12.6376L8.0375 13.3876C7.0375 13.8626 5.8375 13.4376 5.3625 12.4376C4.8875 11.4376 5.3125 10.2376 6.3125 9.76262L10.05 8.00012L9.4125 5.51262C9.1375 4.43762 9.7875 3.35012 10.8625 3.07512C11.9375 2.80012 13.025 3.45012 13.3 4.52512L13.975 7.15012L15.9 5.48762C16.75 4.76262 18.0125 4.86262 18.7375 5.71262C19.4625 6.56262 19.3625 7.82512 18.5125 8.55012L15.8625 10.8376L18.3375 10.5126C19.4375 10.3626 20.45 11.1251 20.6 12.2251C20.75 13.3251 19.9875 14.3376 18.8875 14.4876L15.1125 15.0001L15.7 17.3626C15.9625 18.4126 15.3375 19.4876 14.2875 19.7501C13.2375 20.0126 12.1625 19.3876 11.9 18.3376L11.1625 17.5126Z"/>
     <path d="M11.9625 13.5251C12.8047 13.5251 13.4875 12.8423 13.4875 12.0001C13.4875 11.1579 12.8047 10.4751 11.9625 10.4751C11.1204 10.4751 10.4375 11.1579 10.4375 12.0001C10.4375 12.8423 11.1204 13.5251 11.9625 13.5251Z" />
  </svg>
);

export const ChatBubble: React.FC<ChatBubbleProps> = ({ content, provider, isLoading }) => {
  const isUser = provider === ModelProvider.USER;

  if (isLoading) {
    return (
      <div className="flex space-x-2 p-4 animate-pulse opacity-70">
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    );
  }

  // Styles based on provider - Using Zinc for neutral styling
  let containerClass = "p-4 rounded-2xl leading-relaxed text-sm md:text-base break-words shadow-sm transition-all duration-300";
  let wrapperClass = "animate-fade-in-up";

  switch (provider) {
    case ModelProvider.USER:
      wrapperClass += " flex justify-end w-full mb-6";
      containerClass += " bg-zinc-700 text-zinc-50 max-w-[85%] rounded-tr-sm border border-zinc-600";
      break;
    case ModelProvider.GEMINI:
      wrapperClass += " w-full mb-4";
      // Neutral card with slight blue hint on hover/border only
      containerClass += " bg-zinc-800/80 text-zinc-200 border border-zinc-700/50 hover:border-blue-500/30 hover:bg-zinc-800";
      break;
    case ModelProvider.GPT:
      wrapperClass += " w-full mb-4";
      // Neutral card with slight green hint on hover/border only
      containerClass += " bg-zinc-800/80 text-zinc-200 border border-zinc-700/50 hover:border-emerald-500/30 hover:bg-zinc-800";
      break;
    case ModelProvider.SYSTEM:
      wrapperClass += " w-full mt-4 p-1";
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
             {/* Simple provider indicator for bubbles - OPTIONAL, usually context is enough, but icons are nice */}
             {/* Uncomment below if you want icons INSIDE the bubbles too
             <div className="absolute -top-6 -left-2 opacity-50">
                {provider === ModelProvider.GEMINI ? <GeminiIcon /> : <GPTIcon />}
             </div> 
             */}
             
            <div className="prose prose-invert prose-sm max-w-none prose-p:my-2 prose-headings:text-zinc-100 prose-a:text-blue-400 prose-code:bg-zinc-900 prose-code:px-1 prose-code:rounded prose-code:text-zinc-200 prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
