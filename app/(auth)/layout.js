"use client";
import { SessionProvider } from "next-auth/react";


export default function LoginLayout({ children }) {
  return (
    <div className="min-h-screen ">
        <SessionProvider>
      {children}
      </SessionProvider>
    </div>
  );
}