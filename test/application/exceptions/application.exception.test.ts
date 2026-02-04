import { ApplicationException } from '../../../src/application/exceptions/application.exception';

describe('ApplicationException', () => {
  it('should create an exception with default code', () => {
    const message = 'Test error';
    const exception = new ApplicationException(message);

    expect(exception.message).toBe('[ApplicationException] Test error');
    expect(exception.name).toBe('ApplicationException');
    expect(exception.code).toBe(2000);
    expect(exception).toBeInstanceOf(Error);
  });

  it('should create an exception with custom code', () => {
    const message = 'Custom error';
    const code = 2001;
    const exception = new ApplicationException(message, code);

    expect(exception.message).toBe('[ApplicationException] Custom error');
    expect(exception.name).toBe('ApplicationException');
    expect(exception.code).toBe(2001);
  });

  it('should be throwable', () => {
    expect(() => {
      throw new ApplicationException('Throwable error');
    }).toThrow(ApplicationException);
  });
});
