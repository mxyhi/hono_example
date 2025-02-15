import type { Context, Next } from "hono";
import { ClsService, type ClsStore } from "../cls/cls.service";
import { uniqId } from "../utils/uniq_id";

// Hono中间件
export const clsMiddleware = async (c: Context, next: Next) => {
  const cls = c.get("container").get(ClsService);

  console.log("clsMiddleware", cls);
  const store: ClsStore = {
    requestId: uniqId(),
    tenantId: c.req.header("x-tenant-id"),
    user: c.get("user"), // 假设有认证中间件
  };

  return cls.run(store, async () => {
    await next();
    // Cloudflare环境处理
    console.log("Cloudflare环境处理");
    // console.log(c?.executionCtx);
    // if (c.executionCtx?.waitUntil) {
    //   c.executionCtx.waitUntil(Promise.resolve());
    // }
  });
};
