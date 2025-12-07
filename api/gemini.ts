import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Official latest model from docs
const GEMINI_MODEL = 'gemini-2.5-flash';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Debug Log
  console.log("Gemini API Called. Method:", req.method);
  console.log("Gemini API_KEY Configured:", !!process.env.API_KEY);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, history, systemInstruction } = req.body;

  if (!process.env.API_KEY) {
    console.error("Missing API_KEY (Gemini) environment variable");
    return res.status(500).json({ error: 'Gemini API Key is not configured on the server environment variables.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Construct the contents array for generateContent
    // Combine history + current prompt
    const contents = history?.map((msg: any) => ({
      role: msg.role,
      parts: msg.parts
    })) || [];

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    // Enhance System Instruction for Readability
    const enhancedSystemInstruction = systemInstruction 
      ? systemInstruction 
      : `당신은 Gemini 2.5 Flash입니다. 
         [형식 가이드]
         1. 가독성을 위해 모든 문단 사이에는 빈 줄을 두어 여백을 만드세요.
         2. 중요한 내용은 Markdown 불릿 포인트나 숫자로 구조화하세요.
         3. 텍스트가 뭉쳐 보이지 않도록 줄바꿈을 적극 활용하세요.`;

    // Use models.generateContent as per Gemini 2.5 docs
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: contents,
      config: {
        systemInstruction: enhancedSystemInstruction,
        temperature: 0.7,
      }
    });

    return res.status(200).json({ text: response.text });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Unknown Gemini API Error',
      details: JSON.stringify(error)
    });
  }
}