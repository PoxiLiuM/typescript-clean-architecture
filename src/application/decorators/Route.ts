enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

type RouteDecoratorType = {
  method: Method,
  path: string,
  key: string
}

const RouteFactory = (method: Method) => (path: string) => (target: any, key: string, descriptor: PropertyDescriptor) => {
  if (!target.routes)
    target.routes = [];

  if (path === '/')
    path = '';
  else if (path[0] !== '/')
    path = `/${path}`;


  target.routes.push({ method, path, key } as RouteDecoratorType)
}

export const Get = RouteFactory(Method.GET);
export const Post = RouteFactory(Method.POST);
export const Put = RouteFactory(Method.PUT);
export const Delete = RouteFactory(Method.DELETE);
export const Patch = RouteFactory(Method.PATCH);