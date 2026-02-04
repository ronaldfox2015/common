"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_exception_1 = require("../../../src/infrastructure/exceptions/bad-request.exception");
const base_exception_1 = require("../../../src/infrastructure/exceptions/base.exception");
describe('BadRequestInfrastructureException', () => {
    it('should create an exception with default code from BaseException', () => {
        const message = 'Bad request error';
        const exception = new bad_request_exception_1.BadRequestInfrastructureException(message);
        expect(exception.message).toBe('[BaseException] Bad request error');
        expect(exception.name).toBe('BaseException');
        expect(exception.code).toBe(4000);
        expect(exception).toBeInstanceOf(Error);
        expect(exception).toBeInstanceOf(base_exception_1.BaseException);
    });
    it('should create an exception with custom code', () => {
        const message = 'Custom bad request error';
        const code = 4001;
        const exception = new bad_request_exception_1.BadRequestInfrastructureException(message, code);
        expect(exception.message).toBe('[BaseException] Custom bad request error');
        expect(exception.name).toBe('BaseException');
        expect(exception.code).toBe(4001);
    });
    it('should be throwable', () => {
        expect(() => {
            throw new bad_request_exception_1.BadRequestInfrastructureException('Throwable bad request error');
        }).toThrow(bad_request_exception_1.BadRequestInfrastructureException);
    });
    it('should inherit from BaseException', () => {
        const exception = new bad_request_exception_1.BadRequestInfrastructureException('Inheritance test');
        expect(exception).toBeInstanceOf(base_exception_1.BaseException);
        expect(exception).toBeInstanceOf(bad_request_exception_1.BadRequestInfrastructureException);
    });
    it('should maintain error stack trace', () => {
        const exception = new bad_request_exception_1.BadRequestInfrastructureException('Stack trace test');
        expect(exception.stack).toBeDefined();
    });
    it('should be usable in try-catch blocks', () => {
        let caughtException;
        try {
            throw new bad_request_exception_1.BadRequestInfrastructureException('Test error', 400);
        }
        catch (error) {
            caughtException = error;
        }
        expect(caughtException).toBeInstanceOf(bad_request_exception_1.BadRequestInfrastructureException);
        expect(caughtException.code).toBe(400);
    });
});
