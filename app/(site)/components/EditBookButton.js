"use client";
import Link from "next/link";

export default function EditBookButton({ bookId }) {
  return (
    <Link href={`/books/${bookId}/edit`}>
      <button className="px-4 py-2 bg-[#1E3A5F] hover:bg-[#002244] text-white rounded-md">
        Edit
      </button>
    </Link>
  );
}