import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { randomInt } from 'node:crypto';
import Otp from '@/app/lib/models/Otp';
import connectToDatabase from '@/app/lib/db/mongo';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
 
  await connectToDatabase();

 
  let data;
  try {
    data = await req.json();
  } catch (err) {
    console.error('❌ [forgot-otp] JSON parse error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { email } = data;
  if (!email) {
    return new Response(
      JSON.stringify({ success: false, error: 'Email is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }


  const otpCode = randomInt(100000, 1000000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

  await Otp.findOneAndUpdate(
    { email },
    { otpCode, expiresAt },
    { upsert: true, new: true }
  );

 
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
  <h2 style="color: #333;">Reset Your ReadHaven Password</h2>
  <p style="font-size: 16px;">Use the following One-Time Password (OTP) to reset your account password:</p>
  <p style="font-size: 28px; font-weight: bold; color: #1a202c; margin: 16px 0;">${otpCode}</p>
  <p style="font-size: 14px; color: #555;">This OTP will expire in 10 minutes.</p>

  <p style="font-size: 14px; color: #999; margin-top: 24px;">
    If you didn't request a password reset, you can safely ignore this email.
  </p>

  <p style="font-size: 14px; color: #777; margin-top: 32px; border-top: 1px solid #ddd; padding-top: 16px;">
    With appreciation,<br />
    <strong style="color: #333;">Dharani</strong><br />
    <em style="color: #555;">Founder, ReadHaven</em>
  </p>
</div>

  `;


  try {
    if (process.env.NODE_ENV === 'production') {
      const result = await resend.emails.send({
        from: 'ReadHaven <no-reply@dharanireadhaven.store>',
        to: [email],
        subject: 'Your ReadHaven Password Reset OTP',
        html: htmlContent,
      });
      if (result.error) {
        console.error('❌ [forgot-otp] Resend error:', result.error);
        throw new Error(result.error.message);
      }
    } else {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
     
      await transporter.verify();
      await transporter.sendMail({
        from: `"Dharani Prasath - ReadHaven" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your ReadHaven Password Reset OTP',
        html: htmlContent,
      });
      console.log(`🛠 Dev forgot‑password OTP for ${email}:`, otpCode);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'OTP sent' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('❌ [forgot-otp] Error sending OTP:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to send OTP' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
