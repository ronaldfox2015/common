import { LogTypeEnum } from '../../../src/domain/enum/log-type.enum';

describe('LogTypeEnum', () => {
  it('should have correct enum values', () => {
    expect(LogTypeEnum.INFO).toBe('INFO');
    expect(LogTypeEnum.WARNING).toBe('WARNING');
    expect(LogTypeEnum.CRITICAL).toBe('CRITICAL');
    expect(LogTypeEnum.REJECTED).toBe('REJECTED');
  });

  it('should have all expected enum keys', () => {
    const keys = Object.keys(LogTypeEnum);
    expect(keys).toContain('INFO');
    expect(keys).toContain('WARNING');
    expect(keys).toContain('CRITICAL');
    expect(keys).toContain('REJECTED');
    expect(keys).toHaveLength(4);
  });

  it('should have all expected enum values', () => {
    const values = Object.values(LogTypeEnum);
    expect(values).toContain('INFO');
    expect(values).toContain('WARNING');
    expect(values).toContain('CRITICAL');
    expect(values).toContain('REJECTED');
    expect(values).toHaveLength(4);
  });
});
