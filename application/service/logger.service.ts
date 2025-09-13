import { CRITICAL, INFO, WARNING } from '@common/domain/enum/logger.const.util'
import { LoggerServiceInterface } from '@common/domain/model/logger-service'
import { LogData, Context, Headers, Request as RequestType, LogParams } from '@common/domain/log-data.interface'

export class LoggerService implements LoggerServiceInterface {
  log(message: any, ...optionalParams: LogParams[]): void {
    optionalParams.forEach((params) => {
        const logData = this.buildLogData(params, message, INFO, 200, [])
        console.log(JSON.stringify(logData))
    })
  }

  warning(message: any, ...optionalParams: any[]): void {
    optionalParams.forEach((params) => {
      const status = params.status || 400
      const logData = this.buildLogData(params, message, WARNING, status, params.trace || null)
      console.warn(JSON.stringify(logData))
    })
  }

  critical(message: any, ...optionalParams: any[]): void {
    optionalParams.forEach((params) => {
      const status = params.status || 500
      const logData = this.buildLogData(params, message, CRITICAL, status, params.trace || null)
      console.error(JSON.stringify(logData))
    })
  }

  warn(message: any, ...optionalParams: any[]): void {
    console.warn(JSON.stringify({ level: 'warn', message, data: optionalParams }))
  }

  debug?(message: any, ...optionalParams: any[]): void {
    console.debug(JSON.stringify({ level: 'debug', message, data: optionalParams }))
  }

  verbose?(message: any, ...optionalParams: any[]): void {
    console.info(JSON.stringify({ level: 'verbose', message, data: optionalParams }))
  }

  private buildLogData(
    params: any,
    message: any,
    type: string,
    status: number,
    trace: any,
  ): LogData {
    return {
      ip: params.clientIp || 'unknown',
      type,
      httpCode: status,
      message: params.message || message,
      context: this.buildContext(params),
      trace,
      responseTime: this.calculateResponseTime(params.startTime),
    }
  }

  private buildContext(params: any): Context {
    return {
      url: params.originalUrl || 'unknown',
      method: params.method || 'UNKNOWN',
      data: {
        headers: this.buildHeaders(params.headers),
        request: this.buildRequest(params.request),
      },
    }
  }

  private buildHeaders(headers: any): Headers {
    return {
      'x-forwarded-for': headers?.['x-forwarded-for'] || 'unknown',
      'user-agent': headers?.['user-agent'] || 'unknown',
      srv: headers?.['srv'] ?? null,
    }
  }

  private buildRequest(request: any): RequestType {
    return {
      params: request?.params || {},
      query: request?.query || null,
      body: request?.body || null,
    }
  }

  private calculateResponseTime(startTime?: number): string {
    if (!startTime) return '0 ms'
    const duration = Date.now() - startTime
    return `${duration} ms`
  }
}
