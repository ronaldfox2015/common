"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const catch_infrastructure_errors_decorator_1 = require("../../../src/infrastructure/decorador/catch-infrastructure-errors.decorator");
const bad_request_exception_1 = require("../../../src/infrastructure/exceptions/bad-request.exception");
const sequelize_errors_enum_1 = require("../../../src/domain/enum/sequelize-errors.enum");
const http_status_enum_1 = require("../../../src/domain/enum/http-status.enum");
describe('CatchInfrastructureErrors', () => {
    class TestClass {
        async methodWithCustomMessage() {
            throw new bad_request_exception_1.BadRequestInfrastructureException("Original error");
        }
        async methodWithDefaultMessage() {
            throw new bad_request_exception_1.BadRequestInfrastructureException("Original error");
        }
        async methodWithSequelizeError() {
            const error = new bad_request_exception_1.BadRequestInfrastructureException("Database connection failed");
            error.name = sequelize_errors_enum_1.SequelizeInternalErrorNames.Connection;
            throw error;
        }
        async successfulMethod() {
            return 'success result';
        }
        async methodWithAxiosError() {
            const error = new Error('Network error');
            error.name = sequelize_errors_enum_1.SequelizeInternalErrorNames.AxiosError;
            throw error;
        }
    }
    __decorate([
        (0, catch_infrastructure_errors_decorator_1.CatchInfrastructureErrors)('Custom error message'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], TestClass.prototype, "methodWithCustomMessage", null);
    __decorate([
        (0, catch_infrastructure_errors_decorator_1.CatchInfrastructureErrors)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], TestClass.prototype, "methodWithDefaultMessage", null);
    __decorate([
        (0, catch_infrastructure_errors_decorator_1.CatchInfrastructureErrors)('Sequelize error'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], TestClass.prototype, "methodWithSequelizeError", null);
    __decorate([
        (0, catch_infrastructure_errors_decorator_1.CatchInfrastructureErrors)('Success method'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], TestClass.prototype, "successfulMethod", null);
    __decorate([
        (0, catch_infrastructure_errors_decorator_1.CatchInfrastructureErrors)('Axios error'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], TestClass.prototype, "methodWithAxiosError", null);
    let testInstance;
    beforeEach(() => {
        testInstance = new TestClass();
    });
    it('should catch errors and throw BadRequestInfrastructureException with custom message', async () => {
        await expect(testInstance.methodWithCustomMessage()).rejects.toThrow(bad_request_exception_1.BadRequestInfrastructureException);
        try {
            await testInstance.methodWithCustomMessage();
        }
        catch (error) {
            expect(error).toBeInstanceOf(bad_request_exception_1.BadRequestInfrastructureException);
            expect(error.message).toContain("[BaseException] Custom error message: [BaseException] Original error");
            expect(error.code).toBe(http_status_enum_1.HttpStatus.BAD_REQUEST);
        }
    });
    it('should use default message when none provided', async () => {
        await expect(testInstance.methodWithDefaultMessage()).rejects.toThrow(bad_request_exception_1.BadRequestInfrastructureException);
        try {
            await testInstance.methodWithDefaultMessage();
        }
        catch (error) {
            expect(error).toBeInstanceOf(bad_request_exception_1.BadRequestInfrastructureException);
            expect(error.message).toContain("[BaseException] Infrastructure error: [BaseException] Original error");
        }
    });
    it('should set INTERNAL_SERVER_ERROR code for Sequelize errors', async () => {
        await expect(testInstance.methodWithSequelizeError()).rejects.toThrow(bad_request_exception_1.BadRequestInfrastructureException);
        try {
            await testInstance.methodWithSequelizeError();
        }
        catch (error) {
            expect(error).toBeInstanceOf(bad_request_exception_1.BadRequestInfrastructureException);
            expect(error.code).toBe(http_status_enum_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
    it('should set INTERNAL_SERVER_ERROR code for Axios errors', async () => {
        await expect(testInstance.methodWithAxiosError()).rejects.toThrow(bad_request_exception_1.BadRequestInfrastructureException);
        try {
            await testInstance.methodWithAxiosError();
        }
        catch (error) {
            expect(error).toBeInstanceOf(bad_request_exception_1.BadRequestInfrastructureException);
            expect(error.code).toBe(http_status_enum_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
    it('should not interfere with successful method execution', async () => {
        const result = await testInstance.successfulMethod();
        expect(result).toBe('success result');
    });
    it('should preserve method context', async () => {
        class ContextTestClass {
            constructor() {
                this.value = 'test value';
            }
            async getContextValue() {
                return this.value;
            }
        }
        __decorate([
            (0, catch_infrastructure_errors_decorator_1.CatchInfrastructureErrors)('Context test'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], ContextTestClass.prototype, "getContextValue", null);
        const instance = new ContextTestClass();
        const result = await instance.getContextValue();
        expect(result).toBe('test value');
    });
    it('should handle errors without name property', async () => {
        class ErrorTestClass {
            async methodWithNoNameError() {
                const error = { message: 'Error without name' };
                throw error;
            }
        }
        __decorate([
            (0, catch_infrastructure_errors_decorator_1.CatchInfrastructureErrors)('No name error'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], ErrorTestClass.prototype, "methodWithNoNameError", null);
        const instance = new ErrorTestClass();
        await expect(instance.methodWithNoNameError()).rejects.toThrow(bad_request_exception_1.BadRequestInfrastructureException);
    });
});
