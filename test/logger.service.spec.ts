import { INFO, WARNING, CRITICAL } from "../src/domain/enum/logger.const.util";
import { LogData } from "../src/domain/log-data.interface";
import { LoggerService } from "./../src/application/service/logger.service";
describe("LoggerService", () => {
  let service: LoggerService = new LoggerService();

  beforeEach(() => {
    // Espiar las salidas de consola para no ensuciar el output de tests
    jest.spyOn(global.console, "log").mockImplementation(() => {});
    jest.spyOn(global.console, "warn").mockImplementation(() => {});
    jest.spyOn(global.console, "error").mockImplementation(() => {});
    jest.spyOn(global.console, "debug").mockImplementation(() => {});
    jest.spyOn(global.console, "info").mockImplementation(() => {});
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
    const logCall = (console.log as jest.Mock).mock.calls[0][0];
    const logData: LogData = JSON.parse(logCall);

    expect(logData.type).toBe(INFO);
    expect(logData.message).toBe("test message");
    expect(logData.ip).toBe("127.0.0.1");
  });

  it("debería loguear un mensaje con nivel WARNING", () => {
    service.warning("warning message", {
      status: 400,
      originalUrl: "/api/test",
    });

    expect(console.warn).toHaveBeenCalled();
    const logCall = (console.warn as jest.Mock).mock.calls[0][0];
    const logData: LogData = JSON.parse(logCall);

    expect(logData.type).toBe(WARNING);
    expect(logData.httpCode).toBe(400);
    expect(logData.context.url).toBe("/api/test");
  });

  it("debería loguear un mensaje con nivel CRITICAL", () => {
    service.critical("critical error", { status: 500, trace: "stacktrace" });

    expect(console.error).toHaveBeenCalled();
    const logCall = (console.error as jest.Mock).mock.calls[0][0];
    const logData: LogData = JSON.parse(logCall);

    expect(logData.type).toBe(CRITICAL);
    expect(logData.httpCode).toBe(500);
    expect(logData.trace).toBe("stacktrace");
  });

  it("debería calcular correctamente el responseTime", () => {
    const start = Date.now() - 150;
    const result = (service as any).calculateResponseTime(start);
    expect(result).toMatch(/^\d+ ms$/);
  });

  it("debería construir headers por defecto si no existen", () => {
    const headers = (service as any).buildHeaders(undefined);
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
