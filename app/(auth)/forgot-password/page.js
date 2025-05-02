'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from 'next/image';


const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

export default function ForgotPasswordPage() {
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);  
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (data) => {
    setFormError('');
    setSuccessMessage('');
    setIsLoading(true); 

    try {
      const res = await fetch('/api/forgot-password/check-email', {
        method: 'POST',
        body: JSON.stringify({ email: data.email }),
        headers: { 'Content-Type': 'application/json' },
      });

      const responseData = await res.json();

      if (!res.ok) {
        setFormError(responseData.message || 'Error checking email');
        setIsLoading(false);  
        return;
      }

      if (responseData.userExists && responseData.userType === 'google') {
        setFormError('It looks like you signed up with Google. Please click "Continue with Google" to log in.');
        setTimeout(() => router.push('/login'), 3000);
        setIsLoading(false); 
      } else if (responseData.userExists && responseData.userType === 'email') {
        const otpRes = await fetch('/api/forgot-password/send-otp', {
          method: 'POST',
          body: JSON.stringify({ email: data.email }),
          headers: { 'Content-Type': 'application/json' },
        });

        const otpData = await otpRes.json();
        if (!otpRes.ok) {
          setFormError(otpData.message || 'Error sending OTP');
          setIsLoading(false);  
          return;
        }

        setSuccessMessage('OTP sent to your email');
        setTimeout(() => {
          router.push(`/forgot-password/verify?email=${data.email}`);
        }, 2000);
        setIsLoading(false);  
      } else {
        setFormError('User with this email does not exist.');
        setIsLoading(false);  
      }
    } catch (error) {
      setFormError('Something went wrong. Please try again.');
      setIsLoading(false);  
    }
  };
  const handleBackToLogin = () => {
    router.push('/login');
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#7A4E2D] px-4">
      <form onSubmit={handleSubmit(handleSubmitForm)} className="bg-[#F5E8D9] p-6 rounded-[15px] shadow max-w-md w-full" noValidate>
        <h2 className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-bold text-[#7A4E2D] font-playfair text-center mb-4">
          Forgot Password
        </h2>

       
        {formError && (
          <div className="text-red-500 text-center text-sm mb-4">
            {formError}
          </div>
        )}

    
        {successMessage && (
          <div className="text-green-600 text-center text-sm mb-4">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col gap-[4px] mb-4">
          <label className="text-[#5A3E36] text-[13px] sm:text-[14px] font-medium font-inter">Email</label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              className="w-full h-[46px] sm:h-[52px] px-4 py-[9px] border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#7A4E2D] placeholder-[#9C7A56] font-lora text-[16px] sm:text-[18px] leading-[28px] focus:outline-none"
            />
            <Image
              src={isEmailFocused ? '/icons/Emailcontacthover.svg' : '/icons/Emailcontact.svg'}
              alt="Email Icon"
              width={24}
              height={24}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

      
        <button 
          type="submit"
          className="w-full bg-[#7A4E2D] text-white py-2 rounded-[6px] hover:bg-[#5e3b1d] transition relative h-[44px] flex items-center justify-center"
          disabled={isLoading}  
        >
          {isLoading ? (
            <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            'Send OTP'
          )}
        </button>
     
      <div className="mt-4 text-center">
        <button
          onClick={handleBackToLogin}
          className="text-[#7A4E2D] text-sm font-medium hover:underline hover:text-[#8B5E3C] transition"
        >
          Back to Login
        </button>
      </div>
      </form>
    </div>
  );
}
