import { SequelizeInternalErrorNames } from '../../../src/domain/enum/sequelize-errors.enum';

describe('SequelizeInternalErrorNames', () => {
  it('should have correct enum values', () => {
    expect(SequelizeInternalErrorNames.AccessDenied).toBe('SequelizeAccessDeniedError');
    expect(SequelizeInternalErrorNames.Connection).toBe('SequelizeConnectionError');
    expect(SequelizeInternalErrorNames.ConnectionRefused).toBe('SequelizeConnectionRefusedError');
    expect(SequelizeInternalErrorNames.HostNotFound).toBe('SequelizeHostNotFoundError');
    expect(SequelizeInternalErrorNames.Timeout).toBe('SequelizeTimeoutError');
    expect(SequelizeInternalErrorNames.Database).toBe('SequelizeDatabaseError');
    expect(SequelizeInternalErrorNames.AxiosError).toBe('AxiosError');
    expect(SequelizeInternalErrorNames.HttpException).toBe('HttpException');
    expect(SequelizeInternalErrorNames.ReferenceError).toBe('ReferenceError');
    expect(SequelizeInternalErrorNames.TypeError).toBe('TypeError');
    expect(SequelizeInternalErrorNames.Error).toBe('Error');
    expect(SequelizeInternalErrorNames.NotFoundException).toBe('NotFoundException');
    expect(SequelizeInternalErrorNames.BadRequestException).toBe('BadRequestException');
    expect(SequelizeInternalErrorNames.ConnectionTimeoutError).toBe('ConnectionTimeoutError');
    expect(SequelizeInternalErrorNames.BadRequestInfrastructureException).toBe('BadRequestInfrastructureException');
  });

  it('should contain all expected error names', () => {
    const values = Object.values(SequelizeInternalErrorNames);
    expect(values).toHaveLength(15);
    expect(values).toContain('SequelizeAccessDeniedError');
    expect(values).toContain('AxiosError');
    expect(values).toContain('Error');
  });

  it('should be usable for error type checking', () => {
    const errorNames = Object.values(SequelizeInternalErrorNames);
    const testError = 'SequelizeConnectionError';

    expect(errorNames.includes(testError as any)).toBe(true);
    expect(errorNames.includes('UnknownError' as any)).toBe(false);
  });
});
