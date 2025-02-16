import { createController } from "@/core/app/base.app";
import { describeRoute } from "hono-openapi";
import { HelloService } from "./hello.service";

export const helloController = createController().get(
  "/hello",
  describeRoute({}),
  async (c) => {
    const userService = c.var.di.get(HelloService);
    const user = await userService.getCurrentUser();
    return c.json(user);
  }
);
