// Vercel Serverless Function – saves news as JSON in Vercel KV (or logs it)

import { kv } from '@vercel/kv'; // Optional: for persistent storage

export async function POST(request) {
  // 🔐 Optional: secure with a secret
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${process.env.NEWS_SECRET}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { news } = await request.json();

    // ✅ Option A: Save to Vercel KV (best for persistence)
    // await kv.set('latest_finance_news', JSON.stringify(news), { ex: 3600 }); // expires in 1h

    // ✅ Option B: For testing — just log and return success
    console.log('✅ Received', news.length, 'news items');

    return new Response(JSON.stringify({ success: true, count: news.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
