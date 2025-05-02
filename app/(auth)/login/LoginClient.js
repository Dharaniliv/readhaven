'use client';

import { useState ,useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signIn, getSession } from 'next-auth/react';
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginClient() {
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

 const [justLoggedIn, setJustLoggedIn] = useState(false);

const onSubmit = async (data) => {
  setFormError('');
  setLoading(true);

  const res = await signIn('credentials', {
    redirect: false,
    email: data.email,
    password: data.password,
  });

  if (res?.error) {
    setFormError(res.error);
    setLoading(false);
    return;
  }

  setJustLoggedIn(true); 

  setTimeout(async () => {
    const session = await getSession();
    const name = session?.user?.name || 'there';

    setWelcomeMessage(`Welcome back, ${name}!`);
    setLoading(false);

    setTimeout(() => {
      router.push(redirectPath);
    }, 2000);
  }, 2000);
};

const handleGoogleLogin = () => {
  signIn('google', { callbackUrl: redirectPath });
};

useEffect(() => {
  if (session && !justLoggedIn) {
   
    router.replace(redirectPath);
  }
}, [session, router, justLoggedIn,redirectPath]);


if (session && !justLoggedIn) return null;


  return (
    <div className="bg-[#7A4E2D] min-h-screen flex justify-center pt-[60px] pb-[200px] px-4 sm:px-6">
      <div className="w-full max-w-[533px] bg-[#F5E8D9] rounded-[15px] px-6 py-8 sm:px-10 flex flex-col">
        <h1 className="text-[32px] sm:text-[40px] font-playfair font-bold text-[#4B2E1E] text-center">
          Login
        </h1>
        <p className="mt-4 text-center text-[#654321] font-inter text-[14px] sm:text-[16px]">
          Enter your credentials to continue
        </p>

        {formError && (
          <div className="mt-4 text-red-500 text-center text-sm">{formError}</div>
        )}

        {loading && (
          <div className="flex justify-center my-4">
            <div className="animate-spin border-t-2 border-[#7A4E2D] rounded-full w-8 h-8"></div>
          </div>
        )}

        {welcomeMessage && !loading && (
          <div className="mt-4 text-center text-green-600 text-lg">
            {welcomeMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col gap-5"
          noValidate
        >
         
          <div className="flex flex-col gap-1">
            <label className="font-inter text-[#5A3E36] text-[13px]">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="w-full h-[46px] px-4 pr-12 border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#7A4E2D] placeholder-[#9C7A56] font-lora focus:outline-none focus:border-[#7A4E2D]"
              />
              <Image
                src={isEmailFocused ? '/icons/Emailcontacthover.svg' : '/icons/Emailcontact.svg'}
                alt="Email Icon"
                width={24}
                height={24}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

      
          <div className="flex flex-col gap-1">
            <label className="font-inter text-[#5A3E36] text-[13px]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full h-[46px] px-4 pr-12 border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#7A4E2D] placeholder-[#9C7A56] focus:outline-none focus:border-[#7A4E2D] font-lora"
              />
              <Image
                src={showPassword ? '/icons/visibilityon.svg' : '/icons/visibilityoff.svg'}
                alt="Toggle Visibility"
                width={20}
                height={20}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <Link
              href="/forgot-password"
              className="mt-1 text-right text-[#7A4E2D] font-inter text-[14px] hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

       
          <button
            type="submit"
            disabled={loading}
            className="h-[46px] bg-[#7A4E2D] text-white font-semibold text-[16px] rounded-[6px] hover:bg-[#6B3F1D] transition"
          >
            Log in
          </button>

        
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-[#7A4E2D]" />
            <span className="text-[#8B5E3C] font-inter text-[14px]">OR</span>
            <div className="flex-1 h-px bg-[#7A4E2D]" />
          </div>

      
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="h-[46px] border-2 border-[#7A4E2D] rounded-[6px] flex items-center justify-center gap-2 text-[#7A4E2D] font-semibold hover:bg-[#F5E1C8] transition"
          >
            <Image src="/icons/google.svg" alt="Google" width={24} height={24} />
            Continue with Google
          </button>

          <Link
            href="/signup"
            className="mt-2 text-center font-semibold text-[#7A4E2D] hover:underline"
          >
            New to ReadHaven? Sign up
          </Link>
        </form>
      </div>
    </div>
  );
}
