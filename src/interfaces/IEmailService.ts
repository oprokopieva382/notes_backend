interface EmailParams {
  email: string;
  confirmationLink: string;
  unsubscribeLink: string;
}

export type SendEmailType = Omit<EmailParams, "unsubscribeLink">;
export type UnsubscribeType = Omit<EmailParams, "confirmationLink">;
export interface IEmailService {
  sendEmail(params: SendEmailType): Promise<boolean>;

  //just as example
  unsubscribe(params: UnsubscribeType): Promise<boolean>;
}
