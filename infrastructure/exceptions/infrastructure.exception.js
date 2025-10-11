"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureException = void 0;
class InfrastructureException extends Error {
    code;
    constructor(message, code = 3000) {
        super(`[InfrastructureException] ${message}`);
        this.name = 'InfrastructureException';
        this.code = code;
    }
}
exports.InfrastructureException = InfrastructureException;
