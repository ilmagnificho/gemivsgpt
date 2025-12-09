import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // 1. DB 연결 확인 (환경 변수가 없으면 로그만 남기고 성공 처리 - 로컬 테스트용)
    if (!process.env.POSTGRES_URL) {
      console.warn("POSTGRES_URL not found. Logging to console instead.");
      console.log(`[Waitlist Local] New submission: ${email}`);
      return res.status(200).json({ success: true, message: 'Joined waitlist (Local Mode)' });
    }

    // 2. 테이블이 존재하는지 확인하고 없으면 생성 (Lazy Initialization)
    // 실제 프로덕션에서는 별도의 마이그레이션 스크립트로 관리하는 것이 좋으나, 편의를 위해 여기에 포함
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. 이메일 중복 체크 및 저장
    try {
      await sql`
        INSERT INTO waitlist (email)
        VALUES (${email})
        ON CONFLICT (email) DO NOTHING;
      `;
    } catch (insertError) {
      console.error("Database Insert Error:", insertError);
      // 이미 존재하는 경우 등은 조용히 성공 처리하거나 에러 반환 가능
    }

    console.log(`[Waitlist DB] New submission: ${email}`);
    return res.status(200).json({ success: true, message: 'Joined waitlist' });

  } catch (error) {
    console.error('Waitlist API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}