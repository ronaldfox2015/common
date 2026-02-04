"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_const_util_1 = require("../src/domain/enum/logger.const.util");
const logger_service_1 = require("./../src/application/service/logger.service");
describe("LoggerService", () => {
    let service = new logger_service_1.LoggerService();
    beforeEach(() => {
        // Espiar las salidas de consola para no ensuciar el output de tests
        jest.spyOn(global.console, "log").mockImplementation(() => { });
        jest.spyOn(global.console, "warn").mockImplementation(() => { });
        jest.spyOn(global.console, "error").mockImplementation(() => { });
        jest.spyOn(global.console, "debug").mockImplementation(() => { });
        jest.spyOn(global.console, "info").mockImplementation(() => { });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it("debería loguear un mensaje con nivel INFO", () => {
        service.log("test message", {
            clientIp: "127.0.0.1",
            startTime: Date.now(),
        });
        expect(console.log).toHaveBeenCalled();
        const logCall = console.log.mock.calls[0][0];
        const logData = JSON.parse(logCall);
        expect(logData.type).toBe(logger_const_util_1.INFO);
        expect(logData.message).toBe("test message");
        expect(logData.ip).toBe("127.0.0.1");
    });
    it("debería loguear un mensaje con nivel WARNING", () => {
        service.warning("warning message", {
            status: 400,
            originalUrl: "/api/test",
        });
        expect(console.warn).toHaveBeenCalled();
        const logCall = console.warn.mock.calls[0][0];
        const logData = JSON.parse(logCall);
        expect(logData.type).toBe(logger_const_util_1.WARNING);
        expect(logData.httpCode).toBe(400);
        expect(logData.context.url).toBe("/api/test");
    });
    it("debería loguear un mensaje con nivel CRITICAL", () => {
        service.critical("critical error", { status: 500, trace: "stacktrace" });
        expect(console.error).toHaveBeenCalled();
        const logCall = console.error.mock.calls[0][0];
        const logData = JSON.parse(logCall);
        expect(logData.type).toBe(logger_const_util_1.CRITICAL);
        expect(logData.httpCode).toBe(500);
        expect(logData.trace).toBe("stacktrace");
    });
    it("debería calcular correctamente el responseTime", () => {
        const start = Date.now() - 150;
        const result = service.calculateResponseTime(start);
        expect(result).toMatch(/^\d+ ms$/);
    });
    it("debería construir headers por defecto si no existen", () => {
        const headers = service.buildHeaders(undefined);
        expect(headers["x-forwarded-for"]).toBe("unknown");
        expect(headers["user-agent"]).toBe("unknown");
        expect(headers.srv).toBeNull();
    });
    it("debería loguear con debug, verbose y warn (alternativos)", () => {
        service.debug?.("debug message", { test: true });
        service.verbose?.("verbose message", { test: true });
        service.warn("warn message", { test: true });
        expect(console.debug).toHaveBeenCalled();
        expect(console.info).toHaveBeenCalled();
        expect(console.warn).toHaveBeenCalled();
    });
});
