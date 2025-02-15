// src/core/middlewares/context.ts
import type { Context, Next } from "hono";
import { requestContext } from "../async_context/context";
import { di } from "../di/container";

export const HONO_CONTEXT_TOKEN = "HONO_CONTEXT";

/**
 * 中间件：绑定请求作用域容器到 Hono 上下文
 */
export async function requestContainerMiddleware(c: Context, next: Next) {
  c.set("di", di);

  await requestContext.run(c, async () => {
    await next();
  });
}
