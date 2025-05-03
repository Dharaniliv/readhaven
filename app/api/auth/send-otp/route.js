
import nodemailer from 'nodemailer';
import { randomInt } from 'node:crypto';

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


  const otpCode = randomInt(100000, 1_000_000).toString();
 
  const mailOptions = {
    from: `"Dharani Prasath - ReadHaven" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP Code for ReadHaven',
  html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
    <h2 style="color: #333;">Welcome to ReadHaven</h2>
    <p style="font-size: 16px;">Your One-Time Password (OTP) is:</p>
    <p style="font-size: 28px; font-weight: bold; color: #1a202c; margin: 16px 0;">${otpCode}</p>
    <p style="font-size: 14px; color: #555;">This OTP will expire in 10 minutes. Please do not share it with anyone.</p>

    <p style="font-size: 14px; color: #777; margin-top: 32px; border-top: 1px solid #ddd; padding-top: 16px;">
      With appreciation,<br />
      <strong style="color: #333;">Dharani</strong><br />
      <em style="color: #555;">Founder, ReadHaven</em>
    </p>
  </div>
`
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