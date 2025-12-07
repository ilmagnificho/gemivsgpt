import React, { useEffect, useState } from 'react';
import { X, Loader2, ShieldCheck, ExternalLink, Zap, Megaphone, TrendingUp } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdComplete: () => void;
  onGoPremium: () => void;
  currentPrompt?: string; 
}

export const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, onAdComplete, onGoPremium }) => {
  const [timer, setTimer] = useState(5);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimer(5);
      setCanClose(false);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanClose(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in-up">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center space-x-2 text-zinc-100">
             <ShieldCheck size={18} className="text-emerald-500"/>
             <span className="font-semibold text-sm">심층 분석 잠금 해제</span>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col items-center justify-center bg-zinc-950 min-h-[360px] relative">
           
           {/* Upsell Link (Premium) */}
           <button 
             onClick={onGoPremium}
             className="w-full mb-6 py-2 bg-gradient-to-r from-indigo-900/50 to-blue-900/50 border border-blue-500/30 rounded-lg flex items-center justify-center gap-2 text-xs text-blue-200 hover:bg-blue-900/30 transition-all group"
           >
             <Zap size={14} className="text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform" />
             <span className="font-medium">기다리기 지루하신가요? 광고 없이 검증하기 &gt;</span>
           </button>

           {/* Sponsorship Placeholder (B2B Ad) */}
           <div className="w-full flex-1 bg-zinc-900/50 border border-zinc-800 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center group hover:border-zinc-600 transition-colors relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent pointer-events-none"></div>
              
              <div className="bg-zinc-800 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-500">
                 <Megaphone size={32} className="text-zinc-400" />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">
                이 곳에 당신의 서비스를<br/>광고하세요
              </h3>
              
              <p className="text-zinc-400 text-xs mb-6 leading-relaxed max-w-[240px]">
                AI, 테크, 스타트업에 관심이 많은<br/>
                얼리어답터들에게 가장 효과적으로 도달할 수 있습니다.
              </p>

              <div className="flex items-center gap-2 text-[10px] text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
                 <TrendingUp size={12} />
                 <span>높은 전환율 / 타겟 마케팅</span>
              </div>
              
              <div className="absolute bottom-3 text-[9px] text-zinc-600">
                 contact: sponsor@gptvsgemi.com
              </div>
           </div>
           
           {/* Timer Progress */}
           <div className="mt-6 w-full text-center">
              {!canClose ? (
                <>
                  <p className="text-zinc-400 text-xs mb-2 animate-pulse">잠시 후 분석이 시작됩니다...</p>
                  <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                     <div 
                       className="bg-emerald-500 h-full transition-all duration-1000 ease-linear"
                       style={{ width: `${((5 - timer) / 5) * 100}%` }}
                     ></div>
                  </div>
                </>
              ) : (
                <p className="text-emerald-500 text-xs font-bold">분석 준비 완료!</p>
              )}
           </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800">
          <button
            onClick={onAdComplete}
            disabled={!canClose}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-all shadow-lg ${
              canClose 
                ? 'bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98] shadow-emerald-900/20' 
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            {canClose ? (
              <span className="flex items-center gap-2">
                결과 확인하기 <ExternalLink size={16} />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin"/> 
                {timer}초 후 닫기 가능
              </span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};