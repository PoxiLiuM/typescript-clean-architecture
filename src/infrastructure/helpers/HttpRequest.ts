interface RequestType {
  body?: any;
  query?: any;
}

export class HttpRequest {
  public readonly body: RequestType['body'];
  public readonly query: RequestType['query'];

  constructor(request: RequestType){
    this.body = request.body ? request.body : {};
    this.query = request.query ? request.query : {};
  }
}