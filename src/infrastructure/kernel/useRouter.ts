import { useKernel } from "./useKernel";

type RouteType = {
  method: string;
  path: string;
  handler: Function;
}

function makeRouter() {
  const kernel = useKernel();

  const router: RouteType[] = [];

  Object.values(kernel.controllers).forEach((controller: any) => {
    controller.routes.forEach((route: any) => {
      router.push({
        method: route.method, path: `${controller.path}${route.path}`, handler: controller[route.key]
      })
    });
  });

  return () => ({
    router
  })
}

export const useRouter = makeRouter();