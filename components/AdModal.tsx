
import React, { useEffect, useState } from 'react';
import { X, Loader2, ShieldCheck, ExternalLink, Zap } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdComplete: () => void;
  onGoPremium: () => void;
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
             <span className="font-semibold text-sm">심층 교차 검증 잠금 해제</span>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Ad Container */}
        <div className="p-6 flex flex-col items-center justify-center bg-zinc-950 min-h-[300px] relative">
           {/* Upsell Link - New Feature */}
           <button 
             onClick={onGoPremium}
             className="w-full mb-4 py-2 bg-gradient-to-r from-indigo-900/50 to-blue-900/50 border border-blue-500/30 rounded-lg flex items-center justify-center gap-2 text-xs text-blue-200 hover:bg-blue-900/30 transition-all group"
           >
             <Zap size={14} className="text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform" />
             <span className="font-medium">기다리기 지루하신가요? 광고 없이 검증하기 &gt;</span>
           </button>

           {/* AdSense Placeholder Area */}
           <div className="w-full flex-1 bg-zinc-900 border border-dashed border-zinc-700 rounded-lg flex flex-col items-center justify-center text-center p-6 relative overflow-hidden group cursor-pointer hover:border-zinc-500 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <span className="text-xs font-bold text-zinc-500 bg-zinc-900 border border-zinc-700 px-2 py-0.5 rounded mb-4 z-10">ADVERTISEMENT</span>
              
              {/* 실제 운영 시 이 부분에 <ins ...> 태그를 넣습니다. */}
              <h3 className="text-zinc-300 font-bold text-lg mb-2 z-10">AI 스타트업 필수 강의</h3>
              <p className="text-zinc-500 text-sm mb-4 z-10">
                LLM 애플리케이션 구축부터 수익화까지.<br/>지금 바로 확인해보세요.
              </p>
              
              <div className="flex items-center text-blue-400 text-xs font-medium z-10">
                <span>사이트 방문하기</span>
                <ExternalLink size={12} className="ml-1"/>
              </div>
           </div>
           
           <div className="mt-6 w-full text-center">
              {!canClose ? (
                <>
                  <p className="text-zinc-400 text-xs mb-2 animate-pulse">광고 시청 후 분석이 시작됩니다...</p>
                  <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                     <div 
                       className="bg-emerald-500 h-full transition-all duration-1000 ease-linear"
                       style={{ width: `${((5 - timer) / 5) * 100}%` }}
                     ></div>
                  </div>
                </>
              ) : (
                <p className="text-emerald-500 text-xs font-bold">준비 완료!</p>
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
                분석 결과 확인하기 <ExternalLink size={16} />
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
