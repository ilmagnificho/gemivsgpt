import React, { useEffect, useState } from 'react';
import { X, ArrowRight, Zap, ExternalLink, ShieldCheck, Info } from 'lucide-react';
import { translations } from '../translations';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdComplete: () => void;
  onGoPremium: () => void;
  currentPrompt?: string; 
}

// User provided affiliate link
const AFFILIATE_LINK = 'https://link.coupang.com/a/dcA0Oj';

// Mock Product Database for Contextual Targeting
// Note: All links are set to the user's provided affiliate link to ensure commission.
const PRODUCT_DB = [
  {
    keywords: ['코딩', '개발', '파이썬', '자바', 'react', 'code', 'programming'],
    name: '로지텍 MX Master 3S 무선 마우스',
    price: '139,000원',
    image: 'https://img.danawa.com/prod_img/500000/524/326/img/17326524_1.jpg?shrink=330:330&_v=20220712111306',
    desc: '개발자 필수템 1위. 손목이 편한 인체공학 디자인과 초고속 스크롤.',
    link: AFFILIATE_LINK
  },
  {
    keywords: ['글쓰기', '블로그', '마케팅', 'write', 'blog'],
    name: 'Keychron K8 Pro 기계식 키보드',
    price: '169,000원',
    image: 'https://m.media-amazon.com/images/I/71J1S4I7JYL._AC_SL1500_.jpg',
    desc: '타건감이 즐거운 저소음 적축. 업무 효율을 높여주는 커스텀 키보드.',
    link: AFFILIATE_LINK
  },
  {
    keywords: ['건강', '피곤', '야근', 'health', 'tired'],
    name: '오쏘몰 이뮨 멀티비타민 (30일분)',
    price: '118,000원',
    image: 'https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/8904/559868840c88346cb4307a697772652e061737e61405021e05d04588df8e.jpg',
    desc: '마시는 링거. 지친 직장인과 수험생을 위한 프리미엄 비타민.',
    link: AFFILIATE_LINK
  },
  {
    keywords: ['주식', '투자', '경제', 'money', 'stock'],
    name: '돈의 속성 (김승호 저)',
    price: '16,000원',
    image: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791188331796.jpg',
    desc: '최상위 부자가 말하는 돈에 대한 모든 것. 300쇄 기념 에디션.',
    link: AFFILIATE_LINK
  },
  // Default Fallback
  {
    keywords: ['default'],
    name: 'Merry Christmas 트리&집꾸미기',
    price: '최대 70% SALE',
    // New High-quality Christmas Tree Image
    image: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?q=80&w=800&auto=format&fit=crop',
    desc: '설레는 크리스마스 준비. 트리부터 조명, 소품까지 한 번에 만나보세요.',
    link: AFFILIATE_LINK
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in-up">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-[400px] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center space-x-2 text-zinc-100">
             <ShieldCheck size={18} className="text-emerald-500"/>
             <span className="font-semibold text-sm">심층 분석 잠금 해제</span>
          </div>
          {/* Close button hidden during ad to force view */}
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Container */}
        <div className="flex flex-col bg-zinc-950 relative">
           
           {/* Ad Badge (Required by Guidelines) */}
           <div className="absolute top-4 right-4 z-30">
              <span className="bg-black/50 backdrop-blur-md text-white/90 text-[10px] px-2 py-0.5 rounded border border-white/10 shadow-sm">광고</span>
           </div>

           {/* Product Card */}
           <a 
             href={product.link}
             target="_blank"
             rel="noopener noreferrer"
             className="block w-full cursor-pointer group relative"
           >
              {/* Image Container with Apple Music Style Blur */}
              <div className="h-72 w-full relative overflow-hidden bg-zinc-900">
                 {/* Blurred Background Layer */}
                 <div 
                   className="absolute inset-0 bg-cover bg-center opacity-50 blur-2xl scale-125 transition-transform duration-700 group-hover:scale-150"
                   style={{ backgroundImage: `url(${product.image})` }}
                 ></div>
                 
                 {/* Vignette Overlay to darken edges */}
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-90"></div>
                 
                 {/* Main Image - Contain to show full content without cropping */}
                 <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-h-full max-w-full object-contain shadow-2xl rounded-lg group-hover:scale-105 transition-transform duration-500 ring-1 ring-white/10"
                    />
                 </div>
                 
                 {/* Floaing Label */}
                 <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg shadow-red-900/40 animate-pulse">
                    추천 아이템
                 </div>
              </div>

              {/* Text Info Area */}
              <div className="px-6 py-5 bg-zinc-950 -mt-2 relative z-10">
                 <h3 className="text-zinc-100 font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                   {product.name}
                 </h3>
                 <p className="text-zinc-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                   {product.desc}
                 </p>
                 <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
                    <span className="text-red-500 font-extrabold text-xl">{product.price}</span>
                    <span className="bg-white text-black hover:bg-zinc-200 text-xs font-bold px-4 py-2.5 rounded-full transition-colors flex items-center gap-1.5 shadow-lg shadow-white/5">
                      최저가 보기 <ExternalLink size={12} />
                    </span>
                 </div>
              </div>
           </a>
           
           {/* Timer & Up-sell Section */}
           <div className="px-6 pb-6 pt-2 w-full text-center space-y-4 bg-zinc-950">
               {/* Upsell Button */}
               <button 
                onClick={onGoPremium}
                className="w-full py-3 bg-zinc-900 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-900/10 hover:border-blue-500/40 transition-all group"
              >
                <Zap size={16} className="text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform"/>
                <span className="font-bold text-sm">{translations.en.adModal.goPremium}</span>
              </button>

              <div className="space-y-2">
                {!canClose ? (
                  <>
                    <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                          style={{ width: `${((5 - timer) / 5) * 100}%` }}
                        ></div>
                    </div>
                    <p className="text-zinc-500 text-xs font-medium">
                      {timer}초 뒤 분석이 시작됩니다...
                    </p>
                  </>
                ) : (
                  <p className="text-emerald-500 text-xs font-bold animate-pulse flex items-center justify-center gap-1">
                    <CheckCircleIcon size={12} />
                    분석이 완료되었습니다!
                  </p>
                )}
              </div>
           </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex flex-col gap-3">
          <button
            onClick={onAdComplete}
            disabled={!canClose}
            className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center transition-all shadow-lg ${
              canClose 
                ? 'bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98] shadow-emerald-900/20' 
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
             <span className="flex items-center gap-2">
                {canClose ? (
                    <>분석 결과 확인하기 <ArrowRight size={16} /></>
                ) : (
                    "광고 시청 중..."
                )}
             </span>
          </button>
          
          {/* Required Disclaimer */}
          <div className="text-[10px] text-zinc-600 text-center leading-snug font-medium">
            <p>이 포스팅은 쿠팡 파트너스 활동의 일환으로,<br/>이에 따른 일정액의 수수료를 제공받습니다.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

// Simple Check Icon Component for internal use
const CheckCircleIcon = ({ size = 16 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);