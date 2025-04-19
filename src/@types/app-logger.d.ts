declare namespace AppLogger {
  type AppLoggerProviderOptions = 'pino';
  type LogMetadata = {
    context: string;
    [key: string]: any;
  };
}
