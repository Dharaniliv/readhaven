import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const amount = 10 * 100; 
    const options = {
      amount,
      currency: "INR",
      receipt: `order_rcptid_${Math.random().toString(36).slice(-7)}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);


    return new Response(JSON.stringify({ orderId: order.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("🛑 Razorpay order creation failed:", err);
    }

    return new Response(
      JSON.stringify({ error: err.message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
