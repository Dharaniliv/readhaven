
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

 
  useEffect(() => {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        if (process.env.NODE_ENV === "development") {
          console.error('Failed to parse cartItems from localStorage', e);
        }
  
      }
    }
  }, []);

  useEffect(() => {
    if (cartItems.length) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cartItems');
    }
  }, [cartItems]);

  const addToCart = (item) => {
    if (!item || !item.id || !item.title || !item.price) {
      return;
    }

    setCartItems((prev) => {
      const idx = prev.findIndex((ci) => ci.id === item.id);
      const addQty = item.quantity ?? 1;

      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + addQty,
        };
        return updated;
      }

    
      return [...prev, { ...item, quantity: addQty }];
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === bookId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
