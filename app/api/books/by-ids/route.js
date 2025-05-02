
import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db/mongo';
import Book from '@/app/lib/models/Book';

export async function POST(req) {
  const { ids } = await req.json();
  await connectToDatabase();


  const idList = Array.isArray(ids)
    ? ids.map(item => (typeof item === 'string' ? item : item.googleId))
    : [];


  const books = await Book.find({ googleId: { $in: idList } });

  return NextResponse.json({ books });
}
