export declare class InfrastructureException extends Error {
    readonly code: number;
    constructor(message: string, code?: number);
}
