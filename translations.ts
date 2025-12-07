
export type Language = 'ko' | 'en' | 'zh' | 'ja';

export const translations = {
  ko: {
    title: "GPT vs Gemi",
    subtitle: "AI 교차 검증",
    heroTitle: "더 완벽한 답변을 위한 AI 교차 검증",
    heroDesc: "GPT와 Gemini의 답변을 동시에 비교하세요.\n상호 검증을 통해 놓친 정보를 찾고 최적의 해답을 제시합니다.",
    placeholder: "검증하고 싶은 주제나 질문을 입력하세요...",
    send: "분석 시작",
    reset: "새로운 대화",
    share: "공유하기",
    shareSuccess: "링크가 복사되었습니다!",
    shareFail: "공유하기 실패",
    geminiName: "GEMINI 2.5 FLASH",
    gptName: "GPT-5 NANO",
    critiqueBtn: "교차 검증 실행",
    reCritiqueBtn: "추가 검증",
    nextStepGuide: "검증이 완료되었습니다. 추가 검증을 하거나 최종 결론을 도출할 수 있습니다.",
    finalSelectGuide: "최종 결론을 도출할 AI 모델을 선택하세요:",
    gptFinalizeBtn: "GPT로 최종 결론",
    geminiFinalizeBtn: "Gemini로 최종 결론",
    critiqueLoading: "답변을 정밀 분석하고 보완점을 찾는 중...",
    finalizingLoading: "모든 내용을 종합하여 최종 결론을 도출 중...",
    geminiCritiqueTitle: "Gemini의 검증 리포트",
    gptCritiqueTitle: "GPT-5 Nano의 검증 리포트",
    geminiFinalTitle: "Gemini의 최종 결론",
    gptFinalTitle: "GPT-5 Nano의 최종 결론",
    disclaimer: "AI는 부정확한 정보를 제공할 수 있습니다. 교차 검증 결과를 참고용으로 활용하세요.",
    coupangDisclaimer: "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.",
    limitReachedTitle: "일일 사용 한도 초과",
    limitReachedDesc: "무료 사용량을 모두 소진했습니다.\nPro 대기 명단에 등록하고 무제한 이용 혜택을 받으세요.",
    adModal: {
      removeAds: "광고 없이 검증하기",
      waitingBored: "기다리기 지루하신가요?",
      goPremium: "Pro 대기 명단 등록하고 광고 제거하기",
      aiRecommend: "광고 • AI 맞춤 추천",
      analyzing: "AI가 관련 상품을 찾고 있습니다..."
    },
    pricing: {
      tagline: "Beta Service",
      title: "더 강력한 교차 검증 경험",
      desc: "현재 베타 서비스 기간입니다. 정식 출시 알림을 받고 얼리버드 혜택을 누리세요.",
      free: {
        name: "Beta Free",
        price: "$0",
        badge: "현재 이용 중",
        desc: "제한된 무료 체험",
        features: [
          "일반 대화 일 3회",
          "심층 교차 검증 일 6회",
          "광고 노출"
        ],
        btn: "이용 중"
      },
      starter: {
        name: "Starter",
        price: "$4.99",
        badge: "Coming Soon",
        desc: "가볍게 시작하는 AI 교차 검증",
        features: [
          "일반 대화 무제한",
          "심층 교차 검증 일 30회",
          "광고 없는 쾌적한 환경"
        ],
        btn: "출시 알림 받기"
      },
      pro: {
        name: "Pro",
        price: "$19.99",
        badge: "Coming Soon",
        desc: "전문가를 위한 완벽한 분석 도구",
        features: [
          "GPT-5.1 무제한 대화",
          "무제한 심층 교차 검증",
          "우선 답변 처리 (Fast Lane)",
          "최신 모델 우선 액세스"
        ],
        btn: "출시 알림 받기"
      },
      waitlist: {
        title: "출시 알림 받기",
        desc: "이메일을 남겨주시면 Pro 플랜 출시 시 50% 할인 쿠폰을 보내드립니다.",
        placeholder: "이메일 주소 입력",
        btn: "등록",
        successTitle: "대기 명단 등록 완료!",
        successDesc: "관심 가져주셔서 감사합니다. 서비스가 오픈되면 가장 먼저 알려드리겠습니다."
      }
    }
  },
  en: {
    title: "GPT vs Gemi",
    subtitle: "AI Cross-Check",
    heroTitle: "AI Cross-Verification Platform",
    heroDesc: "Compare answers from GPT and Gemini simultaneously.\nFind optimal solutions through mutual verification and analysis.",
    placeholder: "Enter a topic to verify...",
    send: "Analyze",
    reset: "New Chat",
    share: "Share",
    shareSuccess: "Link copied!",
    shareFail: "Share failed",
    geminiName: "GEMINI 2.5 FLASH",
    gptName: "GPT-5 NANO",
    critiqueBtn: "Run Cross-Check",
    reCritiqueBtn: "Add Check",
    nextStepGuide: "Verification complete. You can run additional checks or generate a final conclusion.",
    finalSelectGuide: "Select an AI model to synthesize the final conclusion:",
    gptFinalizeBtn: "Finalize with GPT",
    geminiFinalizeBtn: "Finalize with Gemini",
    critiqueLoading: "Analyzing answers for improvements...",
    finalizingLoading: "Synthesizing all insights for final conclusion...",
    geminiCritiqueTitle: "Gemini's Verification Report",
    gptCritiqueTitle: "GPT-5 Nano's Verification Report",
    geminiFinalTitle: "Gemini's Final Conclusion",
    gptFinalTitle: "GPT-5 Nano's Final Conclusion",
    disclaimer: "AI may display inaccurate info. Use cross-check results for reference.",
    coupangDisclaimer: "This post is part of Coupang Partners activity, and a fee is received accordingly.",
    limitReachedTitle: "Daily Limit Reached",
    limitReachedDesc: "You have used all free daily requests.\nJoin the Pro waitlist for unlimited access.",
    adModal: {
      removeAds: "Verify without Ads",
      waitingBored: "Tired of waiting?",
      goPremium: "Join Pro Waitlist to Remove Ads",
      aiRecommend: "Ad • AI Recommended Item",
      analyzing: "AI is finding relevant items..."
    },
    pricing: {
      tagline: "Beta Service",
      title: "Enhanced Cross-Verification",
      desc: "Currently in Beta. Get notified for the official launch and enjoy early bird benefits.",
      free: {
        name: "Beta Free",
        price: "$0",
        badge: "Current Plan",
        desc: "Limited Access",
        features: [
          "3 Questions / Day",
          "6 Cross-Checks / Day",
          "Ad-Supported"
        ],
        btn: "Active"
      },
      starter: {
        name: "Starter",
        price: "$4.99",
        badge: "Coming Soon",
        desc: "Lightweight AI cross-check",
        features: [
          "Unlimited General Chat",
          "30 Deep Cross-Checks / Day",
          "Ad-Free Experience"
        ],
        btn: "Get Notified"
      },
      pro: {
        name: "Pro",
        price: "$19.99",
        badge: "Coming Soon",
        desc: "The ultimate tool for professionals",
        features: [
          "Unlimited GPT-5.1 Chat",
          "Unlimited Deep Cross-Checks",
          "Fast Lane Priority",
          "Priority Access to New Models"
        ],
        btn: "Get Notified"
      },
      waitlist: {
        title: "Get Launch Notification",
        desc: "Leave your email to receive a 50% discount coupon upon Pro plan launch.",
        placeholder: "Enter your email",
        btn: "Join",
        successTitle: "You're on the list!",
        successDesc: "Thanks for your interest. We'll notify you as soon as we launch."
      }
    }
  },
  zh: {
    title: "GPT vs Gemi",
    subtitle: "AI 交叉验证",
    heroTitle: "AI 智能交叉验证平台",
    heroDesc: "同时比较 GPT 和 Gemini 的答案。\n通过相互验证发现遗漏信息并提供最佳解决方案。",
    placeholder: "输入想要验证的主题...",
    send: "开始分析",
    reset: "新对话",
    share: "分享",
    shareSuccess: "链接已复制！",
    shareFail: "分享失败",
    geminiName: "GEMINI 2.5 FLASH",
    gptName: "GPT-5 NANO",
    critiqueBtn: "执行交叉验证",
    reCritiqueBtn: "追加验证",
    nextStepGuide: "验证完成。您可以进行额外验证或得出最终结论。",
    finalSelectGuide: "选择 AI 模型以得出最终结论：",
    gptFinalizeBtn: "GPT 最终总结",
    geminiFinalizeBtn: "Gemini 最终总结",
    critiqueLoading: "正在分析答案并寻找改进点...",
    finalizingLoading: "正在综合所有内容得出最终结论...",
    geminiCritiqueTitle: "Gemini 验证报告",
    gptCritiqueTitle: "GPT-5 Nano 验证报告",
    geminiFinalTitle: "Gemini 最终结论",
    gptFinalTitle: "GPT-5 Nano 最终结论",
    disclaimer: "AI 可能会提供不准确的信息。交叉验证结果仅供参考。",
    coupangDisclaimer: "本文作为 Coupang Partners 活动的一部分，将据此收取一定费用。",
    limitReachedTitle: "达到每日限额",
    limitReachedDesc: "您已用完免费额度。\n加入 Pro 候补名单以获取无限访问权限。",
    adModal: {
      removeAds: "无广告验证",
      waitingBored: "不想等待？",
      goPremium: "加入 Pro 候补名单以移除广告",
      aiRecommend: "广告 • AI 推荐商品",
      analyzing: "AI 正在寻找相关商品..."
    },
    pricing: {
      tagline: "Beta Service",
      title: "更强大的交叉验证体验",
      desc: "目前处于测试阶段。正式发布时第一时间获取通知，享受早期用户专属优惠。",
      free: {
        name: "Beta Free",
        price: "$0",
        badge: "当前计划",
        desc: "有限的免费体验",
        features: [
          "每日 3 次一般对话",
          "每日 6 次深度交叉验证",
          "包含广告"
        ],
        btn: "使用中"
      },
      starter: {
        name: "Starter",
        price: "$4.99",
        badge: "Coming Soon",
        desc: "轻松开始 AI 交叉验证",
        features: [
          "无限一般对话",
          "每日 30 次深度交叉验证",
          "无广告体验"
        ],
        btn: "获取通知"
      },
      pro: {
        name: "Pro",
        price: "$19.99",
        badge: "Coming Soon",
        desc: "专业人士的终极分析工具",
        features: [
          "无限 GPT-5.1 对话",
          "无限深度交叉验证",
          "优先响应通道 (Fast Lane)",
          "最新模型优先体验"
        ],
        btn: "获取通知"
      },
      waitlist: {
        title: "获取发布通知",
        desc: "留下您的邮箱，Pro 计划发布时将为您发送 50% 折扣券。",
        placeholder: "输入邮箱地址",
        btn: "注册",
        successTitle: "已加入候补名单！",
        successDesc: "感谢您的关注。服务上线后我们将第一时间通知您。"
      }
    }
  },
  ja: {
    title: "GPT vs Gemi",
    subtitle: "AI クロスチェック",
    heroTitle: "より完璧な回答のためのAI相互検証",
    heroDesc: "GPTとGeminiの回答を同時に比較しましょう。\n相互検証を通じて最適な解を見つけ出します。",
    placeholder: "検証したいテーマや質問を入力...",
    send: "分析開始",
    reset: "新しい対話",
    share: "共有",
    shareSuccess: "リンクをコピーしました！",
    shareFail: "共有失敗",
    geminiName: "GEMINI 2.5 FLASH",
    gptName: "GPT-5 NANO",
    critiqueBtn: "クロスチェック実行",
    reCritiqueBtn: "追加検証",
    nextStepGuide: "検証が完了しました。追加検証を行うか、最終結論を導き出すことができます。",
    finalSelectGuide: "最終結論を導き出すAIモデルを選択してください：",
    gptFinalizeBtn: "GPTで最終結論",
    geminiFinalizeBtn: "Geminiで最終結論",
    critiqueLoading: "回答を精密分析し、改善点を探しています...",
    finalizingLoading: "すべての内容を総合して最終結論を導出中...",
    geminiCritiqueTitle: "Geminiによる検証レポート",
    gptCritiqueTitle: "GPT-5 Nanoによる検証レポート",
    geminiFinalTitle: "Geminiの最終結論",
    gptFinalTitle: "GPT-5 Nanoの最終結論",
    disclaimer: "AIは不正確な情報を表示する可能性があります。検証結果は参考としてご活用ください。",
    coupangDisclaimer: "この記事はCoupang Partners活動の一環であり、それに応じた手数料を受け取ります。",
    limitReachedTitle: "1日の利用制限に達しました",
    limitReachedDesc: "無料利用分を使い切りました。\nPro待機リストに登録して無制限アクセス特典を受け取りましょう。",
    adModal: {
      removeAds: "広告なしで検証",
      waitingBored: "待ちきれませんか？",
      goPremium: "Pro待機リストに登録して広告を削除",
      aiRecommend: "広告 • AIおすすめアイテム",
      analyzing: "AIが関連商品を探しています..."
    },
    pricing: {
      tagline: "Beta Service",
      title: "より強力なクロスチェック体験",
      desc: "現在ベータ版です。正式リリース時に最速で通知を受け取り、初期ユーザー限定特典をご利用ください。",
      free: {
        name: "Beta Free",
        price: "$0",
        badge: "現在のプラン",
        desc: "制限付き無料体験",
        features: [
          "一般会話 1日3回",
          "深度クロスチェック 1日6回",
          "広告あり"
        ],
        btn: "利用中"
      },
      starter: {
        name: "Starter",
        price: "$4.99",
        badge: "Coming Soon",
        desc: "手軽に始めるAIクロスチェック",
        features: [
          "一般会話無制限",
          "深度クロスチェック 1日30回",
          "広告なしの快適な環境"
        ],
        btn: "通知を受け取る"
      },
      pro: {
        name: "Pro",
        price: "$19.99",
        badge: "Coming Soon",
        desc: "専門家のための完璧な分析ツール",
        features: [
          "GPT-5.1 無制限会話",
          "無制限 深度クロスチェック",
          "優先回答処理 (Fast Lane)",
          "最新モデルへの優先アクセス"
        ],
        btn: "通知を受け取る"
      },
      waitlist: {
        title: "リリース通知を受け取る",
        desc: "メールアドレスを登録すると、Proプラン開始時に50%割引クーポンをお送りします。",
        placeholder: "メールアドレスを入力",
        btn: "登録",
        successTitle: "登録完了！",
        successDesc: "ご関心をお寄せいただきありがとうございます。サービス開始次第、すぐにお知らせいたします。"
      }
    }
  }
};
