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

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      // If parsing fails, it's likely an HTML error page from Vercel (500/404)
      console.error("OpenAI Non-JSON Response:", text);
      // Try to extract title from HTML if possible
      const match = text.match(/<title>(.*?)<\/title>/i);
      const title = match ? match[1] : "Unknown Server Error";
      return `[Server Error] 서버 응답 오류: ${title} (Check Console)`;
    }

    if (!response.ok) {
      console.error("OpenAI Server Error:", data);
      const errorMsg = data.error || data.message || JSON.stringify(data);
      return `[OpenAI Error] ${errorMsg}`;
    }

    return data.text || "응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("OpenAI API Fetch Error:", error);
    return `[Network Error] 서버 연결 중 문제가 발생했습니다: ${(error as Error).message}`;
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

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("OpenAI Critique Non-JSON Response:", text);
      const match = text.match(/<title>(.*?)<\/title>/i);
      const title = match ? match[1] : "Unknown Server Error";
      return `[Server Error] 서버 응답 오류: ${title}`;
    }

    if (!response.ok) {
      const errorMsg = data.error || data.message || JSON.stringify(data);
      throw new Error(errorMsg);
    }

    return data.text || "검증 리포트를 생성할 수 없습니다.";
  } catch (error) {
    console.error("OpenAI Critique Error:", error);
    return `[OpenAI Error] 검증 중 오류 발생: ${(error as Error).message}`;
  }
};