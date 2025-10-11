"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const logger_const_util_1 = require("./../../domain/enum/logger.const.util");
class LoggerService {
    log(message, ...optionalParams) {
        optionalParams.forEach((params) => {
            const logData = this.buildLogData(params, message, logger_const_util_1.INFO, 200, []);
            console.log(JSON.stringify(logData));
        });
    }
    warning(message, ...optionalParams) {
        optionalParams.forEach((params) => {
            const status = params.status || 400;
            const logData = this.buildLogData(params, message, logger_const_util_1.WARNING, status, params.trace || null);
            console.warn(JSON.stringify(logData));
        });
    }
    critical(message, ...optionalParams) {
        optionalParams.forEach((params) => {
            const status = params.status || 500;
            const logData = this.buildLogData(params, message, logger_const_util_1.CRITICAL, status, params.trace || null);
            console.error(JSON.stringify(logData));
        });
    }
    warn(message, ...optionalParams) {
        console.warn(JSON.stringify({ level: 'warn', message, data: optionalParams }));
    }
    debug(message, ...optionalParams) {
        console.debug(JSON.stringify({ level: 'debug', message, data: optionalParams }));
    }
    verbose(message, ...optionalParams) {
        console.info(JSON.stringify({ level: 'verbose', message, data: optionalParams }));
    }
    buildLogData(params, message, type, status, trace) {
        return {
            ip: params.clientIp || 'unknown',
            type,
            httpCode: status,
            message: params.message || message,
            context: this.buildContext(params),
            trace,
            responseTime: this.calculateResponseTime(params.startTime),
        };
    }
    buildContext(params) {
        return {
            url: params.originalUrl || 'unknown',
            method: params.method || 'UNKNOWN',
            data: {
                headers: this.buildHeaders(params.headers),
                request: this.buildRequest(params.request),
            },
        };
    }
    buildHeaders(headers) {
        return {
            'x-forwarded-for': headers?.['x-forwarded-for'] || 'unknown',
            'user-agent': headers?.['user-agent'] || 'unknown',
            srv: headers?.srv ?? null,
        };
    }
    buildRequest(request) {
        return {
            params: request?.params || {},
            query: request?.query || {},
            body: request?.body || {},
        };
    }
    calculateResponseTime(startTime) {
        if (!startTime)
            return '0 ms';
        const duration = Date.now() - startTime;
        return `${duration} ms`;
    }
}
exports.LoggerService = LoggerService;
