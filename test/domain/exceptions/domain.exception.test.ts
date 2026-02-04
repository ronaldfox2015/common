import { DomainException } from '../../../src/domain/exceptions/domain.exception';

describe('DomainException', () => {
  it('should create an exception with default code', () => {
    const message = 'Domain error';
    const exception = new DomainException(message);

    expect(exception.message).toBe('[DomainException] Domain error');
    expect(exception.name).toBe('DomainException');
    expect(exception.code).toBe(1000);
    expect(exception).toBeInstanceOf(Error);
  });

  it('should create an exception with custom code', () => {
    const message = 'Custom domain error';
    const code = 1001;
    const exception = new DomainException(message, code);

    expect(exception.message).toBe('[DomainException] Custom domain error');
    expect(exception.name).toBe('DomainException');
    expect(exception.code).toBe(1001);
  });

  it('should be throwable', () => {
    expect(() => {
      throw new DomainException('Throwable domain error');
    }).toThrow(DomainException);
  });

  it('should maintain error stack trace', () => {
    const exception = new DomainException('Stack trace test');
    expect(exception.stack).toBeDefined();
  });
});
