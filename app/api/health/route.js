export async function GET() {
    console.log('🔑 PROD RESEND_API_KEY prefix:', process.env.RESEND_API_KEY?.slice(0,6));
    const res = await fetch('https://api.resend.com/health', {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    });
    return new Response(`Resend health: ${res.status}`);
  }
  
  