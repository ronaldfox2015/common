"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_service_impl_1 = require("../../../src/infrastructure/services/rest.service.impl");
const axios_1 = __importDefault(require("axios"));
// Mock axios
jest.mock('axios');
const mockedAxios = axios_1.default;
describe('RestServiceImpl', () => {
    let restService;
    let mockAxiosInstance;
    beforeEach(() => {
        mockAxiosInstance = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
        };
        mockedAxios.create.mockReturnValue(mockAxiosInstance);
        restService = new rest_service_impl_1.RestServiceImpl('https://api.example.com');
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('constructor', () => {
        it('should create axios instance with default configuration', () => {
            new rest_service_impl_1.RestServiceImpl('https://api.example.com');
            expect(mockedAxios.create).toHaveBeenCalledWith({
                baseURL: 'https://api.example.com',
                timeout: 5000,
            });
        });
        it('should create axios instance with custom configuration', () => {
            const customConfig = {
                timeout: 10000,
                headers: { 'Authorization': 'Bearer token' }
            };
            new rest_service_impl_1.RestServiceImpl('https://api.example.com', customConfig);
            expect(mockedAxios.create).toHaveBeenCalledWith({
                baseURL: 'https://api.example.com',
                timeout: 10000,
                headers: { 'Authorization': 'Bearer token' }
            });
        });
    });
    describe('get', () => {
        it('should make GET request and return data', async () => {
            const responseData = { id: 1, name: 'Test' };
            const mockResponse = { data: responseData };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);
            const result = await restService.get('/users/1');
            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users/1', { params: undefined });
            expect(result).toEqual(responseData);
        });
        it('should make GET request with query parameters', async () => {
            const responseData = [{ id: 1, name: 'Test' }];
            const mockResponse = { data: responseData };
            const params = { page: 1, limit: 10 };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);
            const result = await restService.get('/users', params);
            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users', { params });
            expect(result).toEqual(responseData);
        });
        it('should handle GET request errors', async () => {
            const error = new Error('Network error');
            mockAxiosInstance.get.mockRejectedValue(error);
            await expect(restService.get('/users/1')).rejects.toThrow('Network error');
        });
    });
    describe('post', () => {
        it('should make POST request and return data', async () => {
            const requestData = { name: 'New User', email: 'user@example.com' };
            const responseData = { id: 1, ...requestData };
            const mockResponse = { data: responseData };
            mockAxiosInstance.post.mockResolvedValue(mockResponse);
            const result = await restService.post('/users', requestData);
            expect(mockAxiosInstance.post).toHaveBeenCalledWith('/users', requestData);
            expect(result).toEqual(responseData);
        });
        it('should handle POST request errors', async () => {
            const requestData = { name: 'New User' };
            const error = new Error('Validation error');
            mockAxiosInstance.post.mockRejectedValue(error);
            await expect(restService.post('/users', requestData)).rejects.toThrow('Validation error');
        });
    });
    describe('put', () => {
        it('should make PUT request and return data', async () => {
            const requestData = { name: 'Updated User', email: 'updated@example.com' };
            const responseData = { id: 1, ...requestData };
            const mockResponse = { data: responseData };
            mockAxiosInstance.put.mockResolvedValue(mockResponse);
            const result = await restService.put('/users/1', requestData);
            expect(mockAxiosInstance.put).toHaveBeenCalledWith('/users/1', requestData);
            expect(result).toEqual(responseData);
        });
        it('should handle PUT request errors', async () => {
            const requestData = { name: 'Updated User' };
            const error = new Error('Not found');
            mockAxiosInstance.put.mockRejectedValue(error);
            await expect(restService.put('/users/1', requestData)).rejects.toThrow('Not found');
        });
    });
    describe('delete', () => {
        it('should make DELETE request and return data', async () => {
            const responseData = { success: true };
            const mockResponse = { data: responseData };
            mockAxiosInstance.delete.mockResolvedValue(mockResponse);
            const result = await restService.delete('/users/1');
            expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/users/1');
            expect(result).toEqual(responseData);
        });
        it('should handle DELETE request errors', async () => {
            const error = new Error('Forbidden');
            mockAxiosInstance.delete.mockRejectedValue(error);
            await expect(restService.delete('/users/1')).rejects.toThrow('Forbidden');
        });
    });
    describe('integration', () => {
        it('should work with different response types', async () => {
            // Test with string response
            const stringResponse = { data: 'Success' };
            mockAxiosInstance.get.mockResolvedValue(stringResponse);
            const stringResult = await restService.get('/status');
            expect(stringResult).toBe('Success');
            // Test with number response
            const numberResponse = { data: 42 };
            mockAxiosInstance.get.mockResolvedValue(numberResponse);
            const numberResult = await restService.get('/count');
            expect(numberResult).toBe(42);
            // Test with boolean response
            const booleanResponse = { data: true };
            mockAxiosInstance.get.mockResolvedValue(booleanResponse);
            const booleanResult = await restService.get('/active');
            expect(booleanResult).toBe(true);
        });
    });
});
