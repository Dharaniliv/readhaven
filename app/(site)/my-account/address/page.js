'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";

export default function AddAddressPage() {
  const { data: session,status } = useSession()
  const userEmail = session?.user?.email
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    pincode: '',
    state: '',
    city: '',
    address: '',
  })

  const [errors, setErrors] = useState({})
  const [savedAddress, setSavedAddress] = useState(null)
  const [isEditing, setIsEditing] = useState(true)
  const [isLoading, setIsLoading] = useState(true) 

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login");
    }
  }, [session, status, router]);
  
  
  useEffect(() => {
    if (userEmail) {
      const saved = localStorage.getItem(`userAddress-${userEmail}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        setSavedAddress(parsed)
        setFormData(parsed)
        setIsEditing(false)
      }
      setIsLoading(false)
    }
  }, [userEmail])

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = 'This field is required'
      }
    })

    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit number'
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit pincode'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userEmail) return

    if (validateForm()) {
      setErrors({})
      setIsLoading(true)
      setTimeout(() => {
        localStorage.setItem(`userAddress-${userEmail}`, JSON.stringify(formData))
        setSavedAddress(formData)
        setIsEditing(false)
        setIsLoading(false) 
      }, 1000)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  return (
    <div className="min-h-screen bg-[#7A4E2D] mt-[70px] py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-[650px] mt-[20px] bg-[#F5E8D9] rounded-[12px] p-10">
        <h1 className="text-center text-[#162B44] font-playfair font-bold text-[32px] leading-[38px] mb-10">
          Your Address
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-8 border-t-2 border-[#7A4E2D] border-solid rounded-full animate-spin"></div>

          </div>
        ) : isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
          
            <div>
              <label className="block text-[#5A3E36] text-[14px] font-medium font-inter mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full h-[52px] px-4 border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#7A4E2D] font-montserrat text-[16px] focus:outline-none"
              />
              {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}
            </div>

        
            <div>
              <label className="block text-[#5A3E36] text-[14px] font-medium font-inter mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your 10-digit mobile number"
                className="w-full h-[52px] px-4 border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#7A4E2D] font-montserrat text-[16px] focus:outline-none"
              />
              {errors.mobile && <p className="text-red-600 text-sm">{errors.mobile}</p>}
            </div>

     
            <div>
              <label className="block text-[#5A3E36] text-[14px] font-medium font-inter mb-1">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="e.g., 600001"
                className="w-full h-[52px] px-4 border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#7A4E2D] font-montserrat text-[16px] focus:outline-none"
              />
              {errors.pincode && <p className="text-red-600 text-sm">{errors.pincode}</p>}
            </div>

      
            <div>
              <label className="block text-[#5A3E36] text-[14px] font-medium font-inter mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state"
                className="w-full h-[52px] px-4 border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#7A4E2D] font-montserrat text-[16px] focus:outline-none"
              />
              {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}
            </div>

      
            <div>
              <label className="block text-[#5A3E36] text-[14px] font-medium font-inter mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="w-full h-[52px] px-4 border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#7A4E2D] font-montserrat text-[16px] focus:outline-none"
              />
              {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
            </div>

       
            <div>
              <label className="block text-[#5A3E36] text-[14px] font-medium font-inter mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your full address..."
                rows={3}
                className="w-full px-4 py-3 border border-[#7A4E2D] rounded-[8px] bg-transparent text-[#7A4E2D] font-montserrat text-[16px] focus:outline-none resize-none"
              />
              {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
            </div>

       
            <div className="flex flex-col items-center space-y-4 mt-6">
              <button
                type="submit"
                className="w-full h-[52px] bg-[#7A4E2D] text-white font-montserrat font-semibold text-[16px] rounded-[6px] hover:bg-[#5A3E36] transition"
              >
                Save Address
              </button>
            </div>
          </form>
        ) : (
          <>
          
            {savedAddress && (
              <div className="mt-6 bg-[#EAD8C0] p-6 rounded-lg shadow-md text-[#162B44] font-lora text-[16px] leading-[26px] space-y-1">
                <p><strong>Name:</strong> {savedAddress.fullName}</p>
                <p><strong>Mobile:</strong> {savedAddress.mobile}</p>
                <p><strong>Pincode:</strong> {savedAddress.pincode}</p>
                <p><strong>State:</strong> {savedAddress.state}</p>
                <p><strong>City:</strong> {savedAddress.city}</p>
                <p><strong>Address:</strong> {savedAddress.address}</p>
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleEdit}
                className="px-6 py-2 bg-[#1E3A5F] hover:bg-[#002244] text-white font-montserrat text-[16px] rounded-[6px]"
              >
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
