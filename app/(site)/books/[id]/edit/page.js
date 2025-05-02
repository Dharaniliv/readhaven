import { notFound, redirect } from "next/navigation";
import { getBookByIdFromDB } from "@/app/lib/db/findbooks";
import EditBookForm from "@/app/(site)/components/EditBookForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function EditBookPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");


  if (!session.user?.isAdmin) notFound();

  const { id } = params;
  const bookDoc = await getBookByIdFromDB(id);
  if (!bookDoc) notFound();

  const book = JSON.parse(JSON.stringify(bookDoc));
  return <EditBookForm book={book} />;
}
