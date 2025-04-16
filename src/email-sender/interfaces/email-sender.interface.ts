export interface EmailSender {
  send(options: EmailSender.SendEmailOptions): Promise<void>;
}
