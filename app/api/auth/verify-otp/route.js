import connectToDatabase from '@/app/lib/db/mongo';
import Otp from '@/app/lib/models/Otp';

export async function POST(req) {
  try {
    const { otpCode, email } = await req.json();

    if (!email || !otpCode) {
      return new Response(JSON.stringify({ success: false, error: 'Email and OTP are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectToDatabase();

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return new Response(JSON.stringify({ success: false, error: 'OTP not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (new Date() > otpRecord.expiresAt) {
      return new Response(JSON.stringify({ success: false, error: 'OTP has expired' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (otpRecord.otpCode !== otpCode) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid OTP' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await Otp.deleteOne({ email }); 

    return new Response(JSON.stringify({ success: true, message: 'OTP verified successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error('Error verifying OTP:', error);
    }
  
    return new Response(JSON.stringify({ success: false, error: 'Error verifying OTP' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
