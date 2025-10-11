export class DomainException extends Error {
  public readonly code: number;

  constructor(message: string, code: number = 1000) {
    super(`[DomainException] ${message}`);
    this.name = 'DomainException';
    this.code = code;
  }
}
