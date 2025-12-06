import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, history, systemInstruction } = req.body;

  if (!process.env.API_KEY) {
    return res.status(500).json({ error: 'Gemini API Key is not configured on the server.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Construct history in the format Gemini expects
    // Note: The @google/genai SDK on Node might have slightly different history expectations
    // than the pure REST API, but generally matches.
    const validHistory = history?.map((msg: any) => ({
      role: msg.role,
      parts: msg.parts
    })) || [];

    const chat = ai.chats.create({
      model: GEMINI_MODEL,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      history: validHistory
    });

    const result = await chat.sendMessage({
      message: prompt
    });

    return res.status(200).json({ text: result.text });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}