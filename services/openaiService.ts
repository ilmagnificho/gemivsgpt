/**
 * OpenAI API Integration via Vercel Serverless Functions.
 * This prevents exposure of the API Key on the client side.
 */

// General Chat: Calls backend to use gpt-4o-mini
export const callOpenAIAPI = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch('/api/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'chat',
        prompt: prompt
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI Server Error:", errorData);
      return `[OpenAI Error] 요청이 실패했습니다. (Status: ${response.status})`;
    }

    const data = await response.json();
    return data.text || "응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("OpenAI API Fetch Error:", error);
    return `[Network Error] 서버 연결 중 문제가 발생했습니다.`;
  }
};

/**
 * Critique: Calls backend to use gpt-4o
 */
export const callOpenAICritique = async (geminiResponse: string, userPrompt: string): Promise<string> => {
  try {
    const response = await fetch('/api/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'critique',
        prompt: '', // Not used for critique directly in main prompt logic
        userOriginalPrompt: userPrompt,
        geminiResponse: geminiResponse
      }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return data.text || "검증 리포트를 생성할 수 없습니다.";
  } catch (error) {
    console.error("OpenAI Critique Error:", error);
    return `[OpenAI Error] 검증 중 오류 발생: ${(error as Error).message}`;
  }
};