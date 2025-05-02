

import connectToDatabase from '@/app/lib/db/mongo';
import User from '@/app/lib/models/User';

export async function POST(req) {
  const { email } = await req.json();

  try {

    await connectToDatabase();

  
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'User with this email does not exist.' }),
        { status: 404 }
      );
    }


    const userType = user.googleId ? 'google' : 'email';

    return new Response(
      JSON.stringify({
        userExists: true,
        userType: userType,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
