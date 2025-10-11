"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainException = void 0;
class DomainException extends Error {
    code;
    constructor(message, code = 1000) {
        super(`[DomainException] ${message}`);
        this.name = 'DomainException';
        this.code = code;
    }
}
exports.DomainException = DomainException;
