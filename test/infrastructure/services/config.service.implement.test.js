"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_service_implement_1 = require("../../../src/infrastructure/services/config.service.implement");
const dotenv = __importStar(require("dotenv"));
const dotenvExpand = __importStar(require("dotenv-expand"));
// Mock dotenv and dotenv-expand
jest.mock('dotenv');
jest.mock('dotenv-expand');
describe('ConfigServiceImplement', () => {
    let configService;
    let mockDotenvConfig;
    let mockDotenvExpand;
    beforeEach(() => {
        mockDotenvConfig = dotenv.config;
        mockDotenvExpand = dotenvExpand.expand;
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
        mockDotenvConfig.mockReturnValue(mockDotenvResult);
        mockDotenvExpand.mockReturnValue(mockExpandResult);
        configService = new config_service_implement_1.ConfigServiceImplement();
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
        mockDotenvConfig.mockReturnValue(mockDotenvResult);
        mockDotenvExpand.mockReturnValue(mockExpandResult);
        configService = new config_service_implement_1.ConfigServiceImplement();
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
        mockDotenvConfig.mockReturnValue(mockDotenvResult);
        mockDotenvExpand.mockReturnValue(mockExpandResult);
        configService = new config_service_implement_1.ConfigServiceImplement();
        expect(configService.get('NON_EXISTENT_KEY')).toBe('');
    });
    it('should handle undefined parsed configuration', () => {
        const mockDotenvResult = { parsed: undefined };
        const mockExpandResult = { parsed: undefined };
        mockDotenvConfig.mockReturnValue(mockDotenvResult);
        mockDotenvExpand.mockReturnValue(mockExpandResult);
        configService = new config_service_implement_1.ConfigServiceImplement();
        expect(configService.get('ANY_KEY')).toBe('');
    });
    it('should handle null parsed configuration', () => {
        const mockDotenvResult = { parsed: null };
        const mockExpandResult = { parsed: null };
        mockDotenvConfig.mockReturnValue(mockDotenvResult);
        mockDotenvExpand.mockReturnValue(mockExpandResult);
        configService = new config_service_implement_1.ConfigServiceImplement();
        expect(configService.get('ANY_KEY')).toBe('');
    });
    it('should handle empty parsed configuration', () => {
        const mockParsed = {};
        const mockDotenvResult = { parsed: mockParsed };
        const mockExpandResult = { parsed: mockParsed };
        mockDotenvConfig.mockReturnValue(mockDotenvResult);
        mockDotenvExpand.mockReturnValue(mockExpandResult);
        configService = new config_service_implement_1.ConfigServiceImplement();
        expect(configService.get("ANY_KEY")).toBe('');
    });
    it('should implement ConfigService interface', () => {
        const mockParsed = { 'TEST_KEY': 'test_value' };
        const mockDotenvResult = { parsed: mockParsed };
        const mockExpandResult = { parsed: mockParsed };
        mockDotenvConfig.mockReturnValue(mockDotenvResult);
        mockDotenvExpand.mockReturnValue(mockExpandResult);
        configService = new config_service_implement_1.ConfigServiceImplement();
        expect(typeof configService.get).toBe('function');
        expect(configService.get('TEST_KEY')).toBe('test_value');
    });
});
