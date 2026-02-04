import { ConfigServiceImplement } from '../../../src/infrastructure/services/config.service.implement';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

// Mock dotenv and dotenv-expand
jest.mock('dotenv');
jest.mock('dotenv-expand');

describe('ConfigServiceImplement', () => {
  let configService: ConfigServiceImplement;
  let mockDotenvConfig: jest.MockedFunction<typeof dotenv.config>;
  let mockDotenvExpand: jest.MockedFunction<typeof dotenvExpand.expand>;

  beforeEach(() => {
    mockDotenvConfig = dotenv.config as jest.MockedFunction<typeof dotenv.config>;
    mockDotenvExpand = dotenvExpand.expand as jest.MockedFunction<typeof dotenvExpand.expand>;

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should initialize with dotenv configuration', () => {
    const mockParsed = {
      'DATABASE_URL': 'mysql://localhost:3306/test',
      'API_KEY': 'test-api-key',
      'PORT': '3000'
    };

    const mockDotenvResult = { parsed: mockParsed };
    const mockExpandResult = { parsed: mockParsed };

    mockDotenvConfig.mockReturnValue(mockDotenvResult as any);
    mockDotenvExpand.mockReturnValue(mockExpandResult as any);

    configService = new ConfigServiceImplement();

    expect(mockDotenvConfig).toHaveBeenCalledWith({ path: '.env' });
    expect(mockDotenvExpand).toHaveBeenCalledWith(mockDotenvResult);
  });

  it('should get existing configuration values', () => {
    const mockParsed = {
      'DATABASE_URL': 'mysql://localhost:3306/test',
      'API_KEY': 'test-api-key',
      'PORT': '3000'
    };

    const mockDotenvResult = { parsed: mockParsed };
    const mockExpandResult = { parsed: mockParsed };

    mockDotenvConfig.mockReturnValue(mockDotenvResult as any);
    mockDotenvExpand.mockReturnValue(mockExpandResult as any);

    configService = new ConfigServiceImplement();

    expect(configService.get('DATABASE_URL')).toBe('mysql://localhost:3306/test');
    expect(configService.get('API_KEY')).toBe('test-api-key');
    expect(configService.get('PORT')).toBe('3000');
  });

  it('should return empty string for non-existent keys', () => {
    const mockParsed = {
      'DATABASE_URL': 'mysql://localhost:3306/test'
    };

    const mockDotenvResult = { parsed: mockParsed };
    const mockExpandResult = { parsed: mockParsed };

    mockDotenvConfig.mockReturnValue(mockDotenvResult as any);
    mockDotenvExpand.mockReturnValue(mockExpandResult as any);

    configService = new ConfigServiceImplement();

    expect(configService.get('NON_EXISTENT_KEY')).toBe('');
  });

  it('should handle undefined parsed configuration', () => {
    const mockDotenvResult = { parsed: undefined };
    const mockExpandResult = { parsed: undefined };

    mockDotenvConfig.mockReturnValue(mockDotenvResult as any);
    mockDotenvExpand.mockReturnValue(mockExpandResult as any);

    configService = new ConfigServiceImplement();

    expect(configService.get('ANY_KEY')).toBe('');
  });

  it('should handle null parsed configuration', () => {
    const mockDotenvResult = { parsed: null };
    const mockExpandResult = { parsed: null };

    mockDotenvConfig.mockReturnValue(mockDotenvResult as any);
    mockDotenvExpand.mockReturnValue(mockExpandResult as any);

    configService = new ConfigServiceImplement();

    expect(configService.get('ANY_KEY')).toBe('');
  });

  it('should handle empty parsed configuration', () => {
    const mockParsed = {};

    const mockDotenvResult = { parsed: mockParsed };
    const mockExpandResult = { parsed: mockParsed };

    mockDotenvConfig.mockReturnValue(mockDotenvResult as any);
    mockDotenvExpand.mockReturnValue(mockExpandResult as any);

    configService = new ConfigServiceImplement();
    expect(configService.get("ANY_KEY")).toBe('');
  });

  it('should implement ConfigService interface', () => {
    const mockParsed = { 'TEST_KEY': 'test_value' };
    const mockDotenvResult = { parsed: mockParsed };
    const mockExpandResult = { parsed: mockParsed };

    mockDotenvConfig.mockReturnValue(mockDotenvResult as any);
    mockDotenvExpand.mockReturnValue(mockExpandResult as any);

    configService = new ConfigServiceImplement();

    expect(typeof configService.get).toBe('function');
    expect(configService.get('TEST_KEY')).toBe('test_value');
  });
});
