
import { checkUserExists } from "@/app/lib/auth";
import User from "@/app/lib/models/User";

export async function POST(req) {
  const { email } = await req.json();

  
  const user = await User.findOne({ email });

  if (user) {
  
    const isGoogleUser = !user.password; 

    return new Response(
      JSON.stringify({
        exists: true,
        googleUser: isGoogleUser,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    return new Response(
      JSON.stringify({ exists: false }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
