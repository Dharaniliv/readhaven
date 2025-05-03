export async function GET() {
    const res = await fetch('https://api.resend.com/health');
    return new Response(`Resend health: ${res.status}`, { status: res.status });
  }
  