export abstract class BaseException extends Error {
  public readonly code: number;

  constructor(message: string, code: number = 4000) {
    super(`${message}`);
    this.name = 'BaseException';
    this.code = code;
  }
}
