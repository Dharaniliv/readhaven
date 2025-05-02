
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
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP is <strong>${otpCode}</strong>. It will expire in 10 minutes.</p>`,
  });

  return Response.json({ message: 'OTP sent' }, { status: 200 });
}
