import { IResponse } from "../interfaces";

export class HttpSuccessResponse implements IResponse {
  statusCode: number = 200;
  success: boolean = true;
  data: object;
  
  constructor(data: object) {
    this.data = data ? data : {};
  }
}