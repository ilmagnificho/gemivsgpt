
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, RefreshCw, GitCompare, ArrowRight, Globe, CreditCard } from 'lucide-react';
import { ConversationRound, ModelProvider, ChatMessage } from './types';
import { callGeminiAPI } from './services/geminiService';
import { callOpenAIAPI, callOpenAICritique } from './services/openaiService';
import { Button } from './components/Button';
import { ChatBubble } from './components/ChatBubble';
import { AdModal } from './components/AdModal';
import { PricingModal } from './components/PricingModal';
import { translations, Language } from './translations';

// Custom Icons for better brand recognition
const GeminiLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3C16 3 17 9 21 12C17 15 16 21 16 21C16 21 15 15 11 12C15 9 16 3 16 3Z" fill="url(#gemini-gradient-1)" />
    <path d="M8 8C8 8 8.5 11 10.5 12.5C8.5 14 8 17 8 17C8 17 7.5 14 5.5 12.5C7.5 11 8 8 8 8Z" fill="url(#gemini-gradient-2)" opacity="0.8" />
    <defs>
      <linearGradient id="gemini-gradient-1" x1="11" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4b90ff" />
        <stop offset="1" stopColor="#ff5546" />
      </linearGradient>
      <linearGradient id="gemini-gradient-2" x1="5.5" y1="8" x2="10.5" y2="17" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4b90ff" />
        <stop offset="1" stopColor="#ff5546" />
      </linearGradient>
    </defs>
  </svg>
);

const GPTLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.2 12.0001C20.2 11.2376 20.0625 10.5126 19.8125 9.83762C20.6625 9.11262 21.2 8.01262 21.2 6.80012C21.2 4.47512 19.325 2.60012 17 2.60012C15.825 2.60012 14.775 3.08762 14 3.86262C13.2375 2.91262 12.1 2.30012 10.825 2.22512C10.7 2.21262 10.5875 2.20012 10.45 2.20012C7.9625 2.20012 5.95 4.21262 5.95 6.70012C5.95 6.78762 5.95 6.86262 5.9625 6.95012C4.525 7.15012 3.325 8.08762 2.725 9.38762C1.65 9.81262 0.9 10.8626 0.9 12.1001C0.9 13.8251 2.1 15.2626 3.7125 15.6126C3.7 15.7376 3.7 15.8751 3.7 16.0001C3.7 18.5251 5.75 20.5751 8.275 20.5751C9.625 20.5751 10.8375 19.9626 11.6625 19.0126C12.35 19.7876 13.35 20.2751 14.4625 20.4001L14.725 20.4126C17.1875 20.4126 19.2 18.4251 19.2 15.9626C19.2 15.8251 19.1875 15.6876 19.1625 15.5501C20.5875 15.3126 21.7625 14.3376 22.3375 13.0126C23.1125 11.4376 22.1875 9.61262 20.2 12.0001ZM11.1625 17.5126C9.9 17.5126 8.875 16.4876 8.875 15.2251C8.875 15.0501 8.9 14.8876 8.9375 14.7251L9.6125 12.6376L8.0375 13.3876C7.0375 13.8626 5.8375 13.4376 5.3625 12.4376C4.8875 11.4376 5.3125 10.2376 6.3125 9.76262L10.05 8.00012L9.4125 5.51262C9.1375 4.43762 9.7875 3.35012 10.8625 3.07512C11.9375 2.80012 13.025 3.45012 13.3 4.52512L13.975 7.15012L15.9 5.48762C16.75 4.76262 18.0125 4.86262 18.7375 5.71262C19.4625 6.56262 19.3625 7.82512 18.5125 8.55012L15.8625 10.8376L18.3375 10.5126C19.4375 10.3626 20.45 11.1251 20.6 12.2251C20.75 13.3251 19.9875 14.3376 18.8875 14.4876L15.1125 15.0001L15.7 17.3626C15.9625 18.4126 15.3375 19.4876 14.2875 19.7501C13.2375 20.0126 12.1625 19.3876 11.9 18.3376L11.1625 17.5126Z"/>
    <path d="M11.9625 13.5251C12.8047 13.5251 13.4875 12.8423 13.4875 12.0001C13.4875 11.1579 12.8047 10.4751 11.9625 10.4751C11.1204 10.4751 10.4375 11.1579 10.4375 12.0001C10.4375 12.8423 11.1204 13.5251 11.9625 13.5251Z" />
  </svg>
);

export default function App() {
  const [input, setInput] = useState('');
  const [rounds, setRounds] = useState<ConversationRound[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lang, setLang] = useState<Language>('en'); // Default fallback
  
  // Ad & Premium State
  const [showAdModal, setShowAdModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [pendingCritiqueRoundId, setPendingCritiqueRoundId] = useState<string | null>(null);
  
  // TODO: Connect this to actual auth/user state later
  const [isPremium, setIsPremium] = useState(false); 

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Language based on browser
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (['ko', 'zh', 'ja'].includes(browserLang)) {
      setLang(browserLang as Language);
    } else {
      setLang('en');
    }
  }, []);

  const t = translations[lang];
  
  // Track if conversation has started to switch views
  const hasStarted = rounds.length > 0;

  const scrollToBottom = () => {
    if (hasStarted) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [rounds, rounds.length, isProcessing]);

  const getHistoryForContext = (targetRoundId: string | null = null): ChatMessage[] => {
    const history: ChatMessage[] = [];
    for (const round of rounds) {
      if (targetRoundId && round.id === targetRoundId) break;
      history.push({ role: 'user', parts: [{ text: round.userPrompt }] });
      
      // Add synthesis of context implicitly by adding the primary answers
      if (round.geminiResponse) {
         history.push({ role: 'model', parts: [{ text: round.geminiResponse }] });
      }
    }
    return history;
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const newRoundId = Date.now().toString();
    const newRound: ConversationRound = {
      id: newRoundId,
      userPrompt: input,
      geminiResponse: null,
      gptResponse: null,
      isGeminiLoading: true,
      isGptLoading: true,
      isCritiqueLoading: false,
      critiques: [],
      timestamp: Date.now()
    };

    setRounds(prev => [...prev, newRound]);
    const currentInput = input;
    setInput('');
    setIsProcessing(true);

    const history = getHistoryForContext();

    // Trigger both APIs
    // Gemini
    callGeminiAPI(currentInput, history).then(response => {
      setRounds(prev => prev.map(r => 
        r.id === newRoundId ? { ...r, geminiResponse: response, isGeminiLoading: false } : r
      ));
    });

    // GPT (Real API)
    callOpenAIAPI(currentInput).then(response => {
      setRounds(prev => prev.map(r => 
        r.id === newRoundId ? { ...r, gptResponse: response, isGptLoading: false } : r
      ));
    });

    setTimeout(() => {
        setIsProcessing(false);
    }, 1500);
  };

  // Triggered when user clicks "Cross-Check"
  const initiateCritique = (roundId: string) => {
    setPendingCritiqueRoundId(roundId);
    
    // If user is Premium, skip Ad
    if (isPremium) {
      executeCritique(roundId);
    } else {
      setShowAdModal(true);
    }
  };

  // Triggered after Ad is "watched" or if Premium
  const executeCritique = async (directRoundId?: string) => {
    setShowAdModal(false);
    const roundId = directRoundId || pendingCritiqueRoundId;
    if (!roundId) return;

    const round = rounds.find(r => r.id === roundId);
    if (!round || !round.gptResponse || !round.geminiResponse) return;

    setRounds(prev => prev.map(r => r.id === roundId ? { ...r, isCritiqueLoading: true } : r));

    // Construct context including previous critiques
    let previousCritiquesContext = "";
    if (round.critiques.length > 0) {
      previousCritiquesContext = "\n[이전 검증 기록]\n" + round.critiques.map((c, i) => 
        `검증 ${i+1}:\n- Gemini 의견: ${c.geminiContent}\n- GPT 의견: ${c.gptContent}`
      ).join("\n\n");
    }

    const isReverify = round.critiques.length > 0;
    
    // 1. Gemini Critiques GPT
    const geminiCritiquePrompt = `
    [시스템 지시]
    당신은 꼼꼼하고 객관적인 AI 검토자입니다. 
    ${isReverify ? "이전 검증 기록과 답변을 참고하여, 추가적인 보완점이나 놓친 부분을 심층적으로 분석해 주세요." : "아래 상대방(GPT)의 답변을 검토하여 사실 관계 확인 및 보완점을 제안해 주세요."}
    건설적인 피드백을 제공하여 정보의 완성도를 높이는 것이 목표입니다.
    응답 언어는 사용자의 질문과 동일한 언어(${lang})로 작성하세요.
    
    [사용자 질문]
    ${round.userPrompt}

    [상대방(GPT) 답변]
    ${round.gptResponse}

    ${previousCritiquesContext}
    `;

    const geminiPromise = callGeminiAPI(geminiCritiquePrompt, getHistoryForContext(roundId));

    // 2. GPT Critiques Gemini
    const gptPromise = callOpenAICritique(
      round.geminiResponse, 
      round.userPrompt + (previousCritiquesContext ? " REVERIFY" : "")
    );

    const [geminiCritique, gptCritique] = await Promise.all([geminiPromise, gptPromise]);
    
    setRounds(prev => prev.map(r => 
      r.id === roundId ? { 
        ...r, 
        critiques: [...r.critiques, {
          id: Date.now().toString(),
          geminiContent: geminiCritique,
          gptContent: gptCritique,
          timestamp: Date.now()
        }],
        isCritiqueLoading: false 
      } : r
    ));
    
    setPendingCritiqueRoundId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-700/50">
      <AdModal 
        isOpen={showAdModal} 
        onClose={() => setShowAdModal(false)} 
        onAdComplete={() => executeCritique()} 
      />
      
      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        lang={lang}
      />

      {/* Header */}
      <header className={`flex items-center justify-between px-6 py-5 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-500 ${!hasStarted ? 'border-transparent bg-transparent' : ''}`}>
        <div className="flex items-center space-x-4 group cursor-default">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative bg-zinc-900 p-2 rounded-lg border border-zinc-800">
               <GitCompare size={24} className="text-zinc-200 transform group-hover:rotate-180 transition-transform duration-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            <span className="text-blue-500/90">Gemi</span> <span className="text-zinc-600 mx-0.5 font-light">vs</span> <span className="text-emerald-500/90">GPT</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="md" 
            className="text-zinc-400 hover:text-white"
            onClick={() => setShowPricingModal(true)}
            icon={<CreditCard size={18}/>}
          >
            Pricing
          </Button>

          <div className="relative group">
            <button className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors p-2">
              <Globe size={20} />
              <span className="text-sm font-bold uppercase">{lang}</span>
            </button>
            <div className="absolute right-0 mt-2 w-36 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-50">
              {(['en', 'ko', 'zh', 'ja'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`w-full text-left px-5 py-3 text-sm hover:bg-zinc-800 transition-colors ${lang === l ? 'text-blue-400 font-bold' : 'text-zinc-400'}`}
                >
                  {l === 'en' ? 'English' : l === 'ko' ? '한국어' : l === 'zh' ? '中文' : '日本語'}
                </button>
              ))}
            </div>
          </div>
          
          {hasStarted && (
             <Button variant="ghost" size="md" onClick={() => setRounds([])} icon={<RefreshCw size={18}/>}>
               {t.reset}
             </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto w-full max-w-5xl mx-auto transition-all duration-500 ${hasStarted ? 'p-4 md:p-6' : 'flex items-center justify-center p-4'}`}>
        
        {/* HERO SECTION */}
        {!hasStarted && (
          <div className="flex flex-col items-center justify-center w-full max-w-3xl space-y-10 -mt-20 animate-fade-in-up">
            <div className="text-center space-y-6">
              
              <div className="flex justify-center items-center space-x-6 md:space-x-12 mb-8">
                 {/* Gemini Avatar */}
                 <div className="flex flex-col items-center space-y-3">
                     <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition duration-700"></div>
                        <div className="relative w-24 h-24 rounded-3xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
                            <GeminiLogo className="w-14 h-14" />
                        </div>
                     </div>
                     <div className="flex flex-col items-center mt-2">
                        <span className="text-lg font-bold text-zinc-200 tracking-wide">Gemini</span>
                        <span className="text-[10px] font-mono text-blue-400/80 bg-blue-900/10 px-2 py-0.5 rounded border border-blue-900/20 mt-1">
                           gemini-2.5-flash
                        </span>
                     </div>
                 </div>

                 <div className="flex flex-col items-center text-zinc-600 pb-10 px-4">
                    <span className="text-2xl font-light italic text-zinc-700">VS</span>
                 </div>

                 {/* GPT Avatar */}
                 <div className="flex flex-col items-center space-y-3">
                     <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition duration-700"></div>
                        <div className="relative w-24 h-24 rounded-3xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
                             <GPTLogo className="w-12 h-12 text-emerald-500" />
                        </div>
                     </div>
                     <div className="flex flex-col items-center mt-2">
                        <span className="text-lg font-bold text-zinc-200 tracking-wide">ChatGPT</span>
                        <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-900/10 px-2 py-0.5 rounded border border-emerald-900/20 mt-1">
                           gpt-4o
                        </span>
                     </div>
                 </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {t.heroTitle}
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl whitespace-pre-wrap leading-relaxed max-w-xl mx-auto">
                {t.heroDesc}
              </p>
            </div>

            {/* Centered Input */}
            <div className="w-full relative group max-w-2xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-1000 blur-lg"></div>
              <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl flex items-center p-2 shadow-2xl border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.placeholder}
                  className="w-full bg-transparent text-white pl-6 pr-14 py-4 focus:outline-none resize-none placeholder-zinc-500 text-lg font-medium"
                  rows={1}
                  style={{ minHeight: '64px' }}
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CHAT LIST */}
        {hasStarted && (
          <div className="space-y-16">
            {rounds.map((round) => (
              <div key={round.id} className="group relative">
                {/* User Bubble */}
                <ChatBubble content={round.userPrompt} provider={ModelProvider.USER} />

                {/* ORIGINAL RESPONSES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
                  {/* Gemini Column */}
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3 px-2">
                      <div className="flex items-center space-x-2">
                         <GeminiLogo className="w-4 h-4" />
                         <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">{t.geminiName}</span>
                      </div>
                    </div>
                    <ChatBubble 
                      content={round.geminiResponse || ""} 
                      provider={ModelProvider.GEMINI} 
                      isLoading={round.isGeminiLoading}
                    />
                  </div>

                  {/* GPT Column */}
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3 px-2">
                      <div className="flex items-center space-x-2">
                         <GPTLogo className="w-4 h-4 text-emerald-500" />
                         <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">{t.gptName}</span>
                      </div>
                    </div>
                    <ChatBubble 
                      content={round.gptResponse || ""} 
                      provider={ModelProvider.GPT} 
                      isLoading={round.isGptLoading}
                    />
                  </div>
                </div>

                {/* CRITIQUE THREADS - Stacks vertically */}
                {round.critiques.map((critique, index) => (
                  <div key={critique.id} className="animate-fade-in-up mt-8 relative">
                     {/* Thread Connector Line */}
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-8 w-px bg-zinc-800 border-l border-dashed border-zinc-700"></div>
                     <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-zinc-800 border border-zinc-600 z-10"></div>
                     
                     <div className="text-center mb-4">
                       <span className="text-[10px] uppercase font-bold text-zinc-500 bg-zinc-900 px-2 py-1 rounded-full border border-zinc-800">
                         Step {index + 1}
                       </span>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Gemini Critique of GPT */}
                        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 relative overflow-hidden group/critique hover:bg-zinc-900 transition-colors">
                            <div className="flex items-center space-x-2 mb-4 text-blue-400/80 border-b border-zinc-800 pb-2">
                              <GeminiLogo className="w-4 h-4" />
                              <span className="text-xs font-bold uppercase tracking-wider">{t.geminiCritiqueTitle}</span>
                            </div>
                            <div className="text-zinc-300 text-sm leading-relaxed opacity-90">
                              <ReactMarkdown>{critique.geminiContent}</ReactMarkdown>
                            </div>
                        </div>

                        {/* GPT Critique of Gemini */}
                        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 relative overflow-hidden group/critique hover:bg-zinc-900 transition-colors">
                            <div className="flex items-center space-x-2 mb-4 text-emerald-400/80 border-b border-zinc-800 pb-2">
                              <GPTLogo className="w-4 h-4 text-emerald-500" />
                              <span className="text-xs font-bold uppercase tracking-wider">{t.gptCritiqueTitle}</span>
                            </div>
                            <div className="text-zinc-300 text-sm leading-relaxed opacity-90">
                              <ReactMarkdown>{critique.gptContent}</ReactMarkdown>
                            </div>
                        </div>
                     </div>
                  </div>
                ))}

                {/* Loading State for New Critique */}
                {round.isCritiqueLoading && (
                   <div className="mt-8 relative animate-fade-in-up">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-8 w-px bg-zinc-800 border-l border-dashed border-zinc-700"></div>
                      <div className="flex justify-center text-zinc-400 text-sm animate-pulse space-x-3 items-center bg-zinc-900 py-3 px-6 rounded-full w-fit mx-auto border border-zinc-800">
                          <RefreshCw className="animate-spin text-zinc-500" size={16}/>
                          <span className="font-medium text-zinc-400">{t.critiqueLoading}</span>
                      </div>
                   </div>
                )}

                {/* Actions - Always at the bottom of the thread */}
                {!round.isGeminiLoading && !round.isGptLoading && (
                    <div className="flex justify-center mt-12 mb-4 relative z-20">
                      <Button 
                        variant="secondary" 
                        size="md" 
                        icon={<GitCompare size={16} />}
                        onClick={() => initiateCritique(round.id)}
                        disabled={round.isCritiqueLoading}
                        className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 transition-colors shadow-lg shadow-black/20"
                      >
                        {round.critiques.length > 0 ? t.reCritiqueBtn : t.critiqueBtn}
                      </Button>
                    </div>
                )}
                
                <div className="h-px bg-zinc-900 w-full my-16"></div>
              </div>
            ))}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </main>

      {/* Footer Input */}
      {hasStarted && (
        <footer className="p-4 bg-zinc-950/80 backdrop-blur-lg border-t border-zinc-800 z-40">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-2xl opacity-0 group-hover:opacity-30 transition duration-500 blur-sm"></div>
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.placeholder}
                className="w-full bg-zinc-900 text-white rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:ring-1 focus:ring-zinc-700 resize-none border border-zinc-800 placeholder-zinc-500 text-base shadow-xl"
                rows={1}
                style={{ minHeight: '60px' }}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isProcessing}
                className="absolute right-3 top-3 p-2.5 bg-zinc-800 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:bg-transparent"
              >
                {isProcessing ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
          <div className="text-center mt-3">
             <p className="text-[10px] text-zinc-600 font-medium">
               {t.disclaimer}
             </p>
          </div>
        </footer>
      )}
    </div>
  );
}
