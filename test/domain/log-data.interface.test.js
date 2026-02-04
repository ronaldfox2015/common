"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('LogData Interfaces', () => {
    describe('LogData', () => {
        it('should accept valid LogData object', () => {
            const logData = {
                ip: '192.168.1.1',
                type: 'INFO',
                httpCode: 200,
                message: 'Test message',
                context: {
                    url: '/api/test',
                    method: 'GET',
                    data: {
                        headers: {
                            'x-forwarded-for': '192.168.1.1',
                            'user-agent': 'Mozilla/5.0',
                            srv: 'api-server'
                        },
                        request: {
                            params: { id: '123' },
                            query: { page: 1 },
                            body: { data: 'test' }
                        }
                    }
                },
                trace: null,
                responseTime: '150 ms'
            };
            expect(logData.ip).toBe('192.168.1.1');
            expect(logData.type).toBe('INFO');
            expect(logData.httpCode).toBe(200);
        });
    });
    describe('Headers', () => {
        it('should accept valid Headers object', () => {
            const headers = {
                'x-forwarded-for': '192.168.1.1',
                'user-agent': 'Mozilla/5.0',
                srv: 'api-server'
            };
            expect(headers['x-forwarded-for']).toBe('192.168.1.1');
            expect(headers['user-agent']).toBe('Mozilla/5.0');
            expect(headers.srv).toBe('api-server');
        });
        it('should accept Headers with unknown values', () => {
            const headers = {
                'x-forwarded-for': 'unknown',
                'user-agent': 'unknown',
                srv: null
            };
            expect(headers['x-forwarded-for']).toBe('unknown');
            expect(headers['user-agent']).toBe('unknown');
            expect(headers.srv).toBeNull();
        });
    });
    describe('LogParams', () => {
        it('should accept minimal LogParams object', () => {
            const logParams = {};
            expect(logParams).toBeDefined();
        });
        it('should accept complete LogParams object', () => {
            const logParams = {
                method: 'POST',
                clientIp: '192.168.1.1',
                originalUrl: '/api/users',
                parameterType: 'body',
                headers: {
                    'x-forwarded-for': '192.168.1.1',
                    'user-agent': 'Mozilla/5.0',
                    srv: 'api-server',
                    authorization: 'Bearer token'
                },
                request: {
                    params: { id: '123' },
                    query: { page: 1, limit: 10 },
                    body: { name: 'John', email: 'john@example.com' }
                },
                response: { success: true },
                dataResponse: { data: [] },
                message: 'User created successfully',
                status: 201,
                trace: ['stack trace line 1', 'stack trace line 2'],
                startTime: Date.now()
            };
            expect(logParams.method).toBe('POST');
            expect(logParams.status).toBe(201);
            expect(logParams.headers?.authorization).toBe('Bearer token');
        });
    });
    describe('RequestData', () => {
        it('should accept RequestData with all properties', () => {
            const requestData = {
                params: { id: '123', userId: '456' },
                query: { page: 1, limit: 10, sort: 'name' },
                body: { name: 'John', email: 'john@example.com', age: 30 }
            };
            expect(requestData.params?.id).toBe('123');
            expect(requestData.query?.page).toBe(1);
            expect(requestData.body?.name).toBe('John');
        });
        it('should accept RequestData with optional properties', () => {
            const requestData = {
                params: { id: '123' }
            };
            expect(requestData.params?.id).toBe('123');
            expect(requestData.query).toBeUndefined();
            expect(requestData.body).toBeUndefined();
        });
    });
    describe('HeadersInput', () => {
        it('should extend Headers and accept additional properties', () => {
            const headersInput = {
                'x-forwarded-for': '192.168.1.1',
                'user-agent': 'Mozilla/5.0',
                srv: 'api-server',
                authorization: 'Bearer token',
                'content-type': 'application/json',
                customHeader: 'custom value'
            };
            expect(headersInput['x-forwarded-for']).toBe('192.168.1.1');
            expect(headersInput.authorization).toBe('Bearer token');
            expect(headersInput.customHeader).toBe('custom value');
        });
    });
    describe('Context', () => {
        it('should accept valid Context object', () => {
            const context = {
                url: '/api/users/123',
                method: 'PUT',
                data: {
                    headers: {
                        'x-forwarded-for': '192.168.1.1',
                        'user-agent': 'Mozilla/5.0',
                        srv: 'api-server'
                    },
                    request: {
                        params: { id: '123' },
                        query: {},
                        body: { name: 'Updated Name' }
                    }
                }
            };
            expect(context.url).toBe('/api/users/123');
            expect(context.method).toBe('PUT');
            expect(context.data.request.body?.name).toBe('Updated Name');
        });
    });
    describe('Type compatibility', () => {
        it('should allow type inference and checking', () => {
            const createLogData = (ip, type, httpCode, message) => ({
                ip,
                type,
                httpCode,
                message,
                context: {
                    url: 'unknown',
                    method: 'UNKNOWN',
                    data: {
                        headers: {
                            'x-forwarded-for': 'unknown',
                            'user-agent': 'unknown',
                            srv: null
                        },
                        request: {
                            params: {},
                            query: {},
                            body: {}
                        }
                    }
                },
                trace: null,
                responseTime: '0 ms'
            });
            const logData = createLogData('127.0.0.1', 'INFO', 200, 'Test');
            expect(logData.ip).toBe('127.0.0.1');
        });
    });
});
