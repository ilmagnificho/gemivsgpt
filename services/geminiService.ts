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

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Gemini Non-JSON Response:", text);
      // Clean up HTML tags for better readability in error message
      const cleanText = text.replace(/<[^>]*>/g, ' ').substring(0, 150);
      return `[Server Error] 서버 응답 오류: ${cleanText}...`;
    }

    if (!response.ok) {
      const errorMsg = data.error || data.message || JSON.stringify(data);
      throw new Error(errorMsg);
    }

    return data.text || "응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `[Gemini Error] 요청을 처리하는 중 문제가 발생했습니다: ${(error as Error).message}`;
  }
};