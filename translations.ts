
export type Language = 'ko' | 'en' | 'zh' | 'ja';

export const translations = {
  ko: {
    title: "Gemi vs GPT",
    subtitle: "AI 교차 검증",
    heroTitle: "더 완벽한 답변을 위한 AI 교차 검증",
    heroDesc: "Gemini와 GPT의 답변을 동시에 비교하세요.\n상호 검증을 통해 놓친 정보를 찾고 최적의 해답을 제시합니다.",
    placeholder: "검증하고 싶은 주제나 질문을 입력하세요...",
    send: "분석 시작",
    reset: "새로운 대화",
    geminiName: "GEMINI 2.5",
    gptName: "GPT-4o",
    critiqueBtn: "교차 검증 실행",
    reCritiqueBtn: "추가 교차 검증",
    critiqueLoading: "답변을 정밀 분석하고 보완점을 찾는 중...",
    geminiCritiqueTitle: "Gemini의 검증 리포트",
    gptCritiqueTitle: "GPT의 검증 리포트",
    disclaimer: "Gemini는 부정확한 정보를 제공할 수 있습니다. GPT 응답은 시뮬레이션입니다.",
    pricing: {
      tagline: "Coming Soon",
      title: "더 강력한 교차 검증 경험",
      desc: "현재 베타 서비스 중입니다. 정식 출시 시 가장 먼저 알림을 받고, 초기 사용자 한정 혜택을 누리세요.",
      starter: {
        name: "Starter",
        price: "$4.99",
        desc: "가볍게 시작하는 AI 교차 검증",
        features: [
          "일반 대화 무제한 (GPT-4o mini)",
          "심층 교차 검증 일 30회",
          "광고 없는 쾌적한 환경"
        ],
        btn: "현재 기본 제공 중"
      },
      pro: {
        name: "Pro",
        price: "$19.99",
        desc: "전문가를 위한 완벽한 분석 도구",
        features: [
          "GPT-4o 무제한 대화",
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
    title: "Gemi vs GPT",
    subtitle: "AI Cross-Check",
    heroTitle: "AI Cross-Verification Platform",
    heroDesc: "Compare answers from Gemini and GPT simultaneously.\nFind optimal solutions through mutual verification and analysis.",
    placeholder: "Enter a topic to verify...",
    send: "Analyze",
    reset: "New Chat",
    geminiName: "GEMINI 2.5",
    gptName: "GPT-4o",
    critiqueBtn: "Run Cross-Check",
    reCritiqueBtn: "Run Additional Check",
    critiqueLoading: "Analyzing answers for improvements...",
    geminiCritiqueTitle: "Gemini's Verification Report",
    gptCritiqueTitle: "GPT's Verification Report",
    disclaimer: "Gemini may display inaccurate info. GPT response is simulated.",
    pricing: {
      tagline: "Coming Soon",
      title: "Enhanced Cross-Verification",
      desc: "Currently in beta. Get notified first when we launch and enjoy exclusive early bird benefits.",
      starter: {
        name: "Starter",
        price: "$4.99",
        desc: "Lightweight AI cross-check",
        features: [
          "Unlimited General Chat (GPT-4o mini)",
          "30 Deep Cross-Checks / Day",
          "Ad-Free Experience"
        ],
        btn: "Currently Available"
      },
      pro: {
        name: "Pro",
        price: "$19.99",
        desc: "The ultimate tool for professionals",
        features: [
          "Unlimited GPT-4o Chat",
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
    title: "Gemi vs GPT",
    subtitle: "AI 交叉验证",
    heroTitle: "AI 智能交叉验证平台",
    heroDesc: "同时比较 Gemini 和 GPT 的答案。\n通过相互验证发现遗漏信息并提供最佳解决方案。",
    placeholder: "输入想要验证的主题...",
    send: "开始分析",
    reset: "新对话",
    geminiName: "GEMINI 2.5",
    gptName: "GPT-4o",
    critiqueBtn: "执行交叉验证",
    reCritiqueBtn: "追加验证",
    critiqueLoading: "正在分析答案并寻找改进点...",
    geminiCritiqueTitle: "Gemini 验证报告",
    gptCritiqueTitle: "GPT 验证报告",
    disclaimer: "Gemini 可能会提供不准确的信息。GPT 响应是模拟的。",
    pricing: {
      tagline: "Coming Soon",
      title: "更强大的交叉验证体验",
      desc: "目前处于测试阶段。正式发布时第一时间获取通知，享受早期用户专属优惠。",
      starter: {
        name: "Starter",
        price: "$4.99",
        desc: "轻松开始 AI 交叉验证",
        features: [
          "无限一般对话 (GPT-4o mini)",
          "每日 30 次深度交叉验证",
          "无广告体验"
        ],
        btn: "当前可用"
      },
      pro: {
        name: "Pro",
        price: "$19.99",
        desc: "专业人士的终极分析工具",
        features: [
          "无限 GPT-4o 对话",
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
    title: "Gemi vs GPT",
    subtitle: "AI クロスチェック",
    heroTitle: "より完璧な回答のためのAI相互検証",
    heroDesc: "GeminiとGPTの回答を同時に比較しましょう。\n相互検証を通じて最適な解を見つけ出します。",
    placeholder: "検証したいテーマや質問を入力...",
    send: "分析開始",
    reset: "新しい対話",
    geminiName: "GEMINI 2.5",
    gptName: "GPT-4o",
    critiqueBtn: "クロスチェック実行",
    reCritiqueBtn: "追加検証を実行",
    critiqueLoading: "回答を精密分析し、改善点を探しています...",
    geminiCritiqueTitle: "Geminiによる検証レポート",
    gptCritiqueTitle: "GPTによる検証レポート",
    disclaimer: "Geminiは不正確な情報を表示する可能性があります。GPTの応答はシミュレーションです。",
    pricing: {
      tagline: "Coming Soon",
      title: "より強力なクロスチェック体験",
      desc: "現在ベータ版です。正式リリース時に最速で通知を受け取り、初期ユーザー限定特典をご利用ください。",
      starter: {
        name: "Starter",
        price: "$4.99",
        desc: "手軽に始めるAIクロスチェック",
        features: [
          "一般会話無制限 (GPT-4o mini)",
          "深度クロスチェック 1日30回",
          "広告なしの快適な環境"
        ],
        btn: "現在利用可能"
      },
      pro: {
        name: "Pro",
        price: "$19.99",
        desc: "専門家のための完璧な分析ツール",
        features: [
          "GPT-4o 無制限会話",
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