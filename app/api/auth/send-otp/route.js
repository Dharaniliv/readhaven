
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { setOtpInDatabase } from '@/app/lib/utils/database';

export async function POST(req) {
 
  const raw = await req.text();
  let data;
  try {
    data = JSON.parse(raw);

  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error('❌ [send-otp] JSON parse error:', err);
    }
  
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
  const { email } = data;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  
      pass: process.env.EMAIL_PASS,   
    },
  });

  
  try {
    await transporter.verify();
  } catch (verErr) {
    if (process.env.NODE_ENV === "development") {
      console.error('🚨 [send-otp] SMTP verify failed:', verErr);
    }
   
    return new Response(
      JSON.stringify({ success: false, error: 'SMTP connection failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }


  const otpCode = uuidv4().slice(0, 6);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otpCode}`,
  };


  try {
    const info = await transporter.sendMail(mailOptions);
    

    await setOtpInDatabase(email, otpCode);
  

    return new Response(
      JSON.stringify({ success: true, message: 'OTP sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (sendErr) {
    if (process.env.NODE_ENV === "development") {
      console.error('❌ [send-otp] Error sending OTP:', sendErr);
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Failed to send OTP' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
