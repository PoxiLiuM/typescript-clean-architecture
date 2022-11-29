import { IResponse } from "../../interfaces/IResponse";

export class HttpInternalServerErrorResponse implements IResponse {
  statusCode: number = 500;
  success: boolean = false;
  errorMessage: string;
  
  constructor(e: unknown) {
    this.errorMessage = 'Internal Server Error';
    console.error('[HttpInternalServerErrorResponse]', e);
  }
}