'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from 'next/image';


const schema = Yup.object().shape({
  otp: Yup.string().required('OTP is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Za-z]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one number')
    .required('New password is required'),
});

export default function VerifyOtpClient() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirectingMessage, setRedirectingMessage] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (data) => {
    setLoading(true);
    setOtpError('');
    setSuccessMessage('');
    setRedirectingMessage('');

    const res = await fetch('/api/forgot-password/verify-otp', {
      method: 'POST',
      body: JSON.stringify({
        email,
        otp: data.otp,
        newPassword: data.newPassword
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const responseData = await res.json();

   if (res.ok) {
  setTimeout(() => {
    setLoading(false); 
    setSuccessMessage('Password updated successfully.');

    setTimeout(() => {
      setSuccessMessage('');
      setRedirectingMessage('Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000); 
    }, 2000); 
  }, 2000); 
} else {
  setLoading(false);
  setOtpError(responseData.message || 'Failed to verify OTP. Please try again.');
}

    
    
    
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#7A4E2D] px-4">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="bg-[#F5E8D9] p-6 rounded-[15px] shadow max-w-md w-full"
        noValidate
      >
        <h2 className="text-[24px] sm:text-[30px] leading-[30px] sm:leading-[38px] font-playfair font-bold text-[#7A4E2D] text-center mb-4">
          Verify OTP & Reset Password
        </h2>

      
        {successMessage && (
          <p className="text-green-600 font-medium text-center mb-4">{successMessage}</p>
        )}

     
        {redirectingMessage && (
          <p className="text-yellow-600 font-medium text-center mb-4">{redirectingMessage}</p>
        )}

      
        <div className="flex flex-col gap-[4px] mb-3">
          <label className="text-[#5A3E36] text-[13px] sm:text-[14px] font-medium font-inter">OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            {...register('otp')}
            className={`w-full h-[46px] sm:h-[52px] px-4 py-[9px] border rounded-[8px] bg-transparent text-[#7A4E2D] placeholder-[#9C7A56] font-lora text-[16px] sm:text-[18px] leading-[28px] focus:outline-none ${
              errors.otp || otpError ? 'border-red-500' : 'border-[#7A4E2D]'
            }`}
          />
          {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
          {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
        </div>

       
        <div className="flex flex-col gap-[4px] mb-4">
          <label className="text-[#5A3E36] text-[13px] sm:text-[14px] font-medium font-inter">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              {...register('newPassword')}
              className={`w-full h-[46px] sm:h-[52px] px-4 pr-12 py-[9px] border rounded-[8px] bg-transparent text-[#7A4E2D] placeholder-[#9C7A56] font-lora text-[16px] sm:text-[18px] leading-[28px] focus:outline-none ${
                errors.newPassword ? 'border-red-500' : 'border-[#7A4E2D]'
              }`}
            />
            <Image
              src={showPassword ? "/icons/visibilityon.svg" : "/icons/visibilityoff.svg"}
              alt="Toggle Visibility"
              width={20}
              height={20}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
          )}
        </div>

     
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7A4E2D] text-white py-2 rounded-[6px] hover:bg-[#5e3b1d] transition disabled:opacity-50"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}

