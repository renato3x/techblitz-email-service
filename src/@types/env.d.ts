declare namespace NodeJS {
  interface ProcessEnv {
    BROKER_URL: string;
    QUEUE_NAME: string;

    NODEMAILER_HOST: string;
    NODEMAILER_PORT: string;
    NODEMAILER_USER: string;
    NODEMAILER_PASS: string;

    EMAIL_SENDER_PROVIDER: EmailSender.EmailSenderProviderOptions;
    EMAIL_COMPOSER_PROVIDER: EmailComposer.EmailComposerProviderOptions;
    APP_LOGGER_PROVIDER: AppLogger.AppLoggerProviderOptions;

    CLIENT_URL: string;
    FROM_EMAIL_ADDRESS: string;
    NODE_ENV: 'development' | 'production';
  }
}
