import { Logger, LogMessage } from '../application/service/logger.service'
import { LogOptionalParams } from '../domain/model/log-optional-params.interface'

describe('Logger', () => {
    let logger: Logger;

    beforeEach(() => {
        logger = new Logger();
        jest.spyOn(console, 'log').mockImplementation(() => {});  // Mock console.log
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should log an info message correctly', () => {
        const message: LogMessage = 'Test info message';
        const params: LogOptionalParams = {
            method: 'GET',
            parameterType: 'param',
            originalUrl: 'http://example.com',
            body: { key: 'value' },
            headers: {
                'x-forwarded-for': '127.0.0.1',
                'user-agent': 'Mozilla/5.0',
                srv: 'test-service',
            },
            responseTime: 123,
        };

        logger.log(message, params);

        expect(console.log).toHaveBeenCalled();
        const logOutput = JSON.parse((console.log as jest.Mock).mock.calls[0][0]);
        expect(logOutput.type).toBe('INFO');
        expect(logOutput.resultMessage).toBe(message);
        expect(logOutput.context.url).toBe(decodeURIComponent(params.originalUrl));
    });

    it('should log an error message correctly', () => {
        const message: LogMessage = new Error('Test error message');
        const params: LogOptionalParams = {
            method: 'POST',
            parameterType: 'param',
            originalUrl: 'http://example.com',
            body: { key: 'value' },
            headers: {
                'x-forwarded-for': '127.0.0.1',
                'user-agent': 'Mozilla/5.0',
                srv: 'test-service',
            },
            responseTime: 123,
            code: 500,
            message: 'Internal Server Error',
            trace: 'stack trace',
        };

        logger.error(message, params);

        expect(console.log).toHaveBeenCalled();
        const logOutput = JSON.parse((console.log as jest.Mock).mock.calls[0][0]);
        expect(logOutput.type).toBe('CRITICAL');
        expect(logOutput.resultMessage).toBe(params.message);
        expect(logOutput.context.url).toBe(params.originalUrl);
    });

    it('should log a warning message', () => {
        const message: LogMessage = 'Test warning message';
        const params: LogOptionalParams = {
            code: 404,
            method: 'GET',
        };

        logger.warn(message, params);

        expect(console.log).toHaveBeenCalledWith('-----------warn----------------');
        expect(console.log).toHaveBeenCalledWith([params]);
        expect(console.log).toHaveBeenCalledWith('---------------------------');
    });

    it('should log a debug message', () => {
        const message: LogMessage = 'Test debug message';
        const params: LogOptionalParams = {};

        logger.debug(message, params);

        expect(console.log).toHaveBeenCalledWith('----------debug-----------------');
        expect(console.log).toHaveBeenCalledWith(message);
        expect(console.log).toHaveBeenCalledWith([params]);
        expect(console.log).toHaveBeenCalledWith('---------------------------');
    });

    it('should log a verbose message', () => {
        const message: LogMessage = 'Test verbose message';
        const params: LogOptionalParams = {};

        logger.verbose(message, params);

        expect(console.log).toHaveBeenCalledWith('----------verbose-----------------');
        expect(console.log).toHaveBeenCalledWith(message);
        expect(console.log).toHaveBeenCalledWith([params]);
        expect(console.log).toHaveBeenCalledWith('---------------------------');
    });
});
