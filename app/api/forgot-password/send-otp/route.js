
import nodemailer from 'nodemailer';
import Otp from '@/app/lib/models/Otp';
import connectToDatabase from '@/app/lib/db/mongo'; 

export async function POST(req) {
  await connectToDatabase(); 
  const { email } = await req.json();

  if (!email) {
    return Response.json({ message: 'Email required' }, { status: 400 });
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); 
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

  await Otp.findOneAndUpdate(
    { email },
    { otpCode, expiresAt },
    { upsert: true, new: true }
  );

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
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
  });
  
  return Response.json({ message: 'OTP sent' }, { status: 200 });
}
