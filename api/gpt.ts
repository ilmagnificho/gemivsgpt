import { OpenAI } from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, type, geminiResponse, userOriginalPrompt } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY environment variable");
    return res.status(500).json({ error: 'OpenAI API Key is not configured on the server environment variables.' });
  }

  // Initialize OpenAI Client inside the handler to prevent cold-start crashes if env is missing
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    let responseContent = "";

    if (type === 'chat') {
      // General Chat: Use gpt-4o-mini for efficiency
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      });
      responseContent = completion.choices[0]?.message?.content || "";

    } else if (type === 'critique') {
      // Critique: Use gpt-4o for high reasoning
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

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        temperature: 0.7,
      });
      responseContent = completion.choices[0]?.message?.content || "";
    }

    return res.status(200).json({ text: responseContent });

  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}