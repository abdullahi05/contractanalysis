import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export const resend = new Resend(RESEND_API_KEY);

export const sendPremiumConfirmationEmail = async (
  userEmail: string,
  userName: string
) => {
  try {
    await resend.emails.send({
      from: "Analyze Contract <onboarding@resend.dev>",
      to: userEmail,
      subject: "Welcome to Premium",
      html: `<p>Hi ${userName},</p><p>Welcome to The New Contract Analyzer Premium. You're now a Premium user!</p>`,
    });
  } catch (error) {
    console.error(error);
  }
};