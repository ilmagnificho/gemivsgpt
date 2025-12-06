export enum ModelProvider {
  GEMINI = 'GEMINI',
  GPT = 'GPT',
  USER = 'USER',
  SYSTEM = 'SYSTEM'
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface CritiqueItem {
  id: string;
  geminiContent: string;
  gptContent: string;
  timestamp: number;
}

export interface ConversationRound {
  id: string;
  userPrompt: string;
  geminiResponse: string | null;
  gptResponse: string | null;
  isGeminiLoading: boolean;
  isGptLoading: boolean;
  
  // Threaded Critiques
  critiques: CritiqueItem[];
  isCritiqueLoading: boolean; 

  timestamp: number;
}