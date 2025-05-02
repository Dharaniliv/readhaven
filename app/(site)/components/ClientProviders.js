'use client';

import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '@/app/(site)/context/CartContext';
import { SearchProvider } from '@/app/(site)/context/SearchContext';

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <CartProvider>
        <SearchProvider>
            {children}
        </SearchProvider>
      </CartProvider>
    </SessionProvider>
  );
}
