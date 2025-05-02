

import { NextResponse } from 'next/server';
import Book from '@/app/lib/models/Book';
import connectToDatabase from '@/app/lib/db/mongo';

export async function POST(req) {
  try {
    await connectToDatabase();
    const {
      googleId,
      title,
      author,
      imageUrl,
      price,
      originalPrice,
      category,
      description
    } = await req.json();

    if (!googleId || !title || !author || !imageUrl || !price || !originalPrice || !category || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (await Book.findOne({ googleId })) {
      return NextResponse.json({ error: 'Duplicate Google ID' }, { status: 409 });
    }

    const newBook = await Book.create({
      googleId,
      title,
      author,
      image: imageUrl,
      price,
      originalPrice,
      category,
      description,
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error('saveBook error:', err);
    }

    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
