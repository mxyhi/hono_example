import { createController } from "@/core/app/base.app";
import { DbClient } from "@/core/db";
import { describeRoute } from "hono-openapi";
import { userEntity } from "../user/entities/user.entity";
import { HelloService } from "./hello.service";

export const helloController = createController().get(
  "/hello",
  describeRoute({}),
  async (c) => {
    const userService = c.var.di.get(HelloService);
    const db = c.var.di.get(DbClient);
    await db.client.insert(userEntity).values({});
    const user = await userService.getCurrentUser();
    return c.json(user);
  }
);
