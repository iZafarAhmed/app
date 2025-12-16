// app/api/save-news/route.js

export async function POST(request) {
  // ✅ Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*', // Allow all origins (for testing)
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  // Handle preflight (OPTIONS) request
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // 🔐 Optional: Secure with secret
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${process.env.NEWS_SECRET}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers
    });
  }

  try {
    const { news } = await request.json();

    console.log('✅ Received', news.length, 'news items');

    return new Response(JSON.stringify({ success: true, count: news.length }), {
      status: 200,
      headers
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers
    });
  }
}
