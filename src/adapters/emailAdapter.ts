import nodemailer from "nodemailer";
import { SETTINGS } from "../settings";

export const emailAdapter = {
  async sendEmail(email: string, link: string) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SETTINGS.REGISTRATION_EMAIL,
        pass: SETTINGS.REGISTRATION_PASS,
      },
    });

    const emailInfo = transporter.sendMail({
      from: `"Notes Manager" <${SETTINGS.REGISTRATION_EMAIL}>`,
      to: email,
      subject: "Action Required - Confirm your email address",
      html: `
        <h1>Thank you for your registration with Notes Manager</h1>
        <p>To finish your registration with Notes Manager use this link:
        <a href="${link}">${link}</a></p>
      `,
    });
    return !!emailInfo
  },
};
