import { BaseException } from '../../../src/infrastructure/exceptions/base.exception';

describe('BaseException', () => {
  // Create a concrete implementation for testing
  class TestBaseException extends BaseException {
    constructor(message: string, code?: number) {
      super(message, code);
    }
  }

  it('should create an exception with default code', () => {
    const message = 'Base error';
    const exception = new TestBaseException(message);

    expect(exception.message).toBe('[BaseException] Base error');
    expect(exception.name).toBe('BaseException');
    expect(exception.code).toBe(4000);
    expect(exception).toBeInstanceOf(Error);
  });

  it('should create an exception with custom code', () => {
    const message = 'Custom base error';
    const code = 4001;
    const exception = new TestBaseException(message, code);

    expect(exception.message).toBe('[BaseException] Custom base error');
    expect(exception.name).toBe('BaseException');
    expect(exception.code).toBe(4001);
  });

  it('should be throwable', () => {
    expect(() => {
      throw new TestBaseException('Throwable base error');
    }).toThrow(TestBaseException);
  });

  it('should maintain error stack trace', () => {
    const exception = new TestBaseException('Stack trace test');
    expect(exception.stack).toBeDefined();
  });

  it('should be instance of Error and BaseException', () => {
    const exception = new TestBaseException('Instance test');
    expect(exception).toBeInstanceOf(Error);
    expect(exception).toBeInstanceOf(BaseException);
  });
});
