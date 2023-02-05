export const Controller = (path: string) => (target: any) => {
  target.prototype.name = target.name;

  if (path[0] !== '/')
    path = `/${path}`;
  if (path[path.length-1] === '/')
    path = path.substring(0, path.length-2);

  target.prototype.path = `/api/v1${path}`;
}