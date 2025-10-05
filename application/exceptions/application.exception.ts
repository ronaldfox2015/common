export class ApplicationException extends Error {
  public readonly code: number;

  constructor(message: string, code: number = 2000) {
    super(`[ApplicationException] ${message}`);
    this.name = 'ApplicationException';
    this.code = code;
  }
}
