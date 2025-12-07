
import React, { useEffect, useState } from 'react';
import { X, Loader2, ShieldCheck, ExternalLink, Info, ArrowRight, Zap } from 'lucide-react';
import { translations, Language } from '../translations';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdComplete: () => void;
  onGoPremium: () => void;
  currentPrompt?: string; 
}

// Mock Product Database for Contextual Targeting
const PRODUCT_DB = [
  {
    keywords: ['코딩', '개발', '파이썬', '자바', 'react', 'code', 'programming'],
    name: '로지텍 MX Master 3S 무선 마우스',
    price: '139,000원',
    image: 'https://img.danawa.com/prod_img/500000/524/326/img/17326524_1.jpg?shrink=330:330&_v=20220712111306',
    desc: '개발자 필수템 1위. 손목이 편한 인체공학 디자인과 초고속 스크롤.',
    link: 'https://www.coupang.com' // Replace with your actual affiliate link
  },
  {
    keywords: ['글쓰기', '블로그', '마케팅', 'write', 'blog'],
    name: 'Keychron K8 Pro 기계식 키보드',
    price: '169,000원',
    image: 'https://m.media-amazon.com/images/I/71J1S4I7JYL._AC_SL1500_.jpg',
    desc: '타건감이 즐거운 저소음 적축. 업무 효율을 높여주는 커스텀 키보드.',
    link: 'https://www.coupang.com'
  },
  {
    keywords: ['건강', '피곤', '야근', 'health', 'tired'],
    name: '오쏘몰 이뮨 멀티비타민 (30일분)',
    price: '118,000원',
    image: 'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/8904/559868840c88346cb4307a697772652e061737e61405021e05d04588df8e.jpg',
    desc: '마시는 링거. 지친 직장인과 수험생을 위한 프리미엄 비타민.',
    link: 'https://www.coupang.com'
  },
  {
    keywords: ['주식', '투자', '경제', 'money', 'stock'],
    name: '돈의 속성 (김승호 저)',
    price: '16,000원',
    image: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791188331796.jpg',
    desc: '최상위 부자가 말하는 돈에 대한 모든 것. 300쇄 기념 에디션.',
    link: 'https://www.coupang.com'
  },
  // Default Fallback
  {
    keywords: ['default'],
    name: 'Apple 2024 맥북 에어 13 M3',
    price: '1,590,000원',
    image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1708367688034',
    desc: 'AI 시대를 위한 압도적인 성능. M3 칩으로 더 강력하게.',
    link: 'https://www.coupang.com'
  }
];

export const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, onAdComplete, onGoPremium, currentPrompt = '' }) => {
  const [timer, setTimer] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const [product, setProduct] = useState(PRODUCT_DB[PRODUCT_DB.length - 1]);

  // Contextual Targeting Logic
  useEffect(() => {
    if (isOpen) {
      const lowerPrompt = currentPrompt.toLowerCase();
      const matched = PRODUCT_DB.find(p => p.keywords.some(k => lowerPrompt.includes(k)));
      setProduct(matched || PRODUCT_DB[PRODUCT_DB.length - 1]);

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
  }, [isOpen, currentPrompt]);

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
          {/* Close button hidden during ad to force view, or enabled if strategy allows */}
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col bg-zinc-950 min-h-[400px] relative">
           
           {/* Ad Badge (Required by Guidelines) */}
           <div className="flex justify-end mb-2">
              <span className="bg-zinc-800 text-zinc-400 text-[10px] px-2 py-0.5 rounded border border-zinc-700">광고</span>
           </div>

           {/* Contextual Product Card */}
           <div className="flex-1 bg-white rounded-xl overflow-hidden flex flex-col shadow-lg relative group mb-4">
              <div className="h-48 bg-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
                 <img 
                   src={product.image} 
                   alt={product.name} 
                   className="object-contain h-full w-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                 />
                 <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                    추천 아이템
                 </div>
              </div>
              <div className="p-4 flex-1 flex flex-col bg-white">
                 <h3 className="text-zinc-900 font-bold text-base leading-tight mb-1 line-clamp-2">
                   {product.name}
                 </h3>
                 <p className="text-zinc-500 text-xs mb-3 line-clamp-2">
                   {product.desc}
                 </p>
                 <div className="mt-auto flex items-center justify-between">
                    <span className="text-red-600 font-extrabold text-lg">{product.price}</span>
                    <a 
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                    >
                      최저가 보기 <ExternalLink size={12} />
                    </a>
                 </div>
              </div>
           </div>
           
           {/* Timer & Up-sell Button */}
           <div className="w-full text-center space-y-3">
              {!canClose ? (
                <>
                   {/* Upsell Button (Active while waiting) */}
                   <button 
                    onClick={onGoPremium}
                    className="w-full py-3 bg-zinc-900 border border-blue-500/30 text-blue-400 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-900/10 transition-colors group"
                  >
                    <Zap size={16} className="text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform"/>
                    <span className="font-bold text-sm">{translations.en.adModal.goPremium}</span>
                  </button>

                  <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                     <div 
                       className="bg-emerald-500 h-full transition-all duration-1000 ease-linear"
                       style={{ width: `${((5 - timer) / 5) * 100}%` }}
                     ></div>
                  </div>
                  <p className="text-zinc-500 text-xs">
                    {timer}초 뒤 분석이 시작됩니다...
                  </p>
                </>
              ) : (
                <div className="h-[52px]"></div> // Spacer to keep layout stable
              )}
           </div>
        </div>

        {/* Footer Action & Guidelines */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex flex-col gap-3">
          <button
            onClick={onAdComplete}
            disabled={!canClose}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-all shadow-lg ${
              canClose 
                ? 'bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98] shadow-emerald-900/20' 
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed hidden'
            }`}
          >
            {canClose && (
              <span className="flex items-center gap-2">
                분석 결과 확인하기 <ArrowRight size={16} />
              </span>
            )}
          </button>
          
          {/* Required Disclaimer (Improved Visibility) */}
          <div className="text-xs text-zinc-500 text-center leading-snug font-medium">
            <p>이 포스팅은 쿠팡 파트너스 활동의 일환으로,<br/>이에 따른 일정액의 수수료를 제공받습니다.</p>
            <div className="mt-2 pt-2 border-t border-zinc-800/50 flex items-center justify-center gap-1 text-zinc-600 text-[10px]">
               <Info size={10} />
               <span>광고/제휴 문의: info@tetracorp.co.kr</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
