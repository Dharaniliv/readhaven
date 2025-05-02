// app/(site)/my-account/wishlist/page.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import WishlistClient from '../../components/wishlistclient';

export const metadata = {
  title: "Your Wishlist",
  description: "View and manage the books you've added to your wishlist for future purchase.",
};


export default async function WishlistPage() {
 
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

 
  return <WishlistClient userEmail={session.user.email} />;
}
