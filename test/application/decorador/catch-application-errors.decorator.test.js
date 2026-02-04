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
const catch_application_errors_decorator_1 = require("../../../src/application/decorador/catch-application-errors.decorator");
const application_exception_1 = require("../../../src/application/exceptions/application.exception");
describe('CachApplicationErrorsDecorator', () => {
    class TestClass {
        async methodWithDefaultValue() {
            throw new Error('Test error');
        }
        async methodWithoutDefaultValue() {
            throw { status: 400, response: 'Bad request' };
        }
        async methodWithStatus500() {
            throw { status: 500, response: 'Internal server error' };
        }
        async successfulMethod() {
            return 'success result';
        }
    }
    __decorate([
        (0, catch_application_errors_decorator_1.CachApplicationErrorsDecorator)('default value'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], TestClass.prototype, "methodWithDefaultValue", null);
    __decorate([
        (0, catch_application_errors_decorator_1.CachApplicationErrorsDecorator)(undefined),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], TestClass.prototype, "methodWithoutDefaultValue", null);
    __decorate([
        (0, catch_application_errors_decorator_1.CachApplicationErrorsDecorator)('default'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], TestClass.prototype, "methodWithStatus500", null);
    __decorate([
        (0, catch_application_errors_decorator_1.CachApplicationErrorsDecorator)('success'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], TestClass.prototype, "successfulMethod", null);
    let testInstance;
    beforeEach(() => {
        testInstance = new TestClass();
    });
    it('should return default value when error occurs and default value is provided', async () => {
        const result = await testInstance.methodWithDefaultValue();
        expect(result).toBe('default value');
    });
    it('should throw ApplicationException when no default value and status is not 500', async () => {
        await expect(testInstance.methodWithoutDefaultValue()).rejects.toThrow(application_exception_1.ApplicationException);
        try {
            await testInstance.methodWithoutDefaultValue();
        }
        catch (error) {
            expect(error).toBeInstanceOf(application_exception_1.ApplicationException);
            expect(error.message).toContain('Bad request');
        }
    });
    it('should throw ApplicationException when status is 500', async () => {
        await expect(testInstance.methodWithStatus500()).rejects.toThrow(application_exception_1.ApplicationException);
        try {
            await testInstance.methodWithStatus500();
        }
        catch (error) {
            expect(error).toBeInstanceOf(application_exception_1.ApplicationException);
            expect(error.message).toContain('Internal server error');
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
            (0, catch_application_errors_decorator_1.CachApplicationErrorsDecorator)('default'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], ContextTestClass.prototype, "getContextValue", null);
        const instance = new ContextTestClass();
        const result = await instance.getContextValue();
        expect(result).toBe('test value');
    });
});
