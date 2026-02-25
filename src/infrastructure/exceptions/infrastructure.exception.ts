export class InfrastructureException extends Error {
  public readonly code: number;

  constructor(message: string, code: number = 3000) {
    super(`${message}`);
    this.name = 'InfrastructureException';
    this.code = code;
  }
}
