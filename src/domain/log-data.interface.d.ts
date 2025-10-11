export interface LogData {
    ip: string;
    type: string;
    httpCode: number;
    message: string;
    context: Context;
    trace: any;
    responseTime: string;
}
export interface Context {
    url: string;
    method: string;
    data: ContextData;
}
export interface ContextData {
    headers: Headers;
    request: RequestData;
}
export interface Headers {
    'x-forwarded-for': string | 'unknown' | undefined;
    'user-agent': string | 'unknown';
    srv: string | null;
}
export interface Request {
    params: any | {};
    query: any | {};
    body: any | {};
}
export interface LogParams {
    method?: string;
    clientIp?: string;
    originalUrl?: string;
    parameterType?: string;
    headers?: {
        'x-forwarded-for'?: string;
        'user-agent'?: string;
        srv?: string | null;
        [key: string]: any;
    };
    request?: {
        params?: Record<string, any>;
        query?: any;
        body?: any;
    };
    response?: any;
    dataResponse?: any;
    message?: string;
    status?: number;
    trace?: any;
    startTime?: number;
}
export interface RequestData {
    params?: Record<string, any>;
    query?: Record<string, any>;
    body?: any;
}
export interface HeadersInput extends Partial<Headers> {
    [key: string]: any;
}
