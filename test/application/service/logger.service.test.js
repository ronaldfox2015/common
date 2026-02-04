"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = require("../../../src/application/service/logger.service");
describe('LoggerService', () => {
    let loggerService;
    let consoleSpy;
    let consoleWarnSpy;
    let consoleErrorSpy;
    let consoleDebugSpy;
    let consoleInfoSpy;
    beforeEach(() => {
        loggerService = new logger_service_1.LoggerService();
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
        consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('log', () => {
        it('should log info message with default parameters', () => {
            const message = 'Test message';
            const params = { method: 'GET', originalUrl: '/test' };
            loggerService.log(message, params);
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('"type":"INFO"'));
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('"httpCode":200'));
        });
    });
    describe('warning', () => {
        it('should log warning message with custom status', () => {
            const message = 'Warning message';
            const params = { status: 404, trace: ['error trace'] };
            loggerService.warning(message, params);
            expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('"type":"WARNING"'));
            expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('"httpCode":404'));
        });
        it('should use default status 400 when not provided', () => {
            const message = 'Warning message';
            const params = {};
            loggerService.warning(message, params);
            expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('"httpCode":400'));
        });
    });
    describe('critical', () => {
        it('should log critical message with custom status', () => {
            const message = 'Critical error';
            const params = { status: 500, trace: ['critical trace'] };
            loggerService.critical(message, params);
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('"type":"CRITICAL"'));
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('"httpCode":500'));
        });
    });
    describe('warn', () => {
        it('should log warn message', () => {
            const message = 'Warn message';
            const optionalParams = ['param1', 'param2'];
            loggerService.warn(message, ...optionalParams);
            expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('"level":"warn"'));
        });
    });
    describe('debug', () => {
        it('should log debug message', () => {
            const message = 'Debug message';
            const optionalParams = ['debug param'];
            loggerService.debug(message, ...optionalParams);
            expect(consoleDebugSpy).toHaveBeenCalledWith(expect.stringContaining('"level":"debug"'));
        });
    });
    describe('verbose', () => {
        it('should log verbose message', () => {
            const message = 'Verbose message';
            const optionalParams = ['verbose param'];
            loggerService.verbose(message, ...optionalParams);
            expect(consoleInfoSpy).toHaveBeenCalledWith(expect.stringContaining('"level":"verbose"'));
        });
    });
    describe('private methods', () => {
        it('should calculate response time correctly', () => {
            const startTime = Date.now() - 100;
            const params = { startTime };
            loggerService.log('test', params);
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('"responseTime":"'));
        });
        it('should handle missing startTime', () => {
            const params = {};
            loggerService.log('test', params);
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('"responseTime":"0 ms"'));
        });
    });
});
