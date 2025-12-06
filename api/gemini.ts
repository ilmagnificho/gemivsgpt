import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Use the stable alias
const GEMINI_MODEL = 'gemini-2.5-flash';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    // Return specific error message to client
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}