import { INFO, CRITICAL, WARNING, APP, REQUEST, RESPONSE } from '../../../src/domain/enum/logger.const.util';

describe('Logger Constants', () => {
  it('should have correct constant values', () => {
    expect(INFO).toBe('INFO');
    expect(CRITICAL).toBe('CRITICAL');
    expect(WARNING).toBe('WARNING');
    expect(APP).toBe('API');
    expect(REQUEST).toBe('request');
    expect(RESPONSE).toBe('response');
  });

  it('should be immutable strings', () => {
    expect(typeof INFO).toBe('string');
    expect(typeof CRITICAL).toBe('string');
    expect(typeof WARNING).toBe('string');
    expect(typeof APP).toBe('string');
    expect(typeof REQUEST).toBe('string');
    expect(typeof RESPONSE).toBe('string');
  });
});
