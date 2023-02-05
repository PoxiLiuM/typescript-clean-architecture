import { IResponse } from "../interfaces";

export class HttpInternalServerErrorResponse implements IResponse {
  statusCode: number = 500;
  success: boolean = false;
  message: string;
  
  constructor(e: unknown) {
    this.message = 'Internal Server Error';
    console.error('[HttpInternalServerErrorResponse]', e);
  }
}