
import Otp from '@/app/lib/models/Otp';
import User from '@/app/lib/models/User';
import connectToDatabase from '@/app/lib/db/mongo'; 
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await connectToDatabase(); 
  const { email, otp, newPassword } = await req.json();

  const otpDoc = await Otp.findOne({ email });
  if (!otpDoc || otpDoc.otpCode !== otp || otpDoc.expiresAt < new Date()) {
    return Response.json({ message: 'Invalid or expired OTP' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashedPassword });

  await Otp.deleteOne({ email }); 

  return Response.json({ message: 'Password reset successful' }, { status: 200 });
}
