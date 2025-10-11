export declare class DomainException extends Error {
    readonly code: number;
    constructor(message: string, code?: number);
}
