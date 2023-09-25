export class HttpException extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: any) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }

}
