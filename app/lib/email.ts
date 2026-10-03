// Abhi development mode: reset link terminal mein print hota hai.
// Baad mein Resend ya Nodemailer yahan laga denge, baaki code nahi badlega.

export async function sendResetEmail(to: string, resetLink: string) {
  console.log("\n===== PASSWORD RESET LINK =====");
  console.log(`To: ${to}`);
  console.log(`Link: ${resetLink}`);
  console.log("(Valid for 1 hour)");
  console.log("===============================\n");
}