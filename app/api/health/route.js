// app/api/health/route.js

export async function GET() {
    const res = await fetch('https://api.resend.com/health', {
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return new Response(`Resend health: ${res.status}`, { status: res.status });
  }
  