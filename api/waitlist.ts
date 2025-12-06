import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Log to Vercel Logs (This is how we collect data without a DB for now)
  console.log(`[Waitlist] New submission: ${email}`);

  return res.status(200).json({ success: true, message: 'Joined waitlist' });
}