import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    // In production, this can forward to Resend, SendGrid, or Telegram webhook
    console.log("Contact submission received:", { name, email, message });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been received.",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to send message: " + errorMessage },
      { status: 500 }
    );
  }
}
