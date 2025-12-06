import { OpenAI } from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Debug Log
  console.log("GPT API Called. Method:", req.method);
  console.log("OPENAI_API_KEY Configured:", !!process.env.OPENAI_API_KEY);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, type, geminiResponse, userOriginalPrompt } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY environment variable");
    return res.status(500).json({ error: 'OpenAI API Key is not configured on the server environment variables.' });
  }

  // Initialize OpenAI Client inside the handler
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Helper function to call OpenAI with fallback logic
  const callOpenAIWithFallback = async (model: string, messages: any[], options: any = {}) => {
    try {
      console.log(`Attempting to call OpenAI with model: ${model}`);
      // Cast options to any to support new parameters like reasoning_effort
      const params: any = {
        model,
        messages,
        ...options
      };

      // Handle reasoning_effort mapping for newer models if needed
      if (model.includes('gpt-5') && options.reasoning_effort) {
        // Just passing it through as per documentation simulation
        params.reasoning_effort = options.reasoning_effort;
      }

      return await openai.chat.completions.create(params);
    } catch (error: any) {
      // Check for Model Not Found (404) or Bad Request (400) which might indicate invalid model name
      if (error.status === 404 || error.status === 400) {
        console.warn(`Model ${model} failed (Status ${error.status}). Falling back to gpt-4o.`);
        // Fallback to stable gpt-4o
        return await openai.chat.completions.create({
          model: 'gpt-4o',
          messages,
          temperature: 0.7 
        });
      }
      throw error;
    }
  };

  try {
    let responseContent = "";

    if (type === 'chat') {
      // General Chat: Use gpt-5-nano for high throughput as requested
      const completion = await callOpenAIWithFallback(
        'gpt-5-nano', 
        [{ role: 'user', content: prompt }],
        { 
          // Attempt to use low reasoning effort for speed (simulating documented behavior)
          reasoning_effort: 'low',
          temperature: 0.7 
        }
      );
      responseContent = completion.choices[0]?.message?.content || "";

    } else if (type === 'critique') {
      // Critique: Use gpt-5-nano as requested (Changed from gpt-5.1)
      const isReverify = userOriginalPrompt?.includes("REVERIFY");
      
      const systemPrompt = `당신은 엄격하고 논리적인 AI 검토자입니다. 상대방 AI(Gemini)의 답변을 분석하여 사실 관계 오류, 논리적 비약, 혹은 누락된 정보를 지적하세요. 
      사용자에게 도움이 되는 구체적인 개선안을 제시해야 합니다.
      ${isReverify ? "이것은 재검증 요청입니다. 이전보다 더 깊이 있게 비판적으로 분석하세요." : ""}
      응답은 사용자의 언어와 동일한 언어로 작성하세요.`;

      const userContent = `
      [사용자 질문]
      ${userOriginalPrompt}

      [상대방(Gemini) 답변]
      ${geminiResponse}

      위 내용을 바탕으로 교차 검증 리포트를 작성해줘.
      `;

      const completion = await callOpenAIWithFallback(
        'gpt-5-nano', // Changed from gpt-5.1 to gpt-5-nano
        [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        {
          // Medium reasoning effort for critique to maintain some quality even with nano
          reasoning_effort: 'medium', 
          temperature: 0.7
        }
      );
      responseContent = completion.choices[0]?.message?.content || "";
    }

    return res.status(200).json({ text: responseContent });

  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    // Ensure we send back a useful error message even if message prop is missing
    const errorMessage = error.message || JSON.stringify(error);
    return res.status(500).json({ error: errorMessage });
  }
}