import nodemailer from "nodemailer";
import { SETTINGS } from "../settings";
import {
  IEmailService,
  SendEmailType,
  UnsubscribeType,
} from "../interfaces/IEmailService";

export class EmailService implements IEmailService {
  async sendEmail(params: SendEmailType): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SETTINGS.REGISTRATION_EMAIL,
        pass: SETTINGS.REGISTRATION_PASS,
      },
    });

    const emailInfo = transporter.sendMail({
      from: `"Notes Manager" <${SETTINGS.REGISTRATION_EMAIL}>`,
      to: params.email,
      subject: "Action Required - Confirm your email address",
      html: `
        <h1>Thank you for your registration with Notes Manager</h1>
        <p>To finish your registration with Notes Manager use this link:
        <a href="${params.confirmationLink}">${params.confirmationLink}</a></p>
      `,
    });
    return !!emailInfo;
  }

  //just as example
  async unsubscribe(params: UnsubscribeType): Promise<boolean> {
    return true;
  }
}
