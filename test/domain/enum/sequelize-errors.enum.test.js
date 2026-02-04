"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_errors_enum_1 = require("../../../src/domain/enum/sequelize-errors.enum");
describe('SequelizeInternalErrorNames', () => {
    it('should have correct enum values', () => {
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.AccessDenied).toBe('SequelizeAccessDeniedError');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.Connection).toBe('SequelizeConnectionError');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.ConnectionRefused).toBe('SequelizeConnectionRefusedError');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.HostNotFound).toBe('SequelizeHostNotFoundError');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.Timeout).toBe('SequelizeTimeoutError');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.Database).toBe('SequelizeDatabaseError');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.AxiosError).toBe('AxiosError');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.HttpException).toBe('HttpException');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.ReferenceError).toBe('ReferenceError');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.TypeError).toBe('TypeError');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.Error).toBe('Error');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.NotFoundException).toBe('NotFoundException');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.BadRequestException).toBe('BadRequestException');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.ConnectionTimeoutError).toBe('ConnectionTimeoutError');
        expect(sequelize_errors_enum_1.SequelizeInternalErrorNames.BadRequestInfrastructureException).toBe('BadRequestInfrastructureException');
    });
    it('should contain all expected error names', () => {
        const values = Object.values(sequelize_errors_enum_1.SequelizeInternalErrorNames);
        expect(values).toHaveLength(15);
        expect(values).toContain('SequelizeAccessDeniedError');
        expect(values).toContain('AxiosError');
        expect(values).toContain('Error');
    });
    it('should be usable for error type checking', () => {
        const errorNames = Object.values(sequelize_errors_enum_1.SequelizeInternalErrorNames);
        const testError = 'SequelizeConnectionError';
        expect(errorNames.includes(testError)).toBe(true);
        expect(errorNames.includes('UnknownError')).toBe(false);
    });
});
