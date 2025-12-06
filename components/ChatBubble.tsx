
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
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
     <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.3829a.7911.7911 0 0 0-.785-.0001l-5.8429 3.3685v-2.3324a.071.071 0 0 1 .0332-.0615l4.8303-2.7914a4.4944 4.4944 0 0 1 6.1408 1.6464 4.4709 4.4709 0 0 1 .5346 3.0137zm2.0738-1.752a4.485 4.485 0 0 1-2.3655 1.9728v-5.6766a.7664.7664 0 0 0-.3879-.6765L12.4432 2.27l2.0201-1.1685a.0757.0757 0 0 1 .071 0l4.8303 2.7865a4.504 4.504 0 0 1 1.6465 4.113zm-9.1507-1.1444l4.5324 2.6105a.1054.1054 0 0 1 .019.1437L9.4357 18.8285a.1101.1101 0 0 1-.1419.019l-4.5324-2.6105a.1054.1054 0 0 1-.019-.1437l6.9741-11.9734a.1101.1101 0 0 1 .1419-.019z"/>
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
