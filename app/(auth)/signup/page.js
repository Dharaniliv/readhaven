"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react'; 
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";




const schema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  otp: Yup.string().when("otpSent", {
    is: true,
    then: Yup.string().required('OTP is required'),
  }),
});

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false); 
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState(''); 
  const [formError, setFormError] = useState('');

const [loadingSendOtp, setLoadingSendOtp] = useState(false);
const [loadingVerifyOtp, setLoadingVerifyOtp] = useState(false);
const { data: session } = useSession();
const router = useRouter();


  const {
       register,
      handleSubmit,
       getValues,
       formState: { errors },
       setValue
     } = useForm({
         resolver: yupResolver(schema),
       });
    


  const onSubmit = async (data) => {
    setFormError('');
    setOtpError('');
  
  
    if (otpSent && !otpCode) {
      setOtpError('Please enter the OTP');
      return;
    }

  try {
    const checkUser = await fetch('/api/auth/check-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email }),
    });

    const checkResult = await checkUser.json();

    if (checkResult.exists) {
      if (checkResult.googleUser) {
        setFormError('This email is already associated with a Google sign-up. Please continue with Google.');
      } else {
        setFormError('This email is already registered. Please log in with your password.');
      }
      return;
    }
  } catch (err) {
    setFormError('Error checking user existence');
    return;
}


if (!otpSent) {
  try {
    setLoadingSendOtp(true);                
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email }),
    });
    const result = await res.json();
    if (result.success) {
      setOtpSent(true);
      setOtpError('OTP has been sent. Please enter it below.');
    } else {
      setOtpError(result.error || 'Failed to send OTP');
    }
  } catch (err) {
    setOtpError('Error sending OTP');
  } finally {
    setLoadingSendOtp(false);       
  }
  return;
}


if (otpSent && otpCode) {
  try {
    setLoadingVerifyOtp(true);             

    const verify = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, otpCode }),
    });
    const vResult = await verify.json();

    if (!vResult.success) {
      setOtpError(vResult.error || 'Invalid OTP');
      return;
    }
    setOtpError('');


const signup = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fullName: data.fullName, email: data.email, password: data.password }),
});
const sResult = await signup.json();

if (sResult.message) {

  const loginResponse = await signIn('credentials', {
    redirect: false,
    email: data.email,
    password: data.password,
  });

  if (loginResponse?.ok) {
  
    setTimeout(() => {
      setSuccessMessage(`Welcome, ${data.fullName}!Your account has been created successfully!`);
      setTimeout(() => window.location.href = '/', 3000); 
    }, 2000);
  } else {
    setFormError('Account created but failed to log in. Please try logging in manually.');
  }
} else {
  setFormError(sResult.error || 'Unknown signup error');
}


  } catch (err) {
   
    if (err.response?.status === 400) {
      setOtpError('Invalid or expired OTP. Please request a new one.');
    } else {
      setOtpError('Error verifying OTP');
    }
    return;
  } finally {
    setLoadingVerifyOtp(false);             
  }
}
  }
  

  const handleSendOtp = async () => {
    const email = getValues("email");
    setFormError('');
    const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':       'application/json',
        },
        body: JSON.stringify({ email }),
      });
    const result = await response.json();
    if (result.success) {
      setOtpSent(true);  
    } 
  };


  
  return (
    <div className="bg-[#1E3A5F] min-h-screen flex justify-center pt-[60px] pb-[200px] px-4 sm:px-6">
      <div className="w-full max-w-[533px] h-auto bg-[#F5E8D9] rounded-[15px] px-6 py-8 sm:px-10 flex flex-col">
        
      
        <h1 className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-bold text-[#1E3A5F] font-playfair text-center">
          Sign Up
        </h1>

     
        <p className="mt-4 sm:mt-5 text-center text-[#1E3A5F] font-inter text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] font-medium">
          Create an account to get started
        </p>
      
        {formError && <div className="mt-4 text-red-500 text-center text-sm">{formError}</div>}
       
        {successMessage && (
          <div className="mt-4 bg-green-500 text-white p-3 rounded-md text-center">
            {successMessage}
          </div>
        )}

       
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[22px] sm:mt-[26px] flex flex-col gap-[20px] sm:gap-[25px]" noValidate>

        
          <div className="flex flex-col gap-[4px]">
            <label className="text-[#162B44] text-[13px] sm:text-[14px] font-medium font-inter tracking-[-0.01em]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register('fullName')}
              className={`w-full h-[46px] sm:h-[52px] px-4 py-[9px] border ${errors.fullName ? 'border-red-500' : 'border-[#1E3A5F]'} rounded-[8px] bg-transparent text-[#1E3A5F] placeholder-[#294E73] font-lora text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px] tracking-[-0.01em] focus:outline-none`}
            />
            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
          </div>

        
          <div className="flex flex-col gap-[4px]">
  <label className="text-[#162B44] text-[13px] sm:text-[14px] font-medium font-inter tracking-[-0.01em]">
    Email
  </label>
  <div className="relative">
    <input
      type="email"
      placeholder="Enter your email"
      {...register('email')}
      onFocus={() => setEmailFocused(true)}
      onBlur={() => setEmailFocused(false)}
      className={`w-full h-[46px] sm:h-[52px] px-4 pr-12 py-[9px] border ${errors.email ? 'border-red-500' : 'border-[#1E3A5F]'} rounded-[8px] bg-transparent text-[#1E3A5F] placeholder-[#294E73] font-lora text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px] tracking-[-0.01em] focus:outline-none`}
    />
    <Image
      src={emailFocused ? "/icons/emailhover.svg" : "/icons/email1.svg"}
      alt="Email Icon"
      width={24}
      height={24}
      className="absolute right-3 top-1/2 -translate-y-1/2"
    />
  </div>
  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
</div>

          
          <div className="flex flex-col gap-[4px]">
            <label className="text-[#162B44] text-[13px] sm:text-[14px] font-medium font-inter tracking-[-0.01em]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
                className={`w-full h-[46px] sm:h-[52px] px-4 pr-12 py-[9px] border ${errors.password ? 'border-red-500' : 'border-[#1E3A5F]'} rounded-[8px] bg-transparent text-[#1E3A5F] placeholder-[#294E73] font-lora text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px] tracking-[-0.01em] focus:outline-none`}
              />
              <Image
                src={showPassword ? "/icons/visibilityon1.svg" : "/icons/visibilityoff1.svg"}
                alt="Toggle Visibility"
                width={20}
                height={20}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

   
          <div className="flex flex-col gap-[4px]">
            <label className="text-[#162B44] text-[13px] sm:text-[14px] font-medium font-inter tracking-[-0.01em]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                {...register('confirmPassword')}
                className={`w-full h-[46px] sm:h-[52px] px-4 pr-12 py-[9px] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#1E3A5F]'} rounded-[8px] bg-transparent text-[#1E3A5F] placeholder-[#294E73] font-lora text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px] tracking-[-0.01em] focus:outline-none`}
              />
              <Image
                src={showConfirmPassword ? "/icons/visibilityon1.svg" : "/icons/visibilityoff1.svg"}
                alt="Toggle Visibility"
                width={20}
                height={20}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
          </div>

          {otpSent && (
  <div className="flex flex-col gap-[4px]">
    <label className="text-[#162B44] text-[13px] sm:text-[14px] font-medium font-inter tracking-[-0.01em]">
      Enter OTP
    </label>
    <input
      type="text"
      placeholder="Enter OTP"
      value={otpCode}
      onChange={(e) => setOtpCode(e.target.value)}
      className={`w-full h-[46px] sm:h-[52px] px-4 py-[9px] border ${otpError ? 'border-red-500' : 'border-[#1E3A5F]'} rounded-[8px] bg-transparent text-[#1E3A5F] placeholder-[#294E73] font-lora text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px] tracking-[-0.01em] focus:outline-none`}
    />
    {otpError && <p className="text-red-500 text-xs">{otpError}</p>}
    <button
      type="button"
      onClick={handleSendOtp}
      className="self-end mt-1 text-sm font-inter text-[#1E3A5F] underline"
    >
      Resend OTP
    </button>
  </div>
)}

      
{loadingSendOtp && (
  <div className="flex justify-center py-2">
  <div
    className="h-6 w-6 border-4 border-[#1E3A5F] border-t-transparent rounded-full animate-spin"
  ></div>
</div>

)}

<button
  type="submit"
  className="h-[46px] sm:h-[52px] bg-[#1E3A5F] text-white rounded-[6px] flex items-center justify-center"
>
  {loadingVerifyOtp
    ? <div className="loader h-5 w-5 border-4 border-t-transparent rounded-full animate-spin"></div>
    : otpSent
      ? 'Verify OTP'
      : 'Sign up'
  }
</button>


         
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-[#1E3A5F]"></div>
            <span className="text-[#1E3A5F] text-[14px] font-medium">OR</span>
            <div className="flex-1 h-px bg-[#1E3A5F]"></div>
          </div>

   <button
  type="button"
  onClick={() => signIn('google')}
  className="h-[46px] sm:h-[52px] border-[2px] border-[#1E3A5F] rounded-[6px] flex items-center justify-center gap-[6px] text-[#1E3A5F] font-montserrat font-semibold text-[16px] leading-[26px] hover:bg-[rgba(214,228,240,0.2)] transition"
>
  <Image src="/icons/google.svg" alt="Google" width={24} height={24} />
  Continue with Google
</button>

       
          <div className="text-center mt-4">
            <p className="text-[#162B44] text-[16px] sm:text-[18px] font-inter">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-[#1E3A5F] hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
