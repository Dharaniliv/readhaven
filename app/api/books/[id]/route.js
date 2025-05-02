import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db/mongo";
import Book from "@/app/lib/models/Book";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await connectToDatabase();
  const { id } = await params;
  const { title, author, imageUrl, price, originalPrice, category, description } = await req.json();

  const updated = await Book.findOneAndUpdate(
    { googleId: id },
    { title, author, image: imageUrl, price, originalPrice, category, description },
    { new: true }
  );
  if (!updated) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Book updated", book: updated }, { status: 200 });
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await connectToDatabase();
  const { id } = await params;
  const deleted = await Book.findOneAndDelete({ googleId: id });
  if (!deleted) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Book deleted" }, { status: 200 });
}
