declare namespace EmailSender {
  type EmailSenderProviders = 'nodemailer';
  type SendEmailOptions = {
    from: string;
    to: string;
    subject: string;
    content: string;
  };
}
