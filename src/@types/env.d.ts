declare namespace NodeJS {
  interface ProcessEnv {
    RMQ_URL: string;
    MESSAGE_BROKER_QUEUE_NAME: string;
    EMAIL_SENDER_PROVIDER: EmailSender.EmailSenderProviders;
    NODEMAILER_SMTP_TRANSPORT_OPTIONS: string;
    EMAIL_SENDER_SENDER_EMAIL: string;
  }
}
