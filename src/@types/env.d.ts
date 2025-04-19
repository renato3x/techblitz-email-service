declare namespace NodeJS {
  interface ProcessEnv {
    BROKER_URL: string;
    QUEUE_NAME: string;

    FROM_EMAIL_ADDRESS: string;

    NODEMAILER_HOST: string;
    NODEMAILER_PORT: string;
    NODEMAILER_USER: string;
    NODEMAILER_PASS: string;

    EMAIL_SENDER_PROVIDER: EmailSender.EmailSenderProviderOptions;
    EMAIL_COMPOSER_PROVIDER: EmailComposer.EmailComposerProviderOptions;

    CLIENT_URL: string;

    APP_LOGGER_PROVIDER: AppLogger.AppLoggerProviderOptions;
    NODE_ENV: 'development' | 'production';
  }
}
