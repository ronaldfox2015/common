"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationException = void 0;
class ApplicationException extends Error {
    code;
    constructor(message, code = 2000) {
        super(`[ApplicationException] ${message}`);
        this.name = 'ApplicationException';
        this.code = code;
    }
}
exports.ApplicationException = ApplicationException;
