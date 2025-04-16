declare namespace NodeJS {
  interface ProcessEnv {
    RMQ_URL: string;
    MESSAGE_BROKER_QUEUE_NAME: string;
    EMAIL_SENDER_PROVIDER: EmailSender.EmailSenderProviders;
  }
}
