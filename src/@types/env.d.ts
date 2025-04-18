declare namespace NodeJS {
  interface ProcessEnv {
    EMAIL_SERVICE_BROKER_URL: string;
    EMAIL_SERVICE_QUEUE_NAME: string;

    EMAIL_SERVICE_FROM_ADDRESS: string;

    EMAIL_SERVICE_NODEMAILER_HOST: string;
    EMAIL_SERVICE_NODEMAILER_PORT: string;
    EMAIL_SERVICE_NODEMAILER_USER: string;
    EMAIL_SERVICE_NODEMAILER_PASS: string;

    EMAIL_SERVICE_SENDER_PROVIDER: EmailSender.EmailSenderProviderOptions;
    EMAIL_SERVICE_COMPOSER_PROVIDER: EmailComposer.EmailComposerProviderOptions;
  }
}
