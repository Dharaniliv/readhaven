'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistClient({ userEmail }) {
  const [books, setBooks] = useState(null);
  const storageKey = `wishlist_${userEmail}`;

  useEffect(() => {
 
    const raw = localStorage.getItem(storageKey);
    let stored = [];
    try {
      stored = JSON.parse(raw) || [];
    } catch {
      stored = [];
    }
  
 
    if (stored.length === 0 || typeof stored[0] === 'object') {
      setBooks(stored);
      return;
    }
  
    (async () => {
      try {
        const res = await fetch('/api/books/by-ids', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: stored }),
        });
        const data = await res.json();
        setBooks(data.books || []);
      } catch {
        setBooks([]);
      }
    })();
  }, [storageKey]);


  if (books === null) return null;


  if (books.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8E9D2] py-10 text-center">
        <h1 className="text-[#7A4E2D] font-playfair font-bold text-4xl">
          My Wishlist
        </h1>
        <p className="mt-8 text-lg text-[#7A4E2D]">No books saved yet!</p>
        <Link
          href="/categories/all-books"
          className="mt-6 inline-block px-6 py-3 bg-[#1E3A5F] text-white rounded"
        >
          Start exploring
        </Link>
      </div>
    );
  }


  const handleRemove = (googleId) => {
 
    setBooks((prev) => prev.filter((b) => b.googleId !== googleId));
 
    const raw = localStorage.getItem(storageKey);
    let stored = [];
    try {
      stored = JSON.parse(raw) || [];
    } catch {
      stored = [];
    }
    const updatedIds = stored
      .map((b) => (typeof b === 'object' ? b.googleId : b))
      .filter((id) => id !== googleId);
    localStorage.setItem(storageKey, JSON.stringify(updatedIds));
  };

  return (
    <div className="min-h-screen bg-[#F8E9D2] py-10 px-4">
      <h1 className="text-center text-[#7A4E2D] font-playfair font-bold text-4xl">
        My Wishlist
      </h1>

      <div className="mt-10 space-y-8 max-w-4xl mx-auto">
        {books.map((book) => (
          <div
            key={book.googleId}
            className="flex flex-col md:flex-row bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="w-full md:w-48 h-64 relative">
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h2 className="font-playfair font-bold text-2xl text-[#1E3A5F]">
                  {book.title}
                </h2>
                <p className="text-[#555] mt-1">by {book.author}</p>
                <p className="text-[#333] mt-2 font-semibold">{book.price}.00</p>
                {book.originalPrice && (
                  <p className="text-[#888] line-through">
                    {book.originalPrice}.00
                  </p>
                )}
              </div>
              <div className="mt-4 flex gap-4">
                <Link
                  href={`/book/${book.googleId}`}
                  className="px-4 py-2 bg-[#1E3A5F] text-white rounded"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleRemove(book.googleId)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
