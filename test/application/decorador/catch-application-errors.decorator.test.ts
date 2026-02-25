import { CatchApplicationErrorsDecorator } from '../../../src/application/decorador/catch-application-errors.decorator';
import { ApplicationException } from '../../../src/application/exceptions/application.exception';
import { HttpStatus } from '../../../src/domain/enum/http-status.enum';

describe('CatchApplicationErrorsDecorator', () => {
  class TestClass {
    @CatchApplicationErrorsDecorator('default value')
    async methodWithDefaultValue() {
      throw { status: 400, message: 'Test error' };
    }

    @CatchApplicationErrorsDecorator()
    async methodWithoutDefaultValue() {
      throw { status: 400, response: 'Bad request' };
    }

    @CatchApplicationErrorsDecorator()
    async methodWithStatus500() {
      throw { status: 500, response: 'Internal server error' };
    }

    @CatchApplicationErrorsDecorator('default')
    async methodWithStatus500AndDefault() {
      throw { status: 500, response: 'Internal server error' };
    }

    @CatchApplicationErrorsDecorator('success')
    async successfulMethod() {
      return 'success result';
    }
  }

  let testInstance: TestClass;

  beforeEach(() => {
    testInstance = new TestClass();
  });

  it('should return default value when error 400-499 occurs and default value is provided', async () => {
    const result = await testInstance.methodWithDefaultValue();
    expect(result).toBe('default value');
  });

  it('should throw ApplicationException when no default value and status is 400-499', async () => {
    await expect(testInstance.methodWithoutDefaultValue()).rejects.toThrow(ApplicationException);

    try {
      await testInstance.methodWithoutDefaultValue();
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationException);
      expect((error as ApplicationException).message).toContain('Bad request');
      expect((error as ApplicationException).code).toBe(400);
    }
  });

  it('should convert status 500+ to 400 and throw ApplicationException', async () => {
    await expect(testInstance.methodWithStatus500()).rejects.toThrow(ApplicationException);

    try {
      await testInstance.methodWithStatus500();
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationException);
      expect((error as ApplicationException).message).toContain('Internal server error');
      expect((error as ApplicationException).code).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should convert status 500+ to 400 even with default value', async () => {
    await expect(testInstance.methodWithStatus500AndDefault()).rejects.toThrow(ApplicationException);

    try {
      await testInstance.methodWithStatus500AndDefault();
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationException);
      expect((error as ApplicationException).code).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should not interfere with successful method execution', async () => {
    const result = await testInstance.successfulMethod();
    expect(result).toBe('success result');
  });

  it('should preserve method context', async () => {
    class ContextTestClass {
      value = 'test value';

      @CatchApplicationErrorsDecorator('default')
      async getContextValue() {
        return this.value;
      }
    }

    const instance = new ContextTestClass();
    const result = await instance.getContextValue();
    expect(result).toBe('test value');
  });

  it('should use BAD_REQUEST as default status when no status provided', async () => {
    class NoStatusTestClass {
      @CatchApplicationErrorsDecorator()
      async methodWithNoStatus() {
        throw { message: 'Error without status' };
      }
    }

    const instance = new NoStatusTestClass();
    
    try {
      await instance.methodWithNoStatus();
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationException);
      expect((error as ApplicationException).code).toBe(HttpStatus.BAD_REQUEST);
    }
  });
});
