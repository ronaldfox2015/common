import { LogParams } from './../../domain/log-data.interface';
import { LoggerServiceInterface } from './../../domain/model/logger-service';
export declare class LoggerService implements LoggerServiceInterface {
    log(message: any, ...optionalParams: LogParams[]): void;
    warning(message: any, ...optionalParams: LogParams[]): void;
    critical(message: any, ...optionalParams: LogParams[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    debug?(message: any, ...optionalParams: any[]): void;
    verbose?(message: any, ...optionalParams: any[]): void;
    private buildLogData;
    private buildContext;
    private buildHeaders;
    private buildRequest;
    private calculateResponseTime;
}
