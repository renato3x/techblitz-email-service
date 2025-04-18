declare namespace EmailSender {
  type EmailSenderProviderOptions = 'nodemailer';
  type SendEmailOptions = {
    from: string;
    to: string;
    subject: string;
    content: string;
  };
}
