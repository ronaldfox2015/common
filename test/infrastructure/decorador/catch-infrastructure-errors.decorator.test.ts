import { CatchInfrastructureErrors } from '../../../src/infrastructure/decorador/catch-infrastructure-errors.decorator'
import { BadRequestInfrastructureException } from '../../../src/infrastructure/exceptions/bad-request.exception'
import { SequelizeInternalErrorNames } from '../../../src/domain/enum/sequelize-errors.enum'
import { HttpStatus } from '../../../src/domain/enum/http-status.enum'

describe('CatchInfrastructureErrors', () => {
  class TestClass {
    @CatchInfrastructureErrors('Custom error message')
    async methodWithCustomMessage() {
      throw new BadRequestInfrastructureException("Original error");
    }

    @CatchInfrastructureErrors()
    async methodWithDefaultMessage() {
      throw new BadRequestInfrastructureException("Original error");
    }

    @CatchInfrastructureErrors('Sequelize error')
    async methodWithSequelizeError() {
      const error = new BadRequestInfrastructureException(
        "Database connection failed"
      );
      error.name = SequelizeInternalErrorNames.Connection
      throw error
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
      expect((error as BadRequestInfrastructureException).message).toContain(
        "[BaseException] Custom error message: [BaseException] Original error"
      );
      expect((error as BadRequestInfrastructureException).code).toBe(
        HttpStatus.BAD_REQUEST
      );
    }
  })

  it('should use default message when none provided', async () => {
    await expect(testInstance.methodWithDefaultMessage()).rejects.toThrow(BadRequestInfrastructureException)

    try {
      await testInstance.methodWithDefaultMessage()
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestInfrastructureException)
      expect((error as BadRequestInfrastructureException).message).toContain(
        "[BaseException] Infrastructure error: [BaseException] Original error"
      );
    }
  })

  it('should set INTERNAL_SERVER_ERROR code for Sequelize errors', async () => {
    await expect(testInstance.methodWithSequelizeError()).rejects.toThrow(BadRequestInfrastructureException)

    try {
      await testInstance.methodWithSequelizeError()
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestInfrastructureException)
      expect((error as BadRequestInfrastructureException).code).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
    }
  })

  it('should set INTERNAL_SERVER_ERROR code for Axios errors', async () => {
    await expect(testInstance.methodWithAxiosError()).rejects.toThrow(BadRequestInfrastructureException)

    try {
      await testInstance.methodWithAxiosError()
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestInfrastructureException)
      expect((error as BadRequestInfrastructureException).code).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
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
  })
})
