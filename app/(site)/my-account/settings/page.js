'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AccountPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

 
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [status, session]);


  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8E9D2]">
        <p className="text-[#7A4E2D] font-playfair text-[18px]">Loading...</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
  
   
      const data = await res.json();
  
      if (!res.ok) {
        
        throw new Error(data.error || 'Unknown error');
      }
  
    
      await update(); 
      alert(data.message || 'Profile updated successfully!');
    } catch (err) {
     
      alert(err.message);
    }
  };
  

  return (
    <div className="min-h-screen bg-[#F8E9D2] py-10">
      <h1 className="text-center text-[#7A4E2D] font-playfair font-bold text-[40px] leading-[48px]">
        Profile & Settings
      </h1>

      <div className="w-full h-[600px] bg-[#7A4E2D] mt-[57px] flex justify-center items-center px-4">
        <div className="w-full max-w-[800px] h-[450px] bg-[#F5E8D9] rounded-[15px] p-10 flex flex-col items-center">
          <h2 className="text-[#162B44] font-playfair font-semibold text-[32px] leading-[38px] text-center">
            Profile Information
          </h2>

          <form onSubmit={handleSubmit} className="w-full max-w-[500px] mt-[62px] space-y-6">
        
            <div>
              <label className="text-[#5A3E36] text-[14px] font-medium font-inter">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[52px] px-4 border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#7A4E2D] font-montserrat text-[16px] focus:outline-none"
              />
            </div>

      
            <div>
              <label className="text-[#5A3E36] text-[14px] font-medium font-inter">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full h-[52px] px-4 border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#8B7765] font-montserrat text-[16px] cursor-not-allowed focus:outline-none focus:border-[#7A4E2D]"
              />
            </div>

            <button
              type="submit"
              className="mt-[44px] w-full h-[50px] bg-[#8B5E3C] hover:bg-[#7A4E2D] text-white rounded-[8px] font-montserrat font-semibold text-[16px] transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
