
import React, { useState, useEffect } from 'react';
import { X, Check, Star, Zap, Mail, Loader2, ArrowRight } from 'lucide-react';
import { translations, Language } from '../translations';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, lang }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    // Check local storage to see if already joined
    const hasJoined = localStorage.getItem('waitlist_joined');
    if (hasJoined) setJoined(true);
  }, [isOpen]);

  const t = translations[lang].pricing;

  if (!isOpen) return null;

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setJoined(true);
        localStorage.setItem('waitlist_joined', 'true');
        setEmail('');
      } else {
        console.error('Failed to join waitlist');
        setStatus('idle');
      }
    } catch (error) {
      console.error('Waitlist API Error:', error);
      setStatus('idle');
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in-up">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col relative max-h-[95vh] overflow-y-auto scrollbar-hide">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-20 bg-zinc-900/50 p-2 rounded-full"
        >
          <X size={20} />
        </button>

        <div className="p-8 text-center space-y-4 pt-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            {t.tagline}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">{t.title}</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-12 pb-8">
          
          {/* Free/Beta Plan (Current) */}
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 flex flex-col relative overflow-hidden ring-1 ring-emerald-500/50">
             <div className="absolute top-0 right-0 bg-zinc-800 text-zinc-300 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-zinc-700">
               {t.free.badge}
            </div>
            <div className="mb-6">
               <h3 className="text-xl font-bold text-zinc-100">{t.free.name}</h3>
               <div className="flex items-baseline mt-2">
                 <span className="text-3xl font-bold text-white">{t.free.price}</span>
               </div>
               <p className="text-zinc-400 text-sm mt-2">{t.free.desc}</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
               {t.free.features.map((feature, idx) => (
                 <li key={idx} className="flex items-start text-sm text-zinc-300">
                    <Check size={16} className="text-zinc-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                 </li>
               ))}
            </ul>

            <button disabled className="w-full py-3 rounded-xl border border-zinc-700 text-emerald-400 font-bold text-sm cursor-not-allowed bg-emerald-900/10">
              {t.free.btn}
            </button>
          </div>

          {/* Starter Plan (Future) */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 flex flex-col relative overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <div className="absolute top-0 right-0 bg-zinc-800 text-zinc-500 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-zinc-700">
               {t.starter.badge}
            </div>
            <div className="mb-6">
               <h3 className="text-xl font-bold text-zinc-100">{t.starter.name}</h3>
               <div className="flex items-baseline mt-2">
                 <span className="text-3xl font-bold text-white">{t.starter.price}</span>
                 <span className="text-zinc-500 ml-1">/mo</span>
               </div>
               <p className="text-zinc-500 text-sm mt-2">{t.starter.desc}</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
               {t.starter.features.map((feature, idx) => (
                 <li key={idx} className="flex items-start text-sm text-zinc-400">
                    <Check size={16} className="text-zinc-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                 </li>
               ))}
            </ul>

            <button disabled className="w-full py-3 rounded-xl border border-dashed border-zinc-700 text-zinc-500 font-medium text-sm cursor-not-allowed">
              {t.starter.btn}
            </button>
          </div>

          {/* Pro Plan (Future) */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 flex flex-col relative overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
             <div className="absolute top-0 right-0 bg-blue-900/50 text-blue-300 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-blue-900/30">
               {t.pro.badge}
            </div>
            <div className="mb-6">
               <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 {t.pro.name} <Zap size={16} className="text-yellow-500 fill-yellow-500" />
               </h3>
               <div className="flex items-baseline mt-2">
                 <span className="text-3xl font-bold text-white">{t.pro.price}</span>
                 <span className="text-zinc-500 ml-1">/mo</span>
               </div>
               <p className="text-blue-200/40 text-sm mt-2">{t.pro.desc}</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
               {t.pro.features.map((feature, idx) => (
                 <li key={idx} className="flex items-start text-sm text-zinc-300">
                    <Check size={16} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{__html: feature.replace("GPT-4o", "<strong>GPT-4o</strong>").replace("무제한", "<strong>무제한</strong>").replace("광고 제거", "<strong class='text-emerald-400'>광고 제거</strong>")}}></span>
                 </li>
               ))}
            </ul>

            <button 
               disabled={true} 
               className="w-full py-3 rounded-xl bg-blue-600/20 border border-blue-500/50 text-blue-300 font-bold text-sm"
            >
               {t.pro.btn}
            </button>
          </div>
        </div>

        {/* Improved Waitlist Section */}
        <div className="px-6 md:px-12 pb-8">
           <div className="relative rounded-2xl overflow-hidden p-6 md:p-8">
             {/* Gradient Background */}
             <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-700/50"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left max-w-lg">
                   <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <Mail size={18} className="text-blue-400" />
                      {t.waitlist.title}
                   </h4>
                   <p className="text-zinc-400 text-sm">
                      {t.waitlist.desc}
                   </p>
                </div>

                <div className="w-full md:w-auto min-w-[300px]">
                   {joined ? (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center animate-fade-in-up">
                         <div className="bg-emerald-500/20 p-2 rounded-full mr-3">
                            <Star size={18} className="text-emerald-500 fill-emerald-500" />
                         </div>
                         <div>
                            <h5 className="text-sm font-bold text-emerald-100">{t.waitlist.successTitle}</h5>
                            <p className="text-xs text-emerald-200/70">이메일 등록이 완료되었습니다.</p>
                         </div>
                      </div>
                   ) : (
                     <form onSubmit={handleJoinWaitlist} className="relative group">
                       <input 
                         type="email" 
                         required
                         placeholder={t.waitlist.placeholder}
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className="w-full bg-zinc-950/50 border border-zinc-600 text-white rounded-xl pl-4 pr-28 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-zinc-600 transition-all"
                       />
                       <button 
                         type="submit" 
                         disabled={status === 'loading'}
                         className="absolute right-1 top-1 bottom-1 bg-white text-zinc-900 font-bold px-4 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-70 flex items-center gap-2 text-sm"
                       >
                         {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : (
                           <>
                             {t.waitlist.btn} <ArrowRight size={14} />
                           </>
                         )}
                       </button>
                     </form>
                   )}
                </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};
