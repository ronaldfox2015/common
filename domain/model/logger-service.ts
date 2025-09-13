export interface LoggerServiceInterface {
  log(message: any, ...optionalParams: any[]): void
  warning(message: any, ...optionalParams: any[]): void
  critical(message: any, ...optionalParams: any[]): void
  warn(message: any, ...optionalParams: any[]): void
  debug?(message: any, ...optionalParams: any[]): void
  verbose?(message: any, ...optionalParams: any[]): void
}
