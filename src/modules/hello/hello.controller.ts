import { createController } from "@/core/app/base.app";
import { describeRoute } from "hono-openapi";
import { HelloService } from "./hello.service";

export const createHelloController = () => {
  const hello = createController().get(
    "/hello",
    describeRoute({}),
    async (c) => {
      const userService = c.var.di.get(HelloService);
      const user = await userService.getCurrentUser();
      return c.json(user);
    }
  );

  return hello;
};

export const helloController = createHelloController();
