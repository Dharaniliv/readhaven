'use client';

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DeleteBookButton({ bookId }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Failed to delete the book");
        return;
      }

      toast.success("Book deleted successfully!");
      router.push("/"); 
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
    >
      Delete Book
    </button>
  );
}
