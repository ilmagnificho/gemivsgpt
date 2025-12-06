import { ChatMessage } from "../types";

export const callGeminiAPI = async (
  prompt: string,
  history: ChatMessage[],
  systemInstruction?: string
): Promise<string> => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        history,
        systemInstruction
      }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return data.text || "응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `[Gemini Error] 요청을 처리하는 중 문제가 발생했습니다: ${(error as Error).message}`;
  }
};