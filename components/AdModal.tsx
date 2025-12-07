import React, { useEffect, useState, useMemo } from 'react';
import { X, Loader2, ShieldCheck, ExternalLink, Zap, ShoppingBag } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdComplete: () => void;
  onGoPremium: () => void;
  currentPrompt?: string; // New prop for contextual targeting
}

// Mock Database of Affiliate Products
// TODO: Replace 'affiliateLink' with your ACTUAL Coupang Partners shortened URLs
const PRODUCT_DATABASE = [
  {
    id: 'tech_mouse',
    keywords: ['코딩', '개발', '코드', 'react', 'python', 'java', 'programming', '마우스', '손목'],
    name: 'Logitech MX Master 3S',
    desc: '개발자 생산성 끝판왕. 하루 종일 코딩해도 편안한 무소음 마우스.',
    price: '139,000원',
    image: 'https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1',
    affiliateLink: 'https://coupang.com' 
  },
  {
    id: 'tech_keyboard',
    keywords: ['타이핑', '글쓰기', '작가', '키보드', '기계식', '소음', '장비'],
    name: 'Keychron K8 Pro 저소음 적축',
    desc: '몰입감을 높여주는 타건감. 맥/윈도우 완벽 호환 기계식 키보드.',
    price: '169,000원',
    image: 'https://keychron.kr/web/product/big/202210/4e1744158913697e8284534f958f0003.jpg',
    affiliateLink: 'https://coupang.com'
  },
  {
    id: 'book_startup',
    keywords: ['스타트업', '창업', '비즈니스', '투자', '매출', '마케팅', '경영'],
    name: '제로 투 원 (Zero to One)',
    desc: '경쟁하지 말고 독점하라. 피터 틸이 말하는 스타트업 성공의 비밀.',
    price: '16,200원',
    image: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936472634.jpg',
    affiliateLink: 'https://coupang.com'
  },
  {
    id: 'health_eye',
    keywords: ['눈', '시력', '피로', '모니터', '건강', '야근'],
    name: '루테인 지아잔틴 24mg',
    desc: '침침한 눈을 위한 필수 영양제. 하루 한 알로 눈 건강 챙기기.',
    price: '28,900원',
    image: 'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/474668407469740-45602498-8c1d-4034-9333-652309121655.jpg',
    affiliateLink: 'https://coupang.com'
  },
  {
    id: 'general_coffee',
    keywords: ['커피', '카페인', '집중', '졸음'],
    name: '일리(Illy) 클라시코 캡슐',
    desc: '집에서 즐기는 이탈리아 정통 에스프레소의 맛.',
    price: '54,000원',
    image: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8740/4d110996860d407768406159670417646538a798835817887303d22e862c.jpg',
    affiliateLink: 'https://coupang.com'
  },
  // Default Fallback
  {
    id: 'default_desk',
    keywords: [],
    name: '데스크테리어의 완성, 3D 모니터암',
    desc: '거북목 탈출과 책상 공간 확보를 동시에.',
    price: '69,000원',
    image: 'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2704289899269562-b13d297a-b286-4999-9214-747683935043.jpg',
    affiliateLink: 'https://coupang.com'
  }
];

export const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, onAdComplete, onGoPremium, currentPrompt }) => {
  const [timer, setTimer] = useState(5);
  const [canClose, setCanClose] = useState(false);

  // Analyze prompt and select product
  const recommendedProduct = useMemo(() => {
    if (!currentPrompt) return PRODUCT_DATABASE[PRODUCT_DATABASE.length - 1]; // Default

    const lowerPrompt = currentPrompt.toLowerCase();
    const matched = PRODUCT_DATABASE.find(p => 
      p.keywords.some(k => lowerPrompt.includes(k))
    );

    return matched || PRODUCT_DATABASE[PRODUCT_DATABASE.length - 1]; // Return match or default
  }, [currentPrompt]);

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

        {/* Ad Container */}
        <div className="p-6 flex flex-col items-center justify-center bg-zinc-950 min-h-[360px] relative">
           {/* Upsell Link */}
           <button 
             onClick={onGoPremium}
             className="w-full mb-6 py-2 bg-gradient-to-r from-indigo-900/50 to-blue-900/50 border border-blue-500/30 rounded-lg flex items-center justify-center gap-2 text-xs text-blue-200 hover:bg-blue-900/30 transition-all group"
           >
             <Zap size={14} className="text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform" />
             <span className="font-medium">기다리기 지루하신가요? 광고 없이 검증하기 &gt;</span>
           </button>

           {/* Contextual Ad Card */}
           <div 
             className="w-full flex-1 bg-white rounded-xl flex flex-col overflow-hidden group cursor-pointer hover:shadow-xl transition-all relative border border-zinc-800"
             onClick={() => window.open(recommendedProduct.affiliateLink, '_blank')}
           >
              {/* Ad Badge Header */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-1.5 flex items-center justify-between shadow-sm">
                 <div className="flex items-center gap-2">
                   {/* Explicit Ad Label */}
                   <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-bold text-white border border-white/20">광고</span>
                   <span className="text-[10px] font-bold text-white tracking-wide">AI 맞춤 추천</span>
                 </div>
                 <span className="text-[9px] text-emerald-100/80 font-medium">COUPANG</span>
              </div>

              {/* Product Content */}
              <div className="flex-1 flex flex-col p-4 pt-10">
                 <div className="flex gap-4 items-start">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                       <img 
                         src={recommendedProduct.image} 
                         alt={recommendedProduct.name}
                         className="w-full h-full object-cover mix-blend-multiply"
                       />
                    </div>
                    <div className="flex-1">
                       <h3 className="text-zinc-900 font-bold text-sm leading-tight mb-1 line-clamp-2">
                         {recommendedProduct.name}
                       </h3>
                       <p className="text-xs text-zinc-500 mb-2 line-clamp-2">
                         {recommendedProduct.desc}
                       </p>
                       <p className="text-red-600 font-bold text-base">
                         {recommendedProduct.price}
                       </p>
                    </div>
                 </div>

                 <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 leading-snug">
                      이 포스팅은 쿠팡 파트너스 활동의 일환으로,<br/>이에 따른 일정액의 수수료를 제공받습니다.
                    </span>
                    <span className="text-xs font-bold text-blue-600 flex items-center hover:underline whitespace-nowrap ml-2">
                      최저가 확인 <ExternalLink size={10} className="ml-1"/>
                    </span>
                 </div>
              </div>
           </div>
           
           <div className="mt-6 w-full text-center">
              {!canClose ? (
                <>
                  <p className="text-zinc-400 text-xs mb-2 animate-pulse">AI가 관련 상품을 찾고 있습니다...</p>
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