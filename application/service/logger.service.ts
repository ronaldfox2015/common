import { ContextModel, DataModel, LogModel, Headers } from '../../domain/model/log.model';
import { APP, CRITICAL, INFO, TYPE, WARNING } from '../../domain/enum/logger.enum';
import {LoggerServiceInterface} from "../../domain/repository/logger.service.interface";
import {LogOptionalParams} from "../../domain/model/log-optional-params.interface";

export type LogMessage = string | object | Error;

export class Logger implements LoggerServiceInterface {
  log(message: LogMessage, ...optionalParams: LogOptionalParams[]): void {
    optionalParams.forEach((params) => {
      if (TYPE.find((element) => element === params.method)) {
        const logSchema = new LogModel();
        const dataSchema = new DataModel();
        const contextSchema = new ContextModel();
        const modelHeaders = new Headers();

        contextSchema.messageHTTP = params.parameterType;
        contextSchema.url = decodeURIComponent(String(params.originalUrl));
        contextSchema.method = params.method;
        dataSchema.request = params.body;
        modelHeaders['x-forwarded-for'] = params.headers?.['x-forwarded-for'];
        modelHeaders['user-agent'] = params.headers?.['user-agent'];
        modelHeaders.srv = params.headers?.srv;
        dataSchema.header = modelHeaders;
        contextSchema.data = dataSchema;
        logSchema.type = INFO;
        logSchema.resource = APP.toString();
        logSchema.resultCode = 200;
        logSchema.resultMessage = String(message);
        logSchema.context = contextSchema;
        logSchema.time = `${params.responseTime} ms`;
        console.log(JSON.stringify(logSchema));
      } else {
        console.log(JSON.stringify(message));
      }
    });
  }

  error(message: LogMessage, ...optionalParams: LogOptionalParams[]): void {
    optionalParams.forEach((params) => {
      let type = CRITICAL;
      if (params.code && params.code >= 400 && params.code < 500) {
        type = WARNING;
      }
      const logSchema = new LogModel();
      const contextSchema = new ContextModel();
      const dataSchema = new DataModel();
      const modelHeaders = new Headers();

      contextSchema.messageHTTP = params.parameterType;
      contextSchema.url = params.originalUrl?.toString();
      contextSchema.method = params.method;
      dataSchema.response = params.dataResponse;
      dataSchema.request = params.body;

      modelHeaders['x-forwarded-for'] = params.headers?.['x-forwarded-for'];
      modelHeaders['user-agent'] = params.headers?.['user-agent'];
      modelHeaders.srv = params.headers?.srv;
      dataSchema.header = modelHeaders;

      contextSchema.data = dataSchema;
      logSchema.type = type;
      logSchema.resultCode = params.code;
      logSchema.resultMessage = params.message;
      logSchema.context = contextSchema;
      logSchema.trace = params.trace;
      console.log(JSON.stringify(logSchema));
    });
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: LogMessage, ...optionalParams: LogOptionalParams[]): void {
    console.log('-----------warn----------------');
    console.log(optionalParams);
    console.log('---------------------------');
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: LogMessage, ...optionalParams: LogOptionalParams[]): void {
    console.log('----------debug-----------------');
    console.log(message);
    console.log(optionalParams);
    console.log('---------------------------');
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: LogMessage, ...optionalParams: LogOptionalParams[]): void {
    console.log('----------verbose-----------------');
    console.log(message);
    console.log(optionalParams);
    console.log('---------------------------');
  }
}
