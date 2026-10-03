import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "../../../lib/mongodb";
import { sendResetEmail } from "../../../lib/email";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ortho_clinic");
    const users = db.collection("users");
    const resets = db.collection("password_resets");

    const user = await users.findOne({ email: email.toLowerCase() });

    if (user) {
      // Purane unused tokens hata do
      await resets.deleteMany({ userId: user._id });

      const token = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

      await resets.insertOne({
        userId: user._id,
        tokenHash,
        expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
        createdAt: new Date(),
      });

      // Expired tokens database se khud delete ho jayen
      await resets.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

      const baseUrl = process.env.APP_URL || req.nextUrl.origin;
      const resetLink = `${baseUrl}/reset-password?token=${token}`;

      await sendResetEmail(user.email, resetLink);
    }

    // Hamesha same jawab: bahar se pata na chale ke email registered hai ya nahi
    return NextResponse.json(
      {
        message:
          "If an account exists with this email, a reset link has been sent.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}