
import connectToDatabase from '../db/mongo';
import Otp from '../models/Otp';

export async function setOtpInDatabase(email, otpCode) {
  try {
    const db = await connectToDatabase();

   
    const otp = await Otp.findOneAndUpdate(
      { email },  
      { 
        otpCode, 
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) 
      },
      { upsert: true, new: true } 
    );

    return otp;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error('Error saving OTP to DB:', error);
    }
  
    throw error;
  }
}
