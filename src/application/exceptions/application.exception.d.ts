export declare class ApplicationException extends Error {
    readonly code: number;
    constructor(message: string, code?: number);
}
