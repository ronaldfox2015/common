"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_const_util_1 = require("../../../src/domain/enum/logger.const.util");
describe('Logger Constants', () => {
    it('should have correct constant values', () => {
        expect(logger_const_util_1.INFO).toBe('INFO');
        expect(logger_const_util_1.CRITICAL).toBe('CRITICAL');
        expect(logger_const_util_1.WARNING).toBe('WARNING');
        expect(logger_const_util_1.APP).toBe('API');
        expect(logger_const_util_1.REQUEST).toBe('request');
        expect(logger_const_util_1.RESPONSE).toBe('response');
    });
    it('should be immutable strings', () => {
        expect(typeof logger_const_util_1.INFO).toBe('string');
        expect(typeof logger_const_util_1.CRITICAL).toBe('string');
        expect(typeof logger_const_util_1.WARNING).toBe('string');
        expect(typeof logger_const_util_1.APP).toBe('string');
        expect(typeof logger_const_util_1.REQUEST).toBe('string');
        expect(typeof logger_const_util_1.RESPONSE).toBe('string');
    });
});
