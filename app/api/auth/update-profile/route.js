

import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import connectToDatabase   from '@/app/lib/db/mongo';
import User from '@/app/lib/models/User';

export async function POST(req) {
 
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    );
  }

 
  const { name } = await req.json();
  if (!name || !name.trim()) {
    return new Response(
      JSON.stringify({ error: 'Name cannot be empty' }),
      { status: 400 }
    );
  }

  try {
   
    await connectToDatabase();

    
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { name: name.trim() },
      { new: true }
    );

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404 }
      );
    }

  
    return new Response(
      JSON.stringify({
        message: 'Profile updated',
        user: { name: updatedUser.name, email: updatedUser.email }
      }),
      { status: 200 }
    );
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error('🔴 update-profile error:', err);
    }

    return new Response(
      JSON.stringify({ error: 'Failed to update profile' }),
      { status: 500 }
    );
  }
}
