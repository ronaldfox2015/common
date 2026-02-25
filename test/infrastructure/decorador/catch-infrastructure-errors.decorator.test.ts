import { CatchInfrastructureErrors } from '../../../src/infrastructure/decorador/catch-infrastructure-errors.decorator'
import { BadRequestInfrastructureException } from '../../../src/infrastructure/exceptions/bad-request.exception'
import { SequelizeInternalErrorNames } from '../../../src/domain/enum/sequelize-errors.enum'
import { HttpStatus } from '../../../src/domain/enum/http-status.enum'

describe('CatchInfrastructureErrors', () => {
  class TestClass {
    @CatchInfrastructureErrors('Custom error message')
    async methodWithCustomMessage() {
      throw new Error("Original error");
    }

    @CatchInfrastructureErrors()
    async methodWithDefaultMessage() {
      throw new Error("Original error");
    }

    @CatchInfrastructureErrors('Database error')
    async methodWithConnectionError() {
      const error = new Error("Database connection failed");
      error.name = SequelizeInternalErrorNames.Connection;
      throw error;
    }

    @CatchInfrastructureErrors('Database error')
    async methodWithDatabaseError() {
      const error = new Error("Query failed");
      error.name = SequelizeInternalErrorNames.Database;
      throw error;
    }

    @CatchInfrastructureErrors('Success method')
    async successfulMethod() {
      return 'success result'
    }

    @CatchInfrastructureErrors('Axios error')
    async methodWithAxiosError() {
      const error = new Error('Network error')
      error.name = SequelizeInternalErrorNames.AxiosError
      throw error
    }

    @CatchInfrastructureErrors('Validation error')
    async methodWithValidationError() {
      const error = new Error('Unique constraint violation')
      error.name = SequelizeInternalErrorNames.SequelizeUniqueConstraintError
      throw error
    }

    @CatchInfrastructureErrors('Network error')
    async methodWithNetworkError() {
      const error: any = new Error('Connection refused')
      error.code = 'ECONNREFUSED'
      throw error
    }
  }

  let testInstance: TestClass

  beforeEach(() => {
    testInstance = new TestClass()
  })

  it('should catch errors and throw BadRequestInfrastructureException with custom message', async () => {
    await expect(testInstance.methodWithCustomMessage()).rejects.toThrow(BadRequestInfrastructureException)

    try {
      await testInstance.methodWithCustomMessage()
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestInfrastructureException)
      expect((error as BadRequestInfrastructureException).message).toContain('Custom error message');
      expect((error as BadRequestInfrastructureException).code).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  it('should use default message when none provided', async () => {
    await expect(testInstance.methodWithDefaultMessage()).rejects.toThrow(BadRequestInfrastructureException)

    try {
      await testInstance.methodWithDefaultMessage()
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestInfrastructureException)
      expect((error as BadRequestInfrastructureException).message).toContain('Infrastructure error');
      expect((error as BadRequestInfrastructureException).code).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  it('should categorize connection errors with proper message prefix', async () => {
    await expect(testInstance.methodWithConnectionError()).rejects.toThrow(BadRequestInfrastructureException)

    try {
      await testInstance.methodWithConnectionError()
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestInfrastructureException)
      expect((error as BadRequestInfrastructureException).message).toContain('Connection error:');
      expect((error as BadRequestInfrastructureException).code).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  it('should categorize database errors with proper message prefix', async () => {
    await expect(testInstance.methodWithDatabaseError()).rejects.toThrow(BadRequestInfrastructureException)

    try {
      await testInstance.methodWithDatabaseError()
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestInfrastructureException)
      expect((error as BadRequestInfrastructureException).message).toContain('Connection error:');
      expect((error as BadRequestInfrastructureException).code).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  it('should categorize Axios errors with proper message prefix', async () => {
    await expect(testInstance.methodWithAxiosError()).rejects.toThrow(BadRequestInfrastructureException)

    try {
      await testInstance.methodWithAxiosError()
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestInfrastructureException)
      expect((error as BadRequestInfrastructureException).message).toContain('External service error:');
      expect((error as BadRequestInfrastructureException).code).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  it('should categorize validation errors with proper message prefix', async () => {
    await expect(testInstance.methodWithValidationError()).rejects.toThrow(BadRequestInfrastructureException)

    try {
      await testInstance.methodWithValidationError()
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestInfrastructureException)
      expect((error as BadRequestInfrastructureException).message).toContain('Validation error:');
      expect((error as BadRequestInfrastructureException).code).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  it('should categorize network errors with proper message prefix', async () => {
    await expect(testInstance.methodWithNetworkError()).rejects.toThrow(BadRequestInfrastructureException)

    try {
      await testInstance.methodWithNetworkError()
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestInfrastructureException)
      expect((error as BadRequestInfrastructureException).message).toContain('Network error:');
      expect((error as BadRequestInfrastructureException).code).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  it('should not interfere with successful method execution', async () => {
    const result = await testInstance.successfulMethod()
    expect(result).toBe('success result')
  })

  it('should preserve method context', async () => {
    class ContextTestClass {
      value = 'test value'

      @CatchInfrastructureErrors('Context test')
      async getContextValue() {
        return this.value
      }
    }

    const instance = new ContextTestClass()
    const result = await instance.getContextValue()
    expect(result).toBe('test value')
  })

  it('should handle errors without name property', async () => {
    class ErrorTestClass {
      @CatchInfrastructureErrors('No name error')
      async methodWithNoNameError() {
        const error: any = { message: 'Error without name' }
        throw error
      }
    }

    const instance = new ErrorTestClass()
    await expect(instance.methodWithNoNameError()).rejects.toThrow(BadRequestInfrastructureException)
    
    try {
      await instance.methodWithNoNameError()
    } catch (error) {
      expect((error as BadRequestInfrastructureException).code).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  it('should always return 500 status code for all infrastructure errors', async () => {
    const methods = [
      testInstance.methodWithCustomMessage(),
      testInstance.methodWithConnectionError(),
      testInstance.methodWithAxiosError(),
      testInstance.methodWithValidationError(),
      testInstance.methodWithNetworkError()
    ];

    for (const method of methods) {
      try {
        await method;
      } catch (error) {
        expect((error as BadRequestInfrastructureException).code).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  });
})
