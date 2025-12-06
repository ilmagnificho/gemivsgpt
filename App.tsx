import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, RefreshCw, GitCompare, ArrowRight, Globe, CreditCard, CheckCircle, Sparkles } from 'lucide-react';
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
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
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
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg" 
  >
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.3829a.7911.7911 0 0 0-.785-.0001l-5.8429 3.3685v-2.3324a.071.071 0 0 1 .0332-.0615l4.8303-2.7914a4.4944 4.4944 0 0 1 6.1408 1.6464 4.4709 4.4709 0 0 1 .5346 3.0137zm2.0738-1.752a4.485 4.485 0 0 1-2.3655 1.9728v-5.6766a.7664.7664 0 0 0-.3879-.6765L12.4432 2.27l2.0201-1.1685a.0757.0757 0 0 1 .071 0l4.8303 2.7865a4.504 4.504 0 0 1 1.6465 4.113zm-9.1507-1.1444l4.5324 2.6105a.1054.1054 0 0 1 .019.1437L9.4357 18.8285a.1101.1101 0 0 1-.1419.019l-4.5324-2.6105a.1054.1054 0 0 1-.019-.1437l6.9741-11.9734a.1101.1101 0 0 1 .1419-.019z"/>
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

  const generateFinalConclusion = async (roundId: string, provider: ModelProvider) => {
    const round = rounds.find(r => r.id === roundId);
    if (!round || !round.gptResponse || !round.geminiResponse) return;

    // Set loading state
    setRounds(prev => prev.map(r => r.id === roundId ? { 
      ...r, 
      isGptFinalizing: provider === ModelProvider.GPT ? true : r.isGptFinalizing,
      isGeminiFinalizing: provider === ModelProvider.GEMINI ? true : r.isGeminiFinalizing
    } : r));

    // Construct Synthesis Prompt
    const synthesisPrompt = `
    [시스템 지시]
    당신은 최상의 답변을 도출하는 최종 결정자입니다.
    아래 대화 내용(사용자 질문, 초기 답변들, 그리고 교차 검증 내용)을 모두 종합하여,
    사용자의 질문에 대한 "최종적인 정답" 혹은 "가장 완성도 높은 결론"을 작성해 주세요.
    
    - 편향되지 않은 객관적인 시각을 유지하세요.
    - 교차 검증에서 지적된 오류들은 반드시 수정하여 반영하세요.
    - 서론/본론/결론 혹은 핵심 요약 등 읽기 좋은 구조로 작성하세요.
    - 응답 언어: ${lang}

    [사용자 질문]
    ${round.userPrompt}

    [초기 답변 A (GPT)]
    ${round.gptResponse}

    [초기 답변 B (Gemini)]
    ${round.geminiResponse}

    [교차 검증 및 토론 과정]
    ${round.critiques.map((c, i) => `[검증 Round ${i+1}]\n- Gemini 의견: ${c.geminiContent}\n- GPT 의견: ${c.gptContent}`).join("\n\n")}
    `;

    try {
      let finalResult = "";
      if (provider === ModelProvider.GEMINI) {
        finalResult = await callGeminiAPI(synthesisPrompt, getHistoryForContext(roundId));
      } else {
        // Reuse OpenAI Chat but with synthesis prompt
        finalResult = await callOpenAIAPI(synthesisPrompt); 
      }

      setRounds(prev => prev.map(r => r.id === roundId ? { 
        ...r, 
        gptFinalConclusion: provider === ModelProvider.GPT ? finalResult : r.gptFinalConclusion,
        geminiFinalConclusion: provider === ModelProvider.GEMINI ? finalResult : r.geminiFinalConclusion,
        isGptFinalizing: provider === ModelProvider.GPT ? false : r.isGptFinalizing,
        isGeminiFinalizing: provider === ModelProvider.GEMINI ? false : r.isGeminiFinalizing
      } : r));

    } catch (e) {
      console.error("Finalization failed", e);
      setRounds(prev => prev.map(r => r.id === roundId ? { 
        ...r, 
        isGptFinalizing: false,
        isGeminiFinalizing: false
      } : r));
    }
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
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative bg-zinc-900 p-2 rounded-lg border border-zinc-800">
               <GitCompare size={24} className="text-zinc-200 transform group-hover:rotate-180 transition-transform duration-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            <span className="text-emerald-500/90">GPT</span> <span className="text-zinc-600 mx-0.5 font-light">vs</span> <span className="text-blue-500/90">Gemi</span>
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
                 {/* GPT Avatar - OFFICIAL LOOK (White Icon on Green Background) */}
                 <div className="flex flex-col items-center space-y-3">
                     <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/50 to-emerald-600/50 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition duration-700"></div>
                        <div className="relative w-24 h-24 rounded-3xl bg-emerald-600 flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
                             <GPTLogo className="w-12 h-12 text-white" />
                        </div>
                     </div>
                     <div className="flex flex-col items-center mt-2">
                        <span className="text-lg font-bold text-zinc-200 tracking-wide">ChatGPT</span>
                        <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-900/10 px-2 py-0.5 rounded border border-emerald-900/20 mt-1 uppercase">
                           gpt-5-nano
                        </span>
                     </div>
                 </div>

                 <div className="flex flex-col items-center text-zinc-600 pb-10 px-4">
                    <span className="text-2xl font-light italic text-zinc-700">VS</span>
                 </div>

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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-1000 blur-lg"></div>
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
                        {/* GPT Critique of Gemini (Left) */}
                        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 relative overflow-hidden group/critique hover:bg-zinc-900 transition-colors">
                            <div className="flex items-center space-x-2 mb-4 text-emerald-400/80 border-b border-zinc-800 pb-2">
                              <GPTLogo className="w-4 h-4 text-emerald-500" />
                              <span className="text-xs font-bold uppercase tracking-wider">{t.gptCritiqueTitle}</span>
                            </div>
                            <div className="text-zinc-300 text-sm leading-relaxed opacity-90">
                              <ReactMarkdown>{critique.gptContent}</ReactMarkdown>
                            </div>
                        </div>

                        {/* Gemini Critique of GPT (Right) */}
                        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 relative overflow-hidden group/critique hover:bg-zinc-900 transition-colors">
                            <div className="flex items-center space-x-2 mb-4 text-blue-400/80 border-b border-zinc-800 pb-2">
                              <GeminiLogo className="w-4 h-4" />
                              <span className="text-xs font-bold uppercase tracking-wider">{t.geminiCritiqueTitle}</span>
                            </div>
                            <div className="text-zinc-300 text-sm leading-relaxed opacity-90">
                              <ReactMarkdown>{critique.geminiContent}</ReactMarkdown>
                            </div>
                        </div>
                     </div>
                  </div>
                ))}
                
                {/* FINAL CONCLUSIONS (If Generated) */}
                {(round.gptFinalConclusion || round.geminiFinalConclusion || round.isGptFinalizing || round.isGeminiFinalizing) && (
                   <div className="mt-12 animate-fade-in-up">
                      <div className="flex items-center justify-center mb-6">
                         <div className="h-px w-full max-w-[100px] bg-zinc-800"></div>
                         <span className="mx-4 text-xs font-bold text-zinc-500 uppercase tracking-widest border border-zinc-800 px-3 py-1 rounded-full bg-zinc-900">
                           Final Conclusion
                         </span>
                         <div className="h-px w-full max-w-[100px] bg-zinc-800"></div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* GPT Final */}
                          {(round.gptFinalConclusion || round.isGptFinalizing) && (
                            <div className="relative">
                               <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 rounded-2xl blur opacity-50"></div>
                               <div className="relative bg-zinc-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
                                  <div className="flex items-center gap-3 mb-4 border-b border-zinc-800 pb-3">
                                     <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                                       <CheckCircle size={18} className="text-emerald-500" />
                                     </div>
                                     <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">{t.gptFinalTitle}</h3>
                                  </div>
                                  
                                  {round.isGptFinalizing ? (
                                    <div className="flex items-center gap-2 text-zinc-500 text-sm py-4 animate-pulse">
                                       <RefreshCw size={14} className="animate-spin"/> {t.finalizingLoading}
                                    </div>
                                  ) : (
                                    <div className="prose prose-invert prose-sm max-w-none text-zinc-300">
                                      <ReactMarkdown>{round.gptFinalConclusion || ""}</ReactMarkdown>
                                    </div>
                                  )}
                               </div>
                            </div>
                          )}

                          {/* Gemini Final */}
                          {(round.geminiFinalConclusion || round.isGeminiFinalizing) && (
                            <div className="relative">
                               <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-600/20 to-blue-900/20 rounded-2xl blur opacity-50"></div>
                               <div className="relative bg-zinc-900 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
                                  <div className="flex items-center gap-3 mb-4 border-b border-zinc-800 pb-3">
                                     <div className="p-1.5 bg-blue-500/10 rounded-lg">
                                       <Sparkles size={18} className="text-blue-500" />
                                     </div>
                                     <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">{t.geminiFinalTitle}</h3>
                                  </div>
                                  
                                  {round.isGeminiFinalizing ? (
                                    <div className="flex items-center gap-2 text-zinc-500 text-sm py-4 animate-pulse">
                                       <RefreshCw size={14} className="animate-spin"/> {t.finalizingLoading}
                                    </div>
                                  ) : (
                                    <div className="prose prose-invert prose-sm max-w-none text-zinc-300">
                                      <ReactMarkdown>{round.geminiFinalConclusion || ""}</ReactMarkdown>
                                    </div>
                                  )}
                               </div>
                            </div>
                          )}
                      </div>
                   </div>
                )}

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
                    <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-12 mb-4 relative z-20 pb-8">
                      
                      {/* Critique Button */}
                      <Button 
                        variant="secondary" 
                        size="md" 
                        icon={<GitCompare size={16} />}
                        onClick={() => initiateCritique(round.id)}
                        disabled={round.isCritiqueLoading || round.isGptFinalizing || round.isGeminiFinalizing}
                        className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 transition-colors shadow-lg shadow-black/20"
                      >
                        {round.critiques.length > 0 ? t.reCritiqueBtn : t.critiqueBtn}
                      </Button>

                      {/* Finalize Buttons - Only Show if critiques exist */}
                      {round.critiques && round.critiques.length > 0 && (
                        <div className="flex flex-col md:flex-row gap-3 animate-fade-in-up">
                          <div className="h-8 w-px bg-zinc-800 hidden md:block mx-1"></div>
                          
                          <Button 
                            variant="gpt"
                            size="md"
                            icon={<CheckCircle size={16} />}
                            onClick={() => generateFinalConclusion(round.id, ModelProvider.GPT)}
                            disabled={round.isGptFinalizing}
                            className="bg-emerald-900/30 text-emerald-400 border border-emerald-900/50 hover:bg-emerald-900/50"
                          >
                            {t.gptFinalizeBtn}
                          </Button>

                          <Button 
                            variant="gemini"
                            size="md"
                            icon={<Sparkles size={16} />}
                            onClick={() => generateFinalConclusion(round.id, ModelProvider.GEMINI)}
                            disabled={round.isGeminiFinalizing}
                            className="bg-blue-900/30 text-blue-400 border border-blue-900/50 hover:bg-blue-900/50"
                          >
                            {t.geminiFinalizeBtn}
                          </Button>
                        </div>
                      )}
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