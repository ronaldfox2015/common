import { CachApplicationErrorsDecorator } from '../../../src/application/decorador/catch-application-errors.decorator';
import { ApplicationException } from '../../../src/application/exceptions/application.exception';

describe('CachApplicationErrorsDecorator', () => {
  class TestClass {
    @CachApplicationErrorsDecorator('default value')
    async methodWithDefaultValue() {
      throw new Error('Test error');
    }

    @CachApplicationErrorsDecorator(undefined)
    async methodWithoutDefaultValue() {
      throw { status: 400, response: 'Bad request' };
    }

    @CachApplicationErrorsDecorator('default')
    async methodWithStatus500() {
      throw { status: 500, response: 'Internal server error' };
    }

    @CachApplicationErrorsDecorator('success')
    async successfulMethod() {
      return 'success result';
    }
  }

  let testInstance: TestClass;

  beforeEach(() => {
    testInstance = new TestClass();
  });

  it('should return default value when error occurs and default value is provided', async () => {
    const result = await testInstance.methodWithDefaultValue();
    expect(result).toBe('default value');
  });

  it('should throw ApplicationException when no default value and status is not 500', async () => {
    await expect(testInstance.methodWithoutDefaultValue()).rejects.toThrow(ApplicationException);

    try {
      await testInstance.methodWithoutDefaultValue();
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationException);
      expect((error as ApplicationException).message).toContain('Bad request');
    }
  });

  it('should throw ApplicationException when status is 500', async () => {
    await expect(testInstance.methodWithStatus500()).rejects.toThrow(ApplicationException);

    try {
      await testInstance.methodWithStatus500();
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationException);
      expect((error as ApplicationException).message).toContain('Internal server error');
    }
  });

  it('should not interfere with successful method execution', async () => {
    const result = await testInstance.successfulMethod();
    expect(result).toBe('success result');
  });

  it('should preserve method context', async () => {
    class ContextTestClass {
      value = 'test value';

      @CachApplicationErrorsDecorator('default')
      async getContextValue() {
        return this.value;
      }
    }

    const instance = new ContextTestClass();
    const result = await instance.getContextValue();
    expect(result).toBe('test value');
  });
});
