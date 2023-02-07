interface RequestType {
  path: string;
  body?: any;
  query?: any;
}

export class HttpRequest {
  public readonly path: RequestType['path'];
  public readonly body: RequestType['body'];
  public readonly query: RequestType['query'];

  constructor(request: RequestType){
    this.path = request.path;
    this.body = request.body ? request.body : {};
    this.query = request.query ? request.query : {};
  }
}