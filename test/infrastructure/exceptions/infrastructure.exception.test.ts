import { InfrastructureException } from '../../../src/infrastructure/exceptions/infrastructure.exception';

describe('InfrastructureException', () => {
  it('should create an exception with default code', () => {
    const message = 'Infrastructure error';
    const exception = new InfrastructureException(message);

    expect(exception.message).toBe('[InfrastructureException] Infrastructure error');
    expect(exception.name).toBe('InfrastructureException');
    expect(exception.code).toBe(3000);
    expect(exception).toBeInstanceOf(Error);
  });

  it('should create an exception with custom code', () => {
    const message = 'Custom infrastructure error';
    const code = 3001;
    const exception = new InfrastructureException(message, code);

    expect(exception.message).toBe('[InfrastructureException] Custom infrastructure error');
    expect(exception.name).toBe('InfrastructureException');
    expect(exception.code).toBe(3001);
  });

  it('should be throwable', () => {
    expect(() => {
      throw new InfrastructureException('Throwable infrastructure error');
    }).toThrow(InfrastructureException);
  });

  it('should maintain error stack trace', () => {
    const exception = new InfrastructureException('Stack trace test');
    expect(exception.stack).toBeDefined();
  });

  it('should be usable in try-catch blocks', () => {
    let caughtException: any;

    try {
      throw new InfrastructureException('Test error', 500);
    } catch (error) {
      caughtException = error;
    }

    expect(caughtException).toBeInstanceOf(InfrastructureException);
    expect(caughtException.code).toBe(500);
    expect(caughtException.message).toContain('Test error');
  });

  it('should be instance of Error', () => {
    const exception = new InfrastructureException('Instance test');
    expect(exception).toBeInstanceOf(Error);
    expect(exception).toBeInstanceOf(InfrastructureException);
  });
});
