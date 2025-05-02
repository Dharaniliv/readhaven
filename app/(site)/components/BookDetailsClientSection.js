
'use client';
import React, { useState } from 'react';
import BookDetailsHelper from './BookDetailsHelper';
import AddToCartButtonWrapper from './AddToCartButtonWrapper';

export default function BookDetailsClientSection({ book, email }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-1 flex flex-col gap-1">
      <BookDetailsHelper
        quantity={quantity}
        setQuantity={setQuantity}
        bookId={book.googleId || book._id}
        userEmail={email}
        bookTitle={book.title}
        book={book} 
      />
      <AddToCartButtonWrapper book={book} quantity={quantity} />
    </div>
  );
}
