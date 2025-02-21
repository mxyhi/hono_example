// src/core/middlewares/context.ts
import type { Context, Next } from "hono";
import { requestContext } from "../async_context/context";
import { DEFAULT_TENANT_ID, di } from "../di/container";

/**
 * 中间件：绑定请求作用域容器到 Hono 上下文
 */
export async function requestContainerMiddleware(c: Context, next: Next) {
  c.set("di", di);
  c.set("tenantId", c.req.header("tenant-id") || DEFAULT_TENANT_ID);

  await next();
}
