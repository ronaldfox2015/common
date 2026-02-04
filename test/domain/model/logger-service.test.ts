import { LoggerServiceInterface } from '../../../src/domain/model/logger-service';

describe('LoggerServiceInterface', () => {
  class TestLoggerService implements LoggerServiceInterface {
    log(message: any, ...optionalParams: any[]): void {
      console.log(message, ...optionalParams);
    }

    warning(message: any, ...optionalParams: any[]): void {
      console.warn(message, ...optionalParams);
    }

    critical(message: any, ...optionalParams: any[]): void {
      console.error(message, ...optionalParams);
    }

    warn(message: any, ...optionalParams: any[]): void {
      console.warn(message, ...optionalParams);
    }

    debug(message: any, ...optionalParams: any[]): void {
      console.debug(message, ...optionalParams);
    }

    verbose(message: any, ...optionalParams: any[]): void {
      console.info(message, ...optionalParams);
    }
  }

  let loggerService: TestLoggerService;
  let consoleSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;
  let consoleInfoSpy: jest.SpyInstance;

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
    loggerService.debug!('debug message', 'param1');
    expect(consoleDebugSpy).toHaveBeenCalledWith('debug message', 'param1');
  });

  it('should call verbose method', () => {
    loggerService.verbose!('verbose message', 'param1');
    expect(consoleInfoSpy).toHaveBeenCalledWith('verbose message', 'param1');
  });
});
