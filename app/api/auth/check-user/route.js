// app/api/auth/check-user/route.js
import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db/mongo";
import User from "@/app/lib/models/User";

export async function POST(req) {
  try {
    // 1) Ensure we’re connected
    await connectToDatabase();

    // 2) Parse request
    const { email } = await req.json();

    // 3) Lookup user
    const user = await User.findOne({ email });

    // 4) Respond
    if (user) {
      const isGoogleUser = !user.password;
      return NextResponse.json(
        { exists: true, googleUser: isGoogleUser },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ exists: false }, { status: 200 });
    }
  } catch (error) {
    console.error("check-user error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
