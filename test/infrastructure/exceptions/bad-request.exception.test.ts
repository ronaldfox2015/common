import { BadRequestInfrastructureException } from '../../../src/infrastructure/exceptions/bad-request.exception';
import { BaseException } from '../../../src/infrastructure/exceptions/base.exception';

describe('BadRequestInfrastructureException', () => {
  it('should create an exception with default code from BaseException', () => {
    const message = 'Bad request error';
    const exception = new BadRequestInfrastructureException(message);

    expect(exception.message).toBe('[BaseException] Bad request error');
    expect(exception.name).toBe('BaseException');
    expect(exception.code).toBe(4000);
    expect(exception).toBeInstanceOf(Error);
    expect(exception).toBeInstanceOf(BaseException);
  });

  it('should create an exception with custom code', () => {
    const message = 'Custom bad request error';
    const code = 4001;
    const exception = new BadRequestInfrastructureException(message, code);

    expect(exception.message).toBe('[BaseException] Custom bad request error');
    expect(exception.name).toBe('BaseException');
    expect(exception.code).toBe(4001);
  });

  it('should be throwable', () => {
    expect(() => {
      throw new BadRequestInfrastructureException('Throwable bad request error');
    }).toThrow(BadRequestInfrastructureException);
  });

  it('should inherit from BaseException', () => {
    const exception = new BadRequestInfrastructureException('Inheritance test');
    expect(exception).toBeInstanceOf(BaseException);
    expect(exception).toBeInstanceOf(BadRequestInfrastructureException);
  });

  it('should maintain error stack trace', () => {
    const exception = new BadRequestInfrastructureException('Stack trace test');
    expect(exception.stack).toBeDefined();
  });

  it('should be usable in try-catch blocks', () => {
    let caughtException: any;

    try {
      throw new BadRequestInfrastructureException('Test error', 400);
    } catch (error) {
      caughtException = error;
    }

    expect(caughtException).toBeInstanceOf(BadRequestInfrastructureException);
    expect(caughtException.code).toBe(400);
  });
});
