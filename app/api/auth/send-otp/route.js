import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { randomInt } from 'node:crypto';
import { setOtpInDatabase } from '@/app/lib/utils/database';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {

  let data;
  try {
    data = await req.json();
  } catch (err) {
    console.error('❌ [send-otp] JSON parse error:', err);
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


  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
  <h2 style="color: #333;">Welcome to ReadHaven</h2>
  <p style="font-size: 16px;">Your One‑Time Password (OTP) is:</p>
  <p style="font-size: 28px; font-weight: bold; color: #1a202c; margin: 16px 0;">
    ${otpCode}
  </p>
  <p style="font-size: 14px; color: #555;">
    This OTP will expire in 10 minutes. Please do not share it with anyone.
  </p>

  <p style="font-size: 14px; color: #999; margin-top: 24px;">
    If you didn’t request this, you can safely ignore this email.
  </p>

  <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />
  <p style="font-size: 14px; color: #777;">
    With appreciation,<br/>
    <strong>Dharani</strong><br/>
    <em>Founder, ReadHaven</em>
  </p>
</div>

  `;


  try {
    if (process.env.NODE_ENV === 'production') {
    
      const result = await resend.emails.send({
        from: 'ReadHaven <no-reply@dharanireadhaven.store>',
        to: [email],
        subject: 'Your OTP Code for ReadHaven',
        html: htmlContent,
      });
      if (result.error) {
        console.error('❌ [send-otp] Resend error:', result.error);
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
        subject: 'Your OTP Code for ReadHaven',
        html: htmlContent,
      });

     
      console.log(`🛠 Dev OTP for ${email}:`, otpCode);
    }


    await setOtpInDatabase(email, otpCode);

    return new Response(
      JSON.stringify({ success: true, message: 'OTP sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('❌ [send-otp] Error sending OTP:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to send OTP' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
