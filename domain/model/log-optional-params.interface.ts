export interface LogOptionalParams {
    method?: string;
    parameterType?: string;
    originalUrl?: string;
    body?: any;
    headers?: {
        'x-forwarded-for'?: string;
        'user-agent'?: string;
        srv?: string;
    };
    responseTime?: number;
    code?: number;
    dataResponse?: any;
    message?: string;
    trace?: string;
}