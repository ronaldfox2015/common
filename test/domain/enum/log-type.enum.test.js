"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_type_enum_1 = require("../../../src/domain/enum/log-type.enum");
describe('LogTypeEnum', () => {
    it('should have correct enum values', () => {
        expect(log_type_enum_1.LogTypeEnum.INFO).toBe('INFO');
        expect(log_type_enum_1.LogTypeEnum.WARNING).toBe('WARNING');
        expect(log_type_enum_1.LogTypeEnum.CRITICAL).toBe('CRITICAL');
        expect(log_type_enum_1.LogTypeEnum.REJECTED).toBe('REJECTED');
    });
    it('should have all expected enum keys', () => {
        const keys = Object.keys(log_type_enum_1.LogTypeEnum);
        expect(keys).toContain('INFO');
        expect(keys).toContain('WARNING');
        expect(keys).toContain('CRITICAL');
        expect(keys).toContain('REJECTED');
        expect(keys).toHaveLength(4);
    });
    it('should have all expected enum values', () => {
        const values = Object.values(log_type_enum_1.LogTypeEnum);
        expect(values).toContain('INFO');
        expect(values).toContain('WARNING');
        expect(values).toContain('CRITICAL');
        expect(values).toContain('REJECTED');
        expect(values).toHaveLength(4);
    });
});
