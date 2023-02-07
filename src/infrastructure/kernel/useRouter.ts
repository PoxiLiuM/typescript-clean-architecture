import { useKernel } from "./useKernel";

type MiddlewareType = {
  key: string;
  handler: Function;
}

type RouteType = {
  method: string;
  path: string;
  handler: Function;
  middlewares: Function[];
}

function makeRouter() {
  const controllers = useKernel();

  const router: RouteType[] = [];

  Object.values(controllers).forEach((controller: any) => {
    controller.routes.forEach((route: any) => {
      const middlewares: Function[] = [];
      controller.middlewares.forEach((middleware: MiddlewareType) => {
        if (!middleware.key || middleware.key === route.key) {
          middlewares.push(middleware.handler);
        }
      })
      router.push({
        method: route.method, 
        path: `${controller.path}${route.path}`, 
        handler: controller[route.key],
        middlewares
      })
    });
  });

  return () => ({
    router
  })
}

export const useRouter = makeRouter();