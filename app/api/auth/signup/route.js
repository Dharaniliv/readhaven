import bcrypt from 'bcryptjs';
import connectToDatabase from '@/app/lib/db/mongo'; 
import User from '@/app/lib/models/User';

export async function POST(req) {
    const { fullName, email, password } = await req.json();

   
    if (!email || !password || !fullName) {
        return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400 });
    }

  
    if (password.length < 6) {
        return new Response(JSON.stringify({ error: 'Password must be at least 6 characters long' }), { status: 400 });
    }

    await connectToDatabase(); 

 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
    }

    
    const hashedPassword = await bcrypt.hash(password, 12);

    
    const newUser = new User({
        name: fullName, 
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error('Error creating user:', error);
          }
  
        return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
    }
}
