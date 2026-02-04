import { ConfigService } from '../../src/domain/config-service';

describe('ConfigService', () => {
  class TestConfigService extends ConfigService {
    private config: Record<string, string> = {
      'TEST_KEY': 'test_value',
      'DATABASE_URL': 'mysql://localhost:3306/test'
    };

    get(key: string): string {
      return this.config[key] || '';
    }
  }

  let configService: TestConfigService;

  beforeEach(() => {
    configService = new TestConfigService();
  });

  it('should allow concrete implementation', () => {
    expect(configService).toBeInstanceOf(ConfigService);
    expect(configService).toBeInstanceOf(TestConfigService);
  });

  it('should implement get method', () => {
    expect(configService.get('TEST_KEY')).toBe('test_value');
    expect(configService.get('DATABASE_URL')).toBe('mysql://localhost:3306/test');
  });

  it('should return empty string for non-existent keys', () => {
    expect(configService.get('NON_EXISTENT_KEY')).toBe('');
  });

  it('should have get method signature', () => {
    expect(typeof configService.get).toBe('function');
    expect(configService.get.length).toBe(1);
  });
});
