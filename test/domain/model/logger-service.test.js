"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('LoggerServiceInterface', () => {
    class TestLoggerService {
        log(message, ...optionalParams) {
            console.log(message, ...optionalParams);
        }
        warning(message, ...optionalParams) {
            console.warn(message, ...optionalParams);
        }
        critical(message, ...optionalParams) {
            console.error(message, ...optionalParams);
        }
        warn(message, ...optionalParams) {
            console.warn(message, ...optionalParams);
        }
        debug(message, ...optionalParams) {
            console.debug(message, ...optionalParams);
        }
        verbose(message, ...optionalParams) {
            console.info(message, ...optionalParams);
        }
    }
    let loggerService;
    let consoleSpy;
    let consoleWarnSpy;
    let consoleErrorSpy;
    let consoleDebugSpy;
    let consoleInfoSpy;
    beforeEach(() => {
        loggerService = new TestLoggerService();
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
        consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should implement all required methods', () => {
        expect(typeof loggerService.log).toBe('function');
        expect(typeof loggerService.warning).toBe('function');
        expect(typeof loggerService.critical).toBe('function');
        expect(typeof loggerService.warn).toBe('function');
    });
    it('should implement optional methods', () => {
        expect(typeof loggerService.debug).toBe('function');
        expect(typeof loggerService.verbose).toBe('function');
    });
    it('should call log method', () => {
        loggerService.log('test message', 'param1');
        expect(consoleSpy).toHaveBeenCalledWith('test message', 'param1');
    });
    it('should call warning method', () => {
        loggerService.warning('warning message', 'param1');
        expect(consoleWarnSpy).toHaveBeenCalledWith('warning message', 'param1');
    });
    it('should call critical method', () => {
        loggerService.critical('critical message', 'param1');
        expect(consoleErrorSpy).toHaveBeenCalledWith('critical message', 'param1');
    });
    it('should call warn method', () => {
        loggerService.warn('warn message', 'param1');
        expect(consoleWarnSpy).toHaveBeenCalledWith('warn message', 'param1');
    });
    it('should call debug method', () => {
        loggerService.debug('debug message', 'param1');
        expect(consoleDebugSpy).toHaveBeenCalledWith('debug message', 'param1');
    });
    it('should call verbose method', () => {
        loggerService.verbose('verbose message', 'param1');
        expect(consoleInfoSpy).toHaveBeenCalledWith('verbose message', 'param1');
    });
});
